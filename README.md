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
