const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World111"));


// Run locally on 5000, on variable if deployed
const port = process.env.PORT || 5000;

// Test to make sure Express is working
app.listen(port, () => console.log(`Server is running on port ${port}`));

