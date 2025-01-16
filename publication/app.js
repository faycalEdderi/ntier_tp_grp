const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
// dotenv
const dotenv = require("dotenv");
dotenv.config();


app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
  });

const PORT = 5000;
app.use(cors({ origin: "*" }));
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/publicationdb", {
}).then(() => {
  console.log('Connexion réussie à MongoDB');
}).catch((err) => {
  console.error('Erreur de connexion à MongoDB :', err);
});

const publicationRoutes = require("./Route/publicationRoute"); 

app.use("/publications", publicationRoutes);


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});