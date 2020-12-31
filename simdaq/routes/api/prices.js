const express = require("express");
const router = express.Router();
const { Price } = require("../../models");
const { Op } = require("sequelize");

//get all price after a certain time
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
          ticker: price.stockTicker,
          tickerPrice: price.tickerPrice,
        }));
        res.json(payload);
      })
      .catch((err) => res.status(400).json(err));
  } else {
    return res.status(400).json("Please specify a starting time");
  }
});

module.exports = router;
