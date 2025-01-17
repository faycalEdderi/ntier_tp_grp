const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();


app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
  });

const PORT = 8000;
app.use(cors({ origin: "*" }));
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/storedb", {
useNewUrlParser: true,
useUnifiedTopology: true,
});
console.log("Connected to MongoDB");

const productRoutes = require("./Route/NewRoute"); 

app.use("/news", productRoutes);


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});