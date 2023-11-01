const { Router } = require("express");
const productsRouter = require("./produt.routes");
const usersRouter = require("./users.routes");
const turnerRouter = require("./turner.routes");
const calendaryRouter = require("./calendary.routes");

const mainRouter = Router();

mainRouter.use("/product", productsRouter);
mainRouter.use("/user", usersRouter);
mainRouter.use("/turner", turnerRouter);
mainRouter.use("/calendary", calendaryRouter);

module.exports = mainRouter;
