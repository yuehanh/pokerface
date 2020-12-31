"use strict";

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "Prices",
      [
        {
          stockId: 1,
          time: new Date(),
          tickerPrice: 4.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          stockId: 2,
          time: new Date(),
          tickerPrice: 40.12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          stockId: 3,
          time: new Date(),
          tickerPrice: 342.11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          stockId: 4,
          time: new Date(),
          tickerPrice: 15.22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          stockId: 5,
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
