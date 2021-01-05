const express = require("express");
const router = express.Router();
const { Price } = require("../../models");
const { Op } = require("sequelize");

//get all price after a certain time, or most recent 500 prices
router.get("/", (req, res) => {
  if (req.query.time) {
    Price.findAll({
      where: {
        time: {
          [Op.gt]: req.query.time,
        },
      },
      order: [["time", "DESC"]],
    })
      .then((prices) => {
        const payload = prices.map((price) => ({
          time: price.time,
          stockTicker: price.stockTicker,
          tickerPrice: price.tickerPrice,
        }));
        res.json(payload);
      })
      .catch((err) => res.status(400).json(err));
  } else {
    Price.findAll({
      order: [["time", "DESC"]],
      limit: 500,
    })
      .then((prices) => {
        const payload = prices.map((price) => ({
          time: price.time,
          stockTicker: price.stockTicker,
          tickerPrice: price.tickerPrice,
        }));
        res.json(payload);
      })
      .catch((err) => res.status(400).json(err));
  }
});

module.exports = router;
