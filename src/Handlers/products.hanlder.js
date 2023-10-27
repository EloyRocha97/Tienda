const { Product } = require("../db");
const { Op } = require("sequelize");
const { createProduct } = require("../Controllers/products.controller");

const getProducts = async (req, res) => {
  const { name, types, price } = req.query;
  try {
    let products;
    let accordingToCondition = {};

    if (name) {
      accordingToCondition.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    if (types) {
      accordingToCondition.types = types;
    }

    let order = [];
    if (price === "price_desc") {
      order.push(["price", "DESC"]);
    } else if (price === "price_asc") {
      order.push(["price", "ASC"]);
    }

    products = await Product.findAll({
      where: accordingToCondition,
      order: order,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductId = async (req, res) => {
  const { id } = req.params;
  try {
    const productId = await Product.findByPk(id);
    if (!productId) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(productId);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createAllProducts = async (req, res) => {
  try {
    const { name, image, description, types, price, stock } = req.body;
    const newProduct = await createProduct(
      name,
      image,
      description,
      types,
      price,
      stock
    );
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductId,
  createAllProducts,
};
