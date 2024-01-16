const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  level: { type: String},
  message: { type: String},
  userId: { type: String},
  ipAddress: { type: String },
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
