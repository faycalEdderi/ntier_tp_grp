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

const PORT = 4000;
app.use(cors({ origin: "*" }));
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/storedb", {
});
console.log("Connected to MongoDB");

const publicationRoutes = require("./Route/userRoute"); 

app.use("/publications", publicationRoutes);


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});