const express = require("express");
const imgUpload = require("../utils/multer")
const router= express.Router();
const userController = require("../controller/user.controller")
const auth = require("../middlewere/auth")
router.route("/sign_up").post(userController.signUp);
router.route("/verify_otp").post(userController.verify_otp);
router.route("/login").post(userController.login);
router.route("/update_profile").put(auth, imgUpload.single("profilePic"), userController.update);
router.route("/reset_password").put(auth, userController.update);
router.route("/:id").get(auth, userController.getById);
router.route("/").get(auth, userController.getUsers);
router.route("/add_follow").post(auth, userController.follow);
router.route("/follower_list/:id").get(auth, userController.get_follower_list);
router.route("/following_list/:id").get(auth, userController.get_following_list);

module.exports = router