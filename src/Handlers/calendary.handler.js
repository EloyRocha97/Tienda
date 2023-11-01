const { Calendary, Turner } = require("../db");

const createCalendary = async (req, res) => {
  try {
    const newCalendary = await Calendary.create({
      name: "Current Calendar",
      date: req.body.date,
      availability: true,
    });

    return res.status(201).json(newCalendary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
module.exports = {
  createCalendary,
};
