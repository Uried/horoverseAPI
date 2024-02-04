const Weekly = require("../Models/WeeklyHoroscope");

// Ajouter une publication
exports.addWeekly = async (req, res) => {
  try {
    const newWeeklyHoro = new Weekly(req.body);
    const savedWeeklyHoro = await newWeeklyHoro.save();
    res.status(200).json(savedWeeklyHoro);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de l'ajout de l'horoscope de la semaine" });
  }
};

exports.getAllWeeklyHoroscopes = async (req, res) => {
  try {
    const weeklyHoroscope = await Weekly.find();
    res.status(200).json(weeklyHoroscope);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des horoscopes" });
  }
};

exports.getWeeklyHoroscope = async (req, res) => {
  try {
    const { date } = req.params; // La date au format "YYYY-MM-DD"

    const weeklyHoroscope = await Weekly.findOne({
      date: {
        $gte: new Date(date + "T00:00:00Z"), // Date de début de la journée
        $lte: new Date(date + "T23:59:59.999Z"), // Date de fin de la journée
      },
    });

    if (!weeklyHoroscope) {
      return res
        .status(404)
        .json({ error: "Aucun horoscope trouvé pour cette semaine" });
    }

    res.status(200).json(weeklyHoroscope);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Erreur lors de la récupération de l'horoscope de la semaine",
      });
  }
};