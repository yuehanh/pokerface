const express = require("express");
const wss = require("../../app");
const WebSocket = require("ws");
const router = express.Router();
const { Price } = require("../../models");

router.post("/", (req, res) => {
  //can add a token verification method to ensure the data comes from a trusted source

  const { lastPrices, time } = req.body;
  const tickers = Object.keys(lastPrices);
  for (const stockTicker of tickers) {
    const tickerPrice = lastPrices[stockTicker];
    try {
      Price.create({ tickerPrice, stockTicker, time });
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ lastPrices, time }));
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }
  return res.status(200);
});

module.exports = router;
