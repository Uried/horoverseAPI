const Monthly = require("../Models/MonthlyHoroscope");

// Ajouter une publication
exports.addMonthly = async (req, res) => {
  try {
    const newMonthlyHoro = new Monthly(req.body);
    const savedMonthlyHoro = await newMonthlyHoro.save();
    res.status(200).json(savedMonthlyHoro);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de l'ajout de l'horoscope mensuel" });
  }
};

exports.getAllMontlyHoroscopes = async (req, res) => {
  try {
    const monthlyHoroscope = await Monthly.find();
    res.status(200).json(monthlyHoroscope);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des horoscopes" });
  }
};

exports.getMonthlyHoroscope= async (req, res) => {
  try {
    const { date } = req.params; // La date au format "YYYY-MM-DD"

    // Convertir la chaîne de date en objet Date
    const currentDate = new Date(date);

    // Définir le début et la fin du mois
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);

    const monthlyHoroscope = await Monthly.findOne({
      date: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth
      }
    });

    if (!monthlyHoroscope) {
      return res
        .status(404)
        .json({ error: "Aucun horoscope trouvé pour ce mois" });
    }

    res.status(200).json(monthlyHoroscope);
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'horoscope mensuel" });
  }
};
