const express = require("express");
const router = express.Router();

const {
  getUser,
  loginUser,
  createUser,
} = require("../Controller/UserController");

router.get("/getUser/:userId", getUser);
router.post("/login", loginUser);
router.post("/create", createUser);

module.exports = router;
