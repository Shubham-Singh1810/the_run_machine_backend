const express = require("express");
const imgUpload = require("../utils/multer")
const router= express.Router();
const postController = require("../controller/post.controller")
const auth = require("../middlewere/auth")
router.route("/create").post(auth, imgUpload.single("postImg"), postController.create);
router.route("/:id").get(postController.getPostById);
router.route("/user/:id").get(postController.getPostByUserId);
router.route("/").get(postController.getAllPost);

module.exports = router