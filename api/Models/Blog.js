const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now, // Utilise la fonction Date.now pour définir la valeur par défaut comme la date d'aujourd'hui
  },
});

blogSchema.pre("save", function (next) {
  if (!this.date) {
    this.date = Date.now();
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
