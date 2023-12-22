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
  tokenFCM:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("User", userSchema);
