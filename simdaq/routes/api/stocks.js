const express = require("express");
const router = express.Router();
const { Stock, Price } = require("../../models");

router.get("/index", (req, res) => {
  Stock.findAll()
    .then((stocks) => res.json(stocks))
    .catch((err) => res.status(400).json(err));
});

router.get("/prices", (req, res) => {
  Price.findAll({
    where: {
      stockTicker: req.query.stockTicker,
    },
    order: [["time", "DESC"]],
  })
    .then((prices) => {
      res.json(prices);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
