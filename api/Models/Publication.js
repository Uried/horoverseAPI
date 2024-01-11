const mongoose = require("mongoose");

// Schéma pour la réponse
const responseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  content: { type: String, required: true },
});

// Schéma pour le commentaire
const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  content: { type: String, required: true },
  responses: [responseSchema], // Référence au schéma de réponse
});

// Schéma pour la publication
const publicationSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now }, // Utilisation de la date actuelle comme valeur par défaut
  aries: { type: String },
  pisces: { type: String },
  gemini: { type: String },
  taurus: { type: String },
  libra: { type: String },
  scorpio: { type: String },
  cancer: { type: String },
  leo: { type: String },
  virgo: { type: String },
  sagittarius: { type: String },
  capricorn: { type: String },
  aquarius: { type: String },
  comments: [commentSchema], // Référence au schéma de commentaire
});

const Publication = mongoose.model("Publication", publicationSchema);

module.exports = Publication;
