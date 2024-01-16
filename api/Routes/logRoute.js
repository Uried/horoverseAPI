const express = require("express");
const router = express.Router();
const logController = require("../Controllers/logController");

// Route pour enregistrer un log
router.post("/", logController.createLog);

module.exports = router;
