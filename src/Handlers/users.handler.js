const { User } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { JWT_SING } = process.env;

const authUser = async (req, res) => {
  try {
    const { email, password, name, rol, favorite, shoppingHistory } = req.body;
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
      return res.status(400).send({ message: "this email already exists." });
    }

    const saltRounds = 10;
    const hashsedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      favorite,
      shoppingHistory,
      rol,
      password: hashsedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        rol: newUser.rol,
      },
      JWT_SING
    );

    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).send({ message: "invalid credentials." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).send({ message: "invalid credentials." });

    const token = jwt.sign(
      { userId: user.id, name: user.name, rol: user.rol },
      JWT_SING
    );
    res.json({ token, user });
  } catch (error) {}
};

const protected = (req, res) => {
  const user = req.user;
  console.log(user);
  if (user && user.rol && user.rol === "admin") {
    res.json({ msg: "Llevas protección ;)" });
  } else {
    res
      .status(403)
      .json({ message: "No tienes permiso para acceder a esta función." });
  }
};

const getUsers = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const users = await User.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      res.status(200).json(users);
    } else {
      const users = await User.findAll();
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserId = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findByPk(id);
    return res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  authUser,
  login,
  protected,
  getUsers,
  getUserId,
};
