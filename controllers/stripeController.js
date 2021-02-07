const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../schemas/user");
const { ErrorHandler } = require("../utils/ErrorHandler");

const serverWork = async (req, res, customer, cart) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user.stripeId) user.stripeId = customer.id;
  let courseIds = [];
  for (let i = 0; i < cart.length; i++) {
    courseIds.push(cart[i]._id);
  }
  user.coursesOwned = [...user.coursesOwned, ...courseIds];
  user.markModified("coursesOwned");
  cart[0].date = Date.now();
  user.orders = [...user.orders, cart];
  user.markModified("orders");
  await user.save();
};

exports.singleCharge = async (req, res) => {
  const { token, total, description, cart } = req.body;
  const amount = Math.round(total * 100);
  try {
    const status = await stripe.charges.create({
      amount: amount,
      currency: "usd",
      description: description,
      source: token.id,
    });

    cart[0].chargeId = status.id;

    await serverWork(req, res, (customer = ""), cart);
    res.status(200).json({ status });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};

exports.saveCardAndCharge = async (req, res) => {
  const { token, total, description, cart } = req.body;
  const amount = Math.round(total * 100);
  let customer;
  let { stripeId } = req.user;
  try {
    // Check if the account has a stripeId
    if (!stripeId) {
      customer = await stripe.customers.create();
      stripeId = customer.id;
    }

    // Create a new source
    const source = await stripe.customers.createSource(stripeId, {
      source: token.id,
    });

    // Create a charge
    const status = await stripe.charges.create({
      amount: amount,
      currency: "usd",
      customer: stripeId,
      description: description,
      source: source.id,
    });

    cart[0].chargeId = status.id;

    await serverWork(req, res, customer, cart);
    res.status(200).json({ status });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};

exports.addCardsToUser = async (req, res, next) => {
  const { stripeId } = req.body;
  if (!stripeId) {
    return next(new ErrorHandler(404, "No cards can be retrieved"));
  }
  try {
    const cards = await stripe.customers.listSources(stripeId, {
      object: "card",
    });

    if (cards) {
      if (cards.data.length === 0) {
        return next(new ErrorHandler(404, "No cards can be retrieved"));
      }
    }
    res.status(200).json({
      status: "success",
      cards,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCard = async (req, res, next) => {
  const { cardId, stripeId } = req.body;
  try {
    const deleted = await stripe.customers.deleteSource(stripeId, cardId);
    res.status(200).json({ deleted });
  } catch (err) {
    return next(
      new ErrorHandler(
        400,
        "Card cannot be deleted right now. Try again later."
      )
    );
  }
};

exports.chargeSavedCard = async (req, res) => {
  const { cardId, total, description, cart } = req.body;
  const amount = Math.round(total * 100);
  let { stripeId } = req.user;
  try {
    const customer = await stripe.customers.update(stripeId, {
      default_source: cardId,
    });
    // Create a charge
    const status = await stripe.charges.create({
      amount: amount,
      currency: "usd",
      customer: stripeId,
      description: description,
    });

    cart[0].chargeId = status.id;

    await serverWork(req, res, customer, cart);
    res.status(200).json({ status });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};

exports.getStripeUser = async (stripeId) => {
  const customer = await stripe.customers.retrieve(stripeId);
  return customer;
};

exports.getStripeCharge = async (req, res) => {
  const { chargeId } = req.body;
  try {
    const charge = await stripe.charges.retrieve(chargeId);
    res.status(200).json({ charge });
  } catch (err) {
    res.status(err.statusCode).json(err.message);
  }
};

exports.refundStripeCharge = async (req, res) => {
  const { chargeId, amount } = req.body;
  try {
    const refund = await stripe.refunds.create({
      charge: chargeId,
      amount: amount,
    });
    res.status(200).json({ refund });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};
