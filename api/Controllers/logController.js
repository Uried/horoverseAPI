const Log = require("../Models/Log");

// Méthode pour enregistrer un log
exports.createLog = (req, res) => {
  const { level, message, userId, ipAddress } = req.body;

  // Création d'une nouvelle instance du modèle Log
  const log = new Log({
    level,
    message,
    userId,
    ipAddress,
  });

  // Sauvegarde du log dans la base de données
  log
    .save()
    .then((savedLog) => {
      console.log("Log enregistré :", savedLog);
      res.status(201).json(savedLog);
    })
    .catch((error) => {
      console.error("Erreur lors de l'enregistrement du log :", error);
      res.status(500).json({ error: "Erreur lors de l'enregistrement du log" });
    });
};
