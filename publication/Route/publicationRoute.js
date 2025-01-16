const express = require("express");
const router = express.Router();

const authMiddleware = require("../Controller/authMiddleware");

const {
  createPublication,
  getPublication,
  getPublicationById,
  deletePublication,
  updatePublication,
  cachePublication,
} = require("../Controller/PublicationController");

router.post("/create", authMiddleware, createPublication);
router.get("/getPublications", getPublication);
router.get("/getPublication/:id", getPublicationById);
router.delete("/delete/:id", authMiddleware, deletePublication);
router.put("/edit/:id", authMiddleware, updatePublication);

router.get("/get", cachePublication);

module.exports = router;
