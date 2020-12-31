const express = require("express");
const router = express.Router();
const { Price } = require("../../models");

router.get("/", (req, res) => {
  Price.findAll()
    .then((prices) => res.json(prices))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
