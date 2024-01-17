const userServ = require("../service/user.service");
const util = require("../utils/util");
const cloudinary = require("../utils/cloudinary");
require("dotenv").config();
module.exports = {
  signUp: async function (req, res) {
    let result = await userServ.signUp(req.body);
    util.sendResponse(result, req, res);
  },
  verify_otp: async function (req, res) {
    let result = await userServ.verify_otp(req.body);
    util.sendResponse(result, req, res);
  },
  login: async function (req, res) {
    let result = await userServ.login(req.body);
    util.sendResponse(result, req, res);
  },
  update: async function (req, res) {
    let query;
    if (req.file) {
      let profilePic = await cloudinary.uploader.upload(req.file.path, function (err, result) {
        if (err) {
          return err;
        } else {
          return result;
        }
      });
      query = { $set: { ...req.body, profilePic: profilePic.url }};
    } else {
      query = { $set: { ...req.body } };
    }
    let result = await userServ.updateUser(req.body._id, query);
    util.sendResponse(result, req, res);
  },
  getUsers: async function (req, res) {
    let result = await userServ.getAllUsers();
    util.sendResponse(result, req, res);
  },
  follow: async function (req, res) {
    let result = await userServ.follow(req.body);
    util.sendResponse(result, req, res);
  },
  get_follower_list: async function (req, res) {
    let result = await userServ.follower_list(req.params.id);
    util.sendResponse(result, req, res);
  },
  get_following_list: async function (req, res) {
    let result = await userServ.following_list(req.params.id);
    util.sendResponse(result, req, res);
  },
  getById: async function (req, res) {
    let result = await userServ.getUserById(req.params.id);
    util.sendResponse(result, req, res);
  },
  deleteUser: async function (req, res) {
    let result = await userServ.deleteUser(req.params.id);
    util.sendResponse(result, req, res);
  },
};
