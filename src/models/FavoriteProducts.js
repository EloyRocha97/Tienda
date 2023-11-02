const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "FavoriteProducts",
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
