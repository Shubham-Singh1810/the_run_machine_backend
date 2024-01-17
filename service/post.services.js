const Post = require("../model/post.model");
require("dotenv").config();
module.exports = {
  create: async function (body) {
    let result = {};
    try {
      result.data = await new Post(body).save();
      result.message = "Post created Successfully";
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  update: async function (body) {
    let result = {};
    try {
      result.data = await Post.findByIdAndUpdate(id, { $set: req.body}, { new: true });
      result.message = "Post Updated Successfully";
    } catch (error) {
      result.err = error;
    }
    return result;
  },
  getPostById: async function (id) {
    let result = {};
    try {
      result.data = await Post.findOne({_id:id});
      result.message = "Post retrived Successfully";
    } catch (error) {
      result.err = error;
    }
    return result;
  },
};
