const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.route("/logout").get(authController.logout);

router.route("/checkuser").get(authController.checkUserCred);

router.route("/forgotpassword").post(authController.forgotPassword);

router.route("/passwordreset").post(authController.resetPassword);

module.exports = router;