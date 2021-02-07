const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  sale: {
    type: Number,
    default: 1.0,
  },
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
