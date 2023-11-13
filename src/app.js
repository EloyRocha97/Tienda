const express = require("express");
const morgan = require("morgan");
// const { verifyToken } = require("../src/middleware/token.middleware");
const mainRouter = require("./routes");
const path = require("path");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use(mainRouter);
app.use(express.static(path.resolve("src/public")));

module.exports = app;
