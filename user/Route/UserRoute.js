const express = require("express");
const router = express.Router();

const {
  getUser,
  loginUser,
  createUser,
  health
} = require("../Controller/UserController");

router.get("/getUser/:userId", getUser);
router.post("/login", loginUser);
router.post("/create", createUser);

router.get("/health", health);

module.exports = router;
