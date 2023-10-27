const jwt = require("jsonwebtoken");
const { JWT_SING } = process.env;
const { User } = require("../db");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).send({ msg: "No se proporciono un token" });
  try {
    const decodeToken = await jwt.verify(token, JWT_SING);
    console.log("mide", decodeToken);
    req.user = decodeToken;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { verifyToken };
