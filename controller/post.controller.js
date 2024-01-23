const postServ = require("../service/post.services");
const util = require("../utils/util");
const cloudinary = require("../utils/cloudinary");
require("dotenv").config();
module.exports = {
  create: async function (req, res) {
    let postImg = await cloudinary.uploader.upload(req.file.path, function (err, result) {
      if (err) {
        return err;
      } else {
        return result;
      }
    });
    let result = await postServ.create({ ...req.body, postImg: postImg.url });
    util.sendResponse(result, req, res);
  },
  getPostById: async function (req, res) {
    let result = await postServ.getPostById(req.params.id);
    util.sendResponse(result, req, res);
  },
  getPostByUserId:async function (req, res) {
    let result = await postServ.getPostByUserId(req.params.id);
    util.sendResponse(result, req, res);
  },
  getAllPost:async function (req, res) {
    let result = await postServ.getAllPost();
    util.sendResponse(result, req, res);
  },
};
