const express = require("express");
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

const router = express.Router();

// router.use(authController.addUserToRequest);

router.use(authController.addUserToRequest, authController.checkAdminClearance);

router.route("/getuser").post(adminController.adminGetUser);

router.route("/sale").post(adminController.sale);

module.exports = router;
