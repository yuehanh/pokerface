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
    })
      .then((stocks) => {
        //stocks table later may contain company info related to the stock. for now it just has its ticker
        const payload = stocks.map((stock) => ({ ticker: stock.ticker }));
        return res.json(payload);
      })
      .catch((err) => res.status(400).json(err));
  } else {
    return res.status(400).json("Please specify a starting time");
  }
});

module.exports = router;
