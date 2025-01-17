const express = require("express");
const router = express.Router();
const { createNews, getAllNews, health } = require("../Controller/NewController");

// Route pour obtenir toutes les actualités
// GET /news
router.get("/", getAllNews);

// Route pour créer une nouvelle actualité
// POST /news
router.post("/", createNews);

router.get("/health", health);

module.exports = router;