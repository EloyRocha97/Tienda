const { Turner, Calendary } = require("../db");
const { v4: uuidv4 } = require("uuid");

const reserveTurn = async (req, res) => {
  const { turnId } = req.params;
  try {
    const turn = await Turner.findByPk(turnId);
    if (!turn) {
      return res.status(404).json({ message: "Turno no encontrado." });
    }

    if (!turn.available) {
      return res.status(400).json({ message: "Este turno ya está ocupado." });
    }

    await turn.update({ available: false });

    return res.status(200).json({ message: "Turno reservado exitosamente." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

const getAvailableTurns = async (req, res) => {
  try {
    const availableTurns = await Turner.findAll({
      where: {
        available: true,
      },
    });
    return res.status(200).json(availableTurns);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor get." });
  }
};

const createTurn = async (req, res) => {
  try {
    const { date, schedules, userId, productId } = req.body;

    // Aquí se asume que ya tienes un calendario en la base de datos
    const calendary = await Calendary.findOne({
      where: { availability: true },
    });

    if (!calendary) {
      return res.status(400).json({ message: "No hay calendario disponible." });
    }

    const calendaryId = calendary.id;
    const newTurn = await Turner.create({
      date,
      schedules,
      userId,
      calendaryId,
      productId,
      available: true,
    });

    return res.status(201).json(newTurn);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor create." });
  }
};

module.exports = {
  reserveTurn,
  getAvailableTurns,
  createTurn,
};
