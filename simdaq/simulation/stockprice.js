const { Stock, Price } = require("../models");

const generateFlucuations = (lastPrices) => {
  const tickers = Object.keys(lastPrices);
  const time = new Date();
  for (const stockTicker of tickers) {
    const currPrice = Number(lastPrices[stockTicker]);
    const adjustment = currPrice * 0.1 * (Math.random() - 0.5);
    const tickerPrice = (currPrice + adjustment).toFixed(2);
    lastPrices[stockTicker] = tickerPrice;
    Price.create({ tickerPrice, stockTicker, time });
  }
  console.log(lastPrices);
  return lastPrices;
};

const simulate = (pricePairs) => {
  let lastPrices = generateFlucuations(pricePairs);

  setTimeout(() => simulate(lastPrices), 1000); //thinking about making a control gate here to adjust the interval dynamically to approximate actual 1s interval
};

module.exports = async function stockSimulation() {
  const stocks = await Stock.findAll();
  const lastPrices = {};
  for (const stock of stocks) {
    const price = await stock.getPrices({
      order: [["time", "DESC"]],
      limit: 1,
    });
    //could also add a formula that fills in all the price simulation since the last timestamp
    lastPrices[stock.ticker] = Number(price[0].tickerPrice);
  }
  simulate(lastPrices);
};
