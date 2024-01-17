const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
    profilePic:{
      type:String,
    },
    email: {
      type: String,
    },
    bio: {
      type: String,
    },
    webLink:{
      type:String,
    },
    myPosts: [{ type: String, ref:"posts" }],
    savedPosts: [{ type: String, ref:"posts" }],
    myFollowers: [{ type: String , ref: "users" }],
    myFollowings: [{ type: String, ref: "users" }],
  },
  { timestamps: { createdAt: "createdAt" } }
);

let User = mongoose.model("users", userSchema);
module.exports = User;
