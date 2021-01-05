# Installation

```
npm run install-all
```

# Starting the App

```
npm start
```

Frontend server is at port localhost:3000

# Stack & Technology

- SQLite (dev) can switch to Postgre (production)
- Sequelize ORM
- Express.js
- Node.js
- React.js
- Websocket.js

# Component Interactions

- Simdaq connects to the Pokerface App backend using webhook
- Pokerface App backend connects to the frontend using websocket allowing bilateral communication

# API Endpoints

### `stocks`

- `GET /api/stocks` - returns all stocks ticker

For future features:

- `GET /api/stocks/prices` - return price history on requested stock ticker (req.query.ticker)
- `GET /api/stocks/prices/limited` - return price history on requested stock ticker with a MAX 500 result limit

### `prices`

- `GET /api/prices` - return all prices generated after a specified time (req.query.time) or most recent 500 prices(if no time query sent)

Note: Sequelize use bind parameters to prevent injection attack

# Database Schema

## `stocks`

| column name  | data type | details               |
| :----------- | :-------: | :-------------------- |
| `ticker`     |  string   | not null, primary key |
| `created_at` | datetime  | not null              |
| `updated_at` | datetime  | not null              |

## `prices`

| column name   | data type | details                        |
| :------------ | :-------: | :----------------------------- |
| `id`          |  integer  | not null, primary key          |
| `stockTicker` |  string   | not null, indexed, foreign key |
| `time`        | datetime  | not null, indexed              |
| `tickerPrice` | datetime  | not null,                      |
| `created_at`  | datetime  | not null                       |
| `updated_at`  | datetime  | not null                       |

- `prices` belongs to `stocks` through `stockTicker` foreign key

# Features

## Stock Price Simulation

```js
const generateFluctuations = (lastPrices) => {
  const tickers = Object.keys(lastPrices);
  const time = new Date();
  for (const stockTicker of tickers) {
    const currPrice = Number(lastPrices[stockTicker]);
    const fluctuation = currPrice * 0.1 * (Math.random() - 0.5);
    const tickerPrice = Math.max(0, currPrice + fluctuation).toFixed(2);
    lastPrices[stockTicker] = tickerPrice;
    Price.create({ tickerPrice, stockTicker, time });
  }
  return { lastPrices, time };
};

const simulate = (pricePairs) => {
  let payload = generateFluctuations(pricePairs);
  axios
    .post("http://localhost:4000/api/prices/", payload)
    .catch((err) => console.log(err));

  setTimeout(() => simulate(payload.lastPrices), 1000);
  //Can make a control gate here to adjust the interval dynamically to approximate actual 1s interval
};
```

## Websocket

## Server Side

```js
const wss = new WebSocket.Server({ port: 8080 });
wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  ws.send("connecting");
});
```

## Server Broacasting

```js
...
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
...
```

## Frontend Client

```js
useEffect(() => {
  ws.current = new WebSocket("ws://localhost:8080");
  ws.current.onopen = () => console.log("ws opened");
  ws.current.onclose = () => console.log("ws closed");

  return () => {
    ws.current.close();
  };
}, []);

useEffect(() => {
  if (!ws.current) return;

  ws.current.onmessage = (e) => {
    const message = JSON.parse(e.data);
    const { lastPrices, time } = message;
    const stocks = Object.keys(lastPrices);
    const newStockData = Object.assign({}, stockData);
    newStockData["updateTime"] = newStockData.updateTime || [];
    const lastUpdateTime = newStockData.updateTime.slice(-1)[0];
    if (time !== lastUpdateTime) {
      newStockData["updateTime"].push(time);
      for (const stock of stocks) {
        if (newStockData[stock]) {
          newStockData[stock].push(lastPrices[stock]);
          if (newStockData[stock].length > 50) {
            newStockData[stock].shift();
          }
        } else {
          newStockData[stock] = [lastPrices[stock]];
        }
      }
      setStockData(newStockData);
    }
  };
});
```
