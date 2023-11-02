const { Router } = require("express");
// const { verifyToken } = require("../middleware/token.middleware");

const favoriteRouter = Router();

const {
  toggleFavorite,
  removeFromFavorites,
} = require("../Handlers/FavoriteProducts.handler");

favoriteRouter.post("/:userId/favorites/:productId", toggleFavorite);
favoriteRouter.delete(
  "/:userId/favoritesDelete/:productId",
  removeFromFavorites
);

module.exports = favoriteRouter;
