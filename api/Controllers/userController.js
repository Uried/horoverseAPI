const User = require("../Models/User");
const cron = require("node-cron");
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount/horoverse-15fe0-firebase-adminsdk-s2x5d-5abcb84e01.json");

exports.addUser = async (req, res) => {
  try {
    const { jId, pseudo, phone, sign, tokenFCM} = req.body;

    const newUser = new User({
      jId: jId,
      pseudo: pseudo,
      phone: phone,
      sign: sign,
      tokenFCM: tokenFCM
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

exports.getUsers = (req, res) => {
  User.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Utilisateurs",
        count: result.length,
        data: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
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

//send notifications to users
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

cron.schedule("0 6 * * *", async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      const pseudo = user.pseudo
      const message = {
        token: user.tokenFCM,
        notification: {
          title: "Horoverse",
          body: `Bonjour ${pseudo} consulte ton horoscope du jour`,
          icon: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Ayoba_app_logo.png",
        },
      };
      await admin.messaging().send(message);
    }
    console.log("Notifications envoyées avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'envoi des notifications", error);
  }
});
