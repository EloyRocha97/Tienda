const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            arg: [3],
            msg: "El campo debe tener al menos 3 caracteres",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "El email es incorrecto",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8],
          },
        },
      },
      favorite: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      shoppingHistory: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      rol: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
        field: "rol",
      },
    },
    {
      timestamps: false,
    }
  );
};
