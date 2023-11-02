const jwt = require("jsonwebtoken");
const { JWT_SING } = process.env;
const { User } = require("../db");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ msg: "No se proporcionó un token" });
  }
  try {
    const decodedToken = await jwt.verify(token, JWT_SING);

    // Verifica si el usuario asociado con el token existe en la base de datos
    const user = await User.findByPk(decodedToken.id);
    // console.log("hlanda", decodedToken);
    if (!user) {
      return res.status(401).send({ msg: "Usuario no encontrado" });
    }
    req.user = user; // Establece el usuario en req.user
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { verifyToken };
