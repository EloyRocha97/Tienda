const { Product } = require("../db");
const { Op } = require("sequelize");
const { createProduct } = require("../Controllers/products.controller");
const bcrypt = require("bcryptjs");

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

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await Product.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ borrado: true, user });
  } catch (error) {
    res.status(400).send("No se pude eliminar al producto");
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  try {
    // Elimino la contraseña del objeto user antes de actualizar
    const { password, ...updatedProduct } = product;
    //hasheéar la contraseña antes de actualizar
    if (password) {
      const saltRounds = 10;
      updatedProduct.password = await bcrypt.hash(password, saltRounds);
    }
    // Actualizar el usuario en la base de datos
    await Product.update(updatedProduct, {
      where: { id: id },
    });
    return res.json({ cambiado: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send("No se pudo editar el producto");
  }
};

module.exports = {
  getProducts,
  getProductId,
  createAllProducts,
  deleteProducts,
  updateProduct,
};
