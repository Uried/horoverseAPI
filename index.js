const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./api/Routes/userRoute");
const blogs = require("./api/Routes/blogRoute");
const publications = require("./api/Routes/publicationRoute");
const axios = require("axios");
const User = require("./api/Models/User");
const admin = require("firebase-admin");
const serviceAccount = require("./api/serviceAccount/horoverse-b0fc1-firebase-adminsdk-p3k2i-a9a39438ee.json");

const app = express();
const router = express.Router();
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Erreur de connexion à MongoDB: " + error.message);
  }
}

connectToDatabase();
const port = process.env.PORT || 5900;

app.get("/", (req, res) => res.send("Hello, ready to communicate! "));
app.use("/users", users);
app.use("/blogs", blogs);
app.use("/publications", publications);
app.get("/api/horoscope/:sign/", async (req, res) => {
  try {
    const { sign } = req.params;
    const apiUrl = `https://any.ge/horoscope/api/?sign=${sign}&type=daily&day=today&lang=en`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put("/update-fcm-token/:jId", (req, res) => {
  const { jId } = req.params;
  const { token } = req.body;

  // Mettez à jour le token FCM dans MongoDB en fonction de jId
  User.findOneAndUpdate({ jId }, { tokenFCM: token })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour du token FCM:", error);
      res.sendStatus(500);
    });
});

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// router.post("/send-notifications", async (req, res) => {
//   try {
//     const users = await User.find();
//     for (const user of users) {
//       const message = {
//         token: user.tokenFCM,
//         notification: {
//           title: "Titre de la notification",
//           body: "Contenu de la notification",
//         },
//       };

//       await admin.messaging().send(message);
//     }
//     console.log("Notifications envoyées avec succès.");
//     res.status(200).json({ message: "Notifications envoyées avec succès." });
//   } catch (error) {
//     console.error("Erreur lors de l'envoi des notifications", error);
//     res.status(500).json({ error: "Erreur lors de l'envoi des notifications" });
//   }
// });

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
