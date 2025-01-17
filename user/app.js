const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());

const PORT = 4000;
const mongoUri = process.env.MONGO_URI;

app.use(cors({ origin: "*" }));
const mongoose = require("mongoose");
mongoose.connect(mongoUri, {
});
console.log("Connected to MongoDB");

const userRoute = require("./Route/UserRoute");

app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});