const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

const PORT = 4000;
app.use(cors({ origin: "*" }));
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/storedb", {
});
console.log("Connected to MongoDB");

const userRoute = require("./Route/UserRoute");

app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});