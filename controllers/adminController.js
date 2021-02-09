const User = require("../schemas/user");
const Sale = require("../schemas/sale");
const { ErrorHandler } = require("../utils/ErrorHandler");
const { getStripeUser } = require("./stripeController");

exports.adminGetUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler(404, "User not found"));
    }

    let stripeUser = {};
    if (user.stripeId) stripeUser = await getStripeUser(user.stripeId);

    res.status(200).json({
      status: "success",
      user,
      stripeUser,
    });
  } catch (err) {
    return next(new ErrorHandler(err));
  }
};

exports.sale = async (req, res, next) => {
  try {
    let { sale } = req.body;
    sale = parseFloat(sale);
    sale = sale.toFixed(2);
    let saleToUpdate = await Sale.findOne({ name: "current" });
    if (!saleToUpdate) {
      saleToUpdate = await Sale.create({
        name: "current",
        sale,
      });
    } else {
      saleToUpdate.sale = sale;
      await saleToUpdate.save();
    }
    res.status(201).json({
      status: "success",
      sale: saleToUpdate.sale,
    });
  } catch (err) {
    return next(new ErrorHandler(err));
  }
};
