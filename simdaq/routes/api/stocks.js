const express = require("express");
const stock = require("../../models/stock");
const router = express.Router();
const { Stock } = require("../../models");

router.get("/", (req, res) => {
  Stock.findAll()
    .then((stocks) => res.json(stocks))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
