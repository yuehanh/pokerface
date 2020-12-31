require("dotenv").config();
//use sqlite3 for demo can change to postgres in production
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
