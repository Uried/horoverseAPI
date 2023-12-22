const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./api/Routes/userRoute");
const axios = require("axios");
const User = require('./api/Models/User')
const admin = require("firebase-admin");
const serviceAccount = require("./api/serviceAccount/horoverse-15fe0-firebase-adminsdk-s2x5d-5abcb84e01.json");

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
const port = process.env.PORT || 5900 ;

app.get("/", (req, res) => res.send("Hello, ready to communicate! "));
app.use("/users", users);
app.get("/api/horoscope/:sign/", async (req, res) => {
  try {
    const { sign } = req.params;
    const apiUrl = `https://ohmanda.com/api/horoscope/${sign}`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
