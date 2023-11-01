const { Router } = require("express");

const {
  reserveTurn,
  getAvailableTurns,
  createTurn,
} = require("../Handlers/turner.handler");

const turnerRouter = Router();

// Endpoint para crear un nuevo turno
turnerRouter.post("/", createTurn);

// Endpoint para reservar un turno y obtener los turnos disponibles
turnerRouter.post("/reserve", reserveTurn, getAvailableTurns);

module.exports = turnerRouter;
