"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Price.belongsTo(models.Stock, {
        foreignKey: "stockTicker",
        as: "ticker",
      });
    }
  }
  Price.init(
    {
      tickerPrice: DataTypes.DECIMAL,
      time: DataTypes.DATE,
      stockTicker: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Price",
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["time", "stockId"],
        },
      ],
    }
  );
  return Price;
};
