"use strict";

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "Prices",
      [
        {
          stockTicker: "WATER",
          time: new Date(),
          tickerPrice: 4.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          stockTicker: "FIRE",
          time: new Date(),
          tickerPrice: 40.12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          stockTicker: "METAL",
          time: new Date(),
          tickerPrice: 342.11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          stockTicker: "WOOD",
          time: new Date(),
          tickerPrice: 15.22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          stockTicker: "DIRT",
          time: new Date(),
          tickerPrice: 0.25,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
