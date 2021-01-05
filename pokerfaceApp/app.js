const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const WebSocket = require("ws");
const app = express();

app.get("/", (req, res) => res.send("Welcome to Pokerface"));

// Run locally on 4000, on variable if deployed
const port = process.env.PORT || 4000;

// Test to make sure Express is working
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setup websocket
const wss = new WebSocket.Server({ port: 8080 });
wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  ws.send("connecting");
});
module.exports = wss;

// Create API routes
const prices = require("./routes/api/prices");
app.use("/api/prices", prices);
