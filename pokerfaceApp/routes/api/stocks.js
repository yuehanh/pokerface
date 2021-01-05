const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", (req, res) => {
  //can add a token verification method to ensure the data comes from a trusted source
  console.log(req.body);
  return res.status(200);
});

// router.get("/", (req, res) => {
//   if (req.query.ticker) {
//     axios
//       .get(
//         `http://localhost:5000/api/stocks/prices/limited/?stockTicker=${req.query.ticker}`
//       )
//       .then((payload) => {
//         return res.json(payload.data);
//       })
//       .catch((err) => res.status(400).json(err));
//   } else {
//     return res.status(400).json("Please specify a Ticker");
//   }
// });

module.exports = router;
