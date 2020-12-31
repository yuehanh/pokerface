require("dotenv").config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db/sqlite-dev.db",
  },
  test: {
    dialect: "sqlite",
    storage: "./db/sqlite-test.db",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
};
