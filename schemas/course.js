const mongoose = require("mongoose");
require("dotenv").config();

const courseSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    trim: true,
    unique: [true, "This title is already in use"],
    required: [true, "A title is required"],
  },
  img: {
    type: Object,
    url: String,
    deleteKey: String,
    default: { url: process.env.DEFAULT_IMG, deleteKey: "" },
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "A price is required"],
  },
  saleOptIn: {
    type: Boolean,
    default: true,
  },
  position: {
    type: Number,
  },
  length: {
    type: String,
    default: "varies",
  },
  accessType: {
    type: String,
    default: "lifetime access",
  },
  certification: {
    type: String,
    default: true,
  },
  tagline: {
    type: String,
    required: [true, "A tagline is required"],
  },
  adText: {
    type: String,
    required: [true, "An adText is required"],
  },
  features: {
    type: Array,
    required: [true, "Features are required"],
  },
});

courseSchema.pre(/^find/, function (next) {
  if (this.owner) this.populate("owner");
  next();
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
