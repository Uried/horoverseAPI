const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./api/Routes/userRoute");
const blogs = require("./api/Routes/blogRoute");
const publications = require("./api/Routes/publicationRoute");
const yearly = require("./api/Routes/yearlyRoute");
const monthly = require("./api/Routes/monthlyRoute");
const daily = require("./api/Routes/dailyRoute");
const weekly = require("./api/Routes/weeklyRoute");
const logs = require("./api/Routes/logRoute")
const axios = require("axios");
const User = require("./api/Models/User");
const Publication = require("./api/Models/Publication")

//const serviceAccount = require("./api/serviceAccount/horoverse-b0fc1-firebase-adminsdk-p3k2i-a9a39438ee.json");

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
    return Promise.resolve(); // Résoudre la promesse
  } catch (error) {
    console.log("Erreur de connexion à MongoDB: " + error.message);
    return Promise.reject(error); // Rejeter la promesse en cas d'erreur
  }
}

connectToDatabase();
const port = process.env.PORT || 5800;

app.get("/", (req, res) => res.send("Hello, ready to communicate! "));
app.use("/users", users);
app.use("/blogs", blogs);
app.use("/publications", publications);
app.use("/weekly", weekly);
app.use("/daily", daily);
app.use("/monthly", monthly);
app.use("/yearly", yearly);
app.use("/logs", logs)
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

app.post("/savehoroscopes", (req, res) => {
    const {horoscopes} = req.body
  try {
    // Créez une instance de la publication avec les données fournies
    const publication = new Publication(horoscopes);

    // Enregistrez la publication dans la base de données
    const nouvellePublication = publication.save();

    console.log("Publication enregistrée :", nouvellePublication);
    return nouvellePublication;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la publication :", error);
    throw error;
  }
})

const options = {
  method: "GET",
  url: "https://horoscopes-ai.p.rapidapi.com/get_horoscope/libra/today/general/fr",
  headers: {
    "X-RapidAPI-Key": "c79e7cce1dmsh6fd8ba52278c9d4p1d6288jsn7bbcd57be239",
    "X-RapidAPI-Host": "horoscopes-ai.p.rapidapi.com",
  },
};

async function get_horoscope(){
  try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
}



app.listen(port, () => {
  console.log("Server is running on port " + port);
});
