const { Sequelize } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/tienda`,
  { logging: false, native: false }
);

//**
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
//**

//relacionamos

const { User, Product, Turner, Calendary, FavoriteProducts } = sequelize.models;

User.hasMany(Product); //User tiene muchos Productos
User.belongsToMany(Product, {
  through: FavoriteProducts,
  foreignKey: "userId",
});
Product.belongsToMany(User, {
  through: FavoriteProducts,
  foreignKey: "productId",
});
User.hasMany(Turner);
Calendary.hasMany(Turner);
Turner.belongsTo(User);
Turner.belongsTo(Calendary);
Turner.belongsTo(Product);

module.exports = { sequelize, ...sequelize.models };
