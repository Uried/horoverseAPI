const Yearly = require("../Models/YearlyHoroscopes");

// Ajouter une publication
exports.addYearly = async (req, res) => {
  try {
    const newHoroYear = new Yearly(req.body);
    const savedHoroYear = await newHoroYear.save();
    res.status(200).json(savedHoroYear);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de l'horoscope annuel" });
  }
};

exports.getAllHoroYear = async (req, res) => {
  try {
    const horoYears = await Yearly.find();
    res.status(200).json(horoYears);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des horoscopes" });
  }
};

exports.getHoroscopeByYear = async (req, res) => {
  try {
    const { date } = req.params;

    // Extraire l'année de la date fournie
    const year = new Date(date).getFullYear();

    const yearlyHoroscope = await Yearly.findOne({
      date: {
        $gte: new Date(`${year}-01-01`), // Premier jour de l'année
        $lte: new Date(`${year + 1}-01-01`), // Premier jour de l'année suivante
      },
    });

    if (!yearlyHoroscope) {
      return res
        .status(404)
        .json({ error: "Aucun horoscope trouvé pour cette année" });
    }

    res.status(200).json(yearlyHoroscope);
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'horoscope annuel" });
  }
};
