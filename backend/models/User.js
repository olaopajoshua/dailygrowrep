const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      default: "Beginner",
    },

    streak: {
      type: Number,
      default: 0,
    },

    completed: {
      type: Number,
      default: 0,
    },

    dailyTasks: {
      type: [Boolean],
      default: [false, false, false],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
