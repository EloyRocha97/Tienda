const { Router } = require("express");

const { createTurn } = require("../Handlers/turner.handler");

const turnerRouter = Router();

turnerRouter.post("/", createTurn);

module.exports = turnerRouter;
