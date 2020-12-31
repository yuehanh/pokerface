const express = require("express");
const router = express.Router();
const { Stock, Price } = require("../../models");

router.get("/index", (req, res) => {
  Stock.findAll()
    .then((stocks) => {
      //stocks table later may contain company info related to the stock. for now it just has its ticker
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

router.get("/prices/limited", (req, res) => {
  //impose a max 500 result limit on request
  const dataLimit = Math.min(req.query.limit || 500, 500);
  Price.findAll({
    where: {
      stockTicker: req.query.stockTicker,
    },
    order: [["time", "DESC"]],
    limit: dataLimit,
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
