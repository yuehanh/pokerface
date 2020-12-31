"use strict";
module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "Stocks",
      [
        {
          ticker: "WATER",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ticker: "FIRE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ticker: "METAL",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ticker: "WOOD",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ticker: "DIRT",
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
