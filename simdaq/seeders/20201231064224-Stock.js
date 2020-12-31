"use strict";
module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "Stocks",
      [
        {
          ticker: "WATER",
          lastPrice: 4.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ticker: "FIRE",
          lastPrice: 40.12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ticker: "METAL",
          lastPrice: 342.11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ticker: "WOOD",
          lastPrice: 15.22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ticker: "DIRT",
          lastPrice: 0.25,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
