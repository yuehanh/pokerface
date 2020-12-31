const { Stock, Price } = require("../models");

const generateFlucuations = (lastPrices) => {
  const tickers = Object.keys(lastPrices);
  for (const ticker of tickers) {
    const currPrice = Number(lastPrices[ticker]);
    const adjustment = currPrice * 0.1 * (Math.random() - 0.5);
    lastPrices[ticker] = (currPrice + adjustment).toFixed(2);
    console.log(lastPrices);
  }
  return lastPrices;
};

const simulate = (lastPrices) => {
  const time = new Date();
  let pricePairs = generateFlucuations(lastPrices);
  const stockTickers = Object.keys(pricePairs);
  for (const stockTicker of stockTickers) {
    const tickerPrice = pricePairs[stockTicker];
    Price.create({ tickerPrice, stockTicker, time });
  }
  setTimeout(() => simulate(pricePairs), 1000); //thinking about making a control gate here to adjust the interval dynamically to approximate actual 1s interval
};

module.exports = async function stockSimulation() {
  const stocks = await Stock.findAll();
  const lastPrices = {};
  for (const stock of stocks) {
    const price = await stock.getPrices({
      order: [["time", "DESC"]],
      limit: 1,
    });
    lastPrices[stock.ticker] = Number(price[0].tickerPrice);
  }
  generateFlucuations(lastPrices);
  simulate(lastPrices);
};
