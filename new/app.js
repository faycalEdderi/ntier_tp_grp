const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

const dbUri = process.env.MONGO_URI;
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
  });

const PORT = 8000;
app.use(cors({ origin: "*" }));
const mongoose = require("mongoose");
mongoose.connect(dbUri, {
useNewUrlParser: true,
useUnifiedTopology: true,
});
console.log("Connected to MongoDB");

const newRoute = require("./Route/newRoute"); 

app.use("/news", newRoute);


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});