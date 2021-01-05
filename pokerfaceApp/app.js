const express = require("express");
const initializeCacheMap = require("./cache/price_cache");
const bodyParser = require("body-parser");
const app = express();

app.get("/", (req, res) => res.send("Welcome to Pokerface"));

// Run locally on 4000, on variable if deployed
const port = process.env.PORT || 4000;

// Test to make sure Express is working
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create API routes
const stocks = require("./routes/api/stocks");
app.use("/api/stocks", stocks);

initializeCacheMap();
