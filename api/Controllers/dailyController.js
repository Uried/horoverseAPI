const Daily = require("../Models/DailyHoroscopeSchema");

// Ajouter une publication
exports.addDaily = async (req, res) => {
  try {
    const newDailyHoro = new Daily(req.body);
    const savedDailyHoro = await newDailyHoro.save();
    res.status(200).json(savedDailyHoro);
    console.log(savedDailyHoro);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de l'ajout de l'horoscope journalier" });
  }
};

exports.getAllDailyHoroscopes = async (req, res) => {
   
  try {
    const dailyHoroscope = await Daily.find({
    });

    res.status(200).json(dailyHoroscope);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des horoscopes" });
  }
};

exports.getDailyHoroscope = async (req, res) => {
  try {
    const { date } = req.params; // La date au format "YYYY-MM-DD"

    // Convertir la chaîne de date en objet Date
    const currentDate = new Date(date);

    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

    const dailyHoroscope = await Daily.findOne({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (!dailyHoroscope) {
      return res
        .status(404)
        .json({ error: "Aucun horoscope trouvé pour ce jour" });
    }

    res.status(200).json(dailyHoroscope);
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'horoscope du jour" });
  }
};