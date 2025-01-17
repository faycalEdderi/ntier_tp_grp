const Product = require("../Models/Product");
const cache = require("../service/cache");
const { sendProductCreationEmail } = require("../service/mailer");

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      userId: req.user.id,
    });

        await product.save();

        // Invalidate cache after creating a new product
        await cache.delCache("products");

        res.status(201).send(product);

        // Send mail after creating a new product
        sendProductCreationEmail(product.name);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        // Get products from redis cache
        cachedProduct = await cache.getCache("products");
        if (cachedProduct) {
            return res.status(200).json(cachedProduct);
        }

        const products = await Product.find();

        await cache.setCache("products", products, { EX: 10 });

        res.status(200).json(products);
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

        // Invalidate cache after creating a new product
        await cache.delCache("products");

        res.status(200).send("Produit supprimé");
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        if (!product) {
            return res.status(404).send({ error: "Product introuvable" });
        }

        // Invalidate cache after creating a new product
        await cache.delCache("products");

        res.status(200).send(product);
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
    health,
};
