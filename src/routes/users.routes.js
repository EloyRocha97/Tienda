const { Router } = require("express");
const jwt = require("jsonwebtoken");
const {
  authUser,
  login,
  protected,
  getUsers,
  getUserId,
  deleteUser,
  updateUser,
} = require("../Handlers/users.handler");
const { verifyToken } = require("../middleware/token.middleware");

const usersRouter = Router();

usersRouter.post("/auth", authUser);
usersRouter.post("/login", login);
usersRouter.get("/protected", verifyToken, protected);
usersRouter.get("/search", getUsers);
usersRouter.get("/search/:id", getUserId);
usersRouter.delete("/:id", deleteUser);
usersRouter.put("/:id", updateUser);

module.exports = usersRouter;
