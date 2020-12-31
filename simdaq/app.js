const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Welcome to SimDAQ"));

// Run locally on 5000, on variable if deployed
const port = process.env.PORT || 5000;

// Test to make sure Express is working
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Create API routes
const stocks = require("./routes/api/stocks");
app.use("/api/stocks", stocks);

const prices = require("./routes/api/prices");
app.use("/api/prices", prices);

