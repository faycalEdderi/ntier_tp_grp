const Product = require("../Models/Product");
const cache = require("../service/cache");

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      userId: req.user.id,
    });

    await product.save();

    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Product introuvable" });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send({ error: "Product introuvable" });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const cacheProduct = async (req, res) => {
  try {
    const cachedProduct = await cache.getCache("products");
    if (cachedProduct) {
      return res.json(JSON.parse(cachedProduct));
    }
    const products = await Product.find();
    await cache.setCache("products", JSON.stringify(products), {
      EX: 300,
    }); // Expire après 5 min
    res.json(products);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const health = async (req, res) => {
  res.status(200).send({ message: "Product service is running" });
};

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  cacheProduct,
  health,
};
