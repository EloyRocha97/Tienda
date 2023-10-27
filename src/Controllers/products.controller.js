const { Product } = require("../db");

const createProduct = async (name, image, description, types, price, stock) => {
  if (!name || typeof name !== "string") {
    throw new Error("El nombre del producto es incorrecto");
  }
  if (!description || typeof description !== "string") {
    throw new Error("La descripcion no puede estar vacia");
  }

  if (!price || price < 0 || isNaN(Number(price))) {
    throw new Error("No se proporciono precio, o el formato es incorrecto");
  }
  const newProduct = await Product.create({
    name,
    image,
    description,
    types,
    price,
    stock,
  });
  return newProduct;
};

module.exports = { createProduct };
