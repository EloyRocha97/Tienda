const { Router } = require("express");

const {
  getProducts,
  getProductId,
  createAllProducts,
  deleteProducts,
  updateProduct,
} = require("../Handlers/products.hanlder");

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductId);
productsRouter.delete("/:id", deleteProducts);
productsRouter.put("/:id", updateProduct);
productsRouter.post("/", createAllProducts);

module.exports = productsRouter;
