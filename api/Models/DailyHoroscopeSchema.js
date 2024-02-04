const mongoose = require("mongoose");

// Schéma pour la réponse
const responseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: false },
  content: { type: String, required: true },
});

// Schéma pour le commentaire
const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: false },
  content: { type: String, required: true },
  responses: [responseSchema], // Référence au schéma de réponse
});

const DailySchema = new mongoose.Schema({
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
  comments: [commentSchema], // Référence au schéma de commentaire
});

const Daily = mongoose.model("Daily", DailySchema);

module.exports = Daily;
