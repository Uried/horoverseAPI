const mongoose = require("mongoose");

const yearlySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now }, // Utilisation de la date actuelle comme valeur par défaut
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

const Yearly = mongoose.model("Yearly", yearlySchema);

module.exports = Yearly;
