const mongoose = require("mongoose");
const validator = require("validator");
const Course = require("./course");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Email is invalid"],
    validate: [validator.isEmail, "Email is invalid"],
  },
  password: {
    type: String,
    select: false,
  },
  clearance: {
    type: String,
    enum: {
      values: ["user", "instructor", "admin"],
      message: "The clearance value is invalid",
    },
    default: "user",
  },
  stripeId: {
    type: String,
    default: "",
  },
  orders: [
    [
      {
        type: Object,
      },
    ],
  ],
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  coursesOwned: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  ],
  coursesCreated: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  ],
});

userSchema.pre(/^find/, function (next) {
  this.populate("coursesOwned");
  this.populate("coursesCreated");
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
