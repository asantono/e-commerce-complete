const express = require("express");
const stripeController = require("../controllers/stripeController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/addCardsToUser").post(stripeController.addCardsToUser);

router.route("/deletecard").post(stripeController.deleteCard);

router.use(authController.addUserToRequest);

router.route("/singlecharge").post(stripeController.singleCharge);

router.route("/saveCardAndCharge").post(stripeController.saveCardAndCharge);

router.route("/chargeSavedCard").post(stripeController.chargeSavedCard);

router.route("/getStripeCharge").post(stripeController.getStripeCharge);

router.route("/refundStripeCharge").post(stripeController.refundStripeCharge);

module.exports = router;
