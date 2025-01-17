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

const PORT = 5000;
const mongoUri = process.env.MONGO_URI;

app.use(cors({ origin: "*" }));
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/storedb", {
useNewUrlParser: true,
useUnifiedTopology: true,
});

const productRoutes = require("./Route/productRoute"); 

app.use("/products", productRoutes);


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});