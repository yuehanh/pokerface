"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stock.hasMany(models.Price, {
        foreignKey: "stockTicker",
        as: "prices",
        onDelete: "CASCADE",
      });
    }
  }
  Stock.init(
    {
      ticker: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Stock",
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["ticker"],
        },
      ],
    }
  );
  return Stock;
};
