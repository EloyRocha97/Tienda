const { Turner } = require("../db");

const createTurn = async (userId, calendaryId, date, schedules, productId) => {
  try {
    const newTurn = await Turner.create({
      UserId: userId,
      calendaryId: calendaryId,
      date: date,
      schedules: schedules,
      productId: productId,
      state: true,
    });
    return newTurn;
  } catch (error) {
    console.error("Error al crear el turno:", error);
    throw error;
  }
};

module.exports = {
  createTurn,
};
