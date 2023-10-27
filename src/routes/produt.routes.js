const { Router } = require("express");

const {
  getProducts,
  getProductId,
  createAllProducts,
} = require("../Handlers/products.hanlder");

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductId);
productsRouter.post("/", createAllProducts);

module.exports = productsRouter;
