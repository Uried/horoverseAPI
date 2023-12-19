const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  jId: {
    type: String,
    required: true,
  },
  pseudo: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  sign: {
    type: String,
    default: "null"
  },
  reminderTime: {
    type: Date,
    default: function () {
      const defaultReminderTime = new Date();
      defaultReminderTime.setHours(6, 0, 0, 0);
      return defaultReminderTime;
    },
  },
});

module.exports = mongoose.model("User", userSchema);
