const express = require("express");
const router = express.Router();

const authMiddleware = require("../Controller/authMiddleware");

const {
    createProduct,
    getProduct,
    getProductById,
    deleteProduct,
    updateProduct,
    health
} = require("../Controller/ProductController");

router.post("/create", authMiddleware, createProduct);
router.get("/getProducts", getProduct);
router.get("/getProduct/:id", getProductById);
router.delete("/delete/:id", authMiddleware, deleteProduct);
router.put("/edit/:id", authMiddleware, updateProduct);
router.get("/health", health);

module.exports = router;
