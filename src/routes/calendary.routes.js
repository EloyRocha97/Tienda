const { Router } = require("express");
const { createCalendary } = require("../Handlers/calendary.handler");
const { createTurn } = require("../Handlers/turner.handler");

const calendaryRouter = Router();

// Endpoint para crear un nuevo calendario
calendaryRouter.post("/", createCalendary);
// calendaryRouter.post("/", createCalendary, createTurn);

module.exports = calendaryRouter;
