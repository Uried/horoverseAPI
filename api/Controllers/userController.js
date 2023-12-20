const User = require("../Models/User");

exports.addUser = async (req, res) => {
  try {
    const { jId, pseudo, phone, sign, reminderTime } = req.body;

    const newUser = new User({
      jId: jId,
      pseudo: pseudo,
      phone: phone,
      sign: sign,
      reminderTime: reminderTime,
    });

    await newUser.save();

    res.status(201).json({
      message: "Création réussie",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la création de l'utilisateur.",
    });
    console.log(error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const { jId } = req.params;

    const user = await User.findOne({ jId }); // Recherche par le champ jId

    if (!user) {
      throw Error("Utilisateur non trouvé");
    }

    const { pseudo, phone, sign } = user;

    res.status(200).json({
      jId: jId,
      pseudo: pseudo,
      phone: phone,
      sign: sign,
      message: "OK",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { jId } = req.params;
    const { sign } = req.body;

    const user = await User.findOneAndUpdate(
      { jId },
      { sign },
      { new: true }
    );

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    res.status(200).json({
      jId: user.jId,
      pseudo: user.pseudo,
      phone: user.phone,
      sign: user.sign,
      message: "Utilisateur mis à jour avec succès",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

