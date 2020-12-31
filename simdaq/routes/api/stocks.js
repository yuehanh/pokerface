const express = require("express");
const router = express.Router();
const { Stock, Price } = require("../../models");
const price = require("../../models/price");

router.get("/index", (req, res) => {
  Stock.findAll()
    .then((stocks) => {
      const payload = stocks.map((stock) => ({ ticker: stock.ticker }));
      return res.json(payload);
    })
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
      const payload = prices.map((price) => ({
        time: price.time,
        ticker: price.stockTicker,
        tickerPrice: price.tickerPrice,
      }));
      res.json(payload);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
