const User = require("../model/user.model");
const TempUser = require("../model/tempUser.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports = {
  signUp: async function (body) {
    let otp = Math.floor(Math.random() * 100000) + 100000;
    let result = {};
    let tempUser = await TempUser.findOne({ email: body.email });
    let user = await User.findOne({email:body.email})
    if (user) {
      result.message = "This email is already registered";
    } else {
      try {
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: process.env.NODE_MAILER_USER, // generated ethereal user
            pass: process.env.NODE_MAILER_PASS, // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        let mailOption = {
          from: "hittheshubham1810@gmail.com",
          to: body.email,
          subject: "Email verification for The Run Machine",
          text: `Your OTP for email verification is ${otp}`,
        };
        transporter.sendMail(mailOption, async (error, info) => {
          if (error) {
            console.log(error);
          } else {
            if(tempUser){
                 await TempUser.findByIdAndUpdate({_id:tempUser._id}, {$set:{otp:otp}})
            }else{
              await new TempUser({ ...body, otp }).save();
            }
          }
        });
        result.message = "Otp has been sent to the given email address";
      } catch (error) {
        console.log(error);
        result.err = error;
      }
    }
    return result;
  },
  verify_otp: async function (body) {
    let result = {};
    try {
      let tempUser = await TempUser.findOne({ otp: body.otp, email:body.email });
      if (tempUser) {
        let user = {
          name: tempUser.name,
          password: tempUser.password,
          email: tempUser.email,
          userName: tempUser.userName,
        };
        result.data = await new User(user).save();
        result.message = "The Run Machine Place welcomes You :)";
        result.token = await jwt.sign({ logedUser }, process.env.JWT_KEY);
        await TempUser.findByIdAndDelete(tempUser._id);
      } else {
        result.message = "Wrong OTP";
      }
    } catch (error) {
      console.log(error);
      result.err = error;
    }
    return result;
  },
  login: async function (body) {
    let result = {};
    try {
      let logedUser = await User.findOne(body).select("-password");
      if (logedUser) {
        result.data = logedUser;
        result.message = "The Run Machine Place welcomes You :)";
        result.token = await jwt.sign({ logedUser }, process.env.JWT_KEY);
      } else {
        result.message = "Invalid login details";
      }
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  updateUser: async function (id, query) {
    let result = {};
    try {
      result.data = await User.findByIdAndUpdate(id, query, { new: true }).select("-password");
      result.message = "User Updated Successfully";
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  getUserById: async function (id) {
    let result = {};
    try {
      result.data = await User.findOne({ _id: id }).select("-password");
      result.message = "User data fatched successfully";
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  getAllUsers: async function () {
    let result = {};
    try {
      result.data = await User.find().select("-password");
      result.message = "User data fetched successfully";
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  follow: async function (body) {
    let result ={};
    let loggedQuery;
    let requestedQuery;
    const loggedUser = await User.findOne({ _id: body.userId });
    const requestedUser = await User.findOne({ _id: body.followId });
    if (!requestedUser) {
      result.message="User not found"
    }
    else{
      if (loggedUser.myFollowings.includes(body.followId)) {
        // Unfollow
        loggedQuery = { $pull: { myFollowings: body.followId } };
        requestedQuery = { $pull: { myFollowers: body.userId } };
        result.message = "Unfollowed";
    } else {
        // Follow
        loggedQuery = { $push: { myFollowings: body.followId } };
        requestedQuery = { $push: { myFollowers: body.userId } };
        result.message = "Start following";
    }
    }
     await User.findByIdAndUpdate({_id: body.userId}, loggedQuery);
     await User.findByIdAndUpdate({_id: body.followId}, requestedQuery);
     result.data= await User.findOne({_id: body.userId})
    return result;
  },
  follower_list: async function (id) {
    let result = {};
    try {
      result.data = await User.findOne({_id: id}).populate({path:"myFollowers"});
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  following_list: async function (id) {
    let result = {};
    try {
      result.data = await User.findOne({_id: id}).populate({path:"myFollowings"});
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  deleteUser: async function (id) {
    let result = {};
    try {
      result.data = await User.findByIdAndDelete(id);
      result.message = "User deleted successfully";
    } catch (error) {
      result.err = error;
    }
    return result;
  },
};
