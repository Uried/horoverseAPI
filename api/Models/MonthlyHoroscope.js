const mongoose = require('mongoose')
const MonthlySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now }, 
  ARIES: { type: String },
  PISCES: { type: String },
  GEMINI: { type: String },
  TAURUS: { type: String },
  LIBRA: { type: String },
  SCORPIO: { type: String },
  CANCER: { type: String },
  LEO: { type: String },
  VIRGO: { type: String },
  SAGITTARIUS: { type: String },
  CAPRICORN: { type: String },
  AQUARIUS: { type: String },
});

const Monthly = mongoose.model("Monthly", MonthlySchema);

module.exports = Monthly;
