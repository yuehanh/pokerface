// const axios = require("axios");
// const NodeCache = require("node-cache");
// //Fetch stock Ticker List

// const fetchStockTickers = async () => {
//   try {
//     const payload = await axios.get("http://localhost:5000/api/stocks");
//     const stockTickers = payload.data.map((obj) => obj.ticker);
//     return stockTickers;
//   } catch (err) {
//     console.log(err);
//   }
// };

// const fetchRecentPrices = async () => {
//   try {
//     const payload = await axios.get("http://localhost:5000/api/prices");
//     return payload.data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// const initializeCacheMap = async (stdTTL = 600) => {
//   const cacheMap = {};
//   const stockTickers = (await fetchStockTickers()) || [];
//   const recentPrices = (await fetchRecentPrices()) || [];

//   for (const stockTicker of stockTickers) {
//     cacheMap[stockTicker] = new NodeCache({
//       stdTTL,
//       checkperiod: Math.floor(stdTTL / 2),
//     });
//   }
//   let mostRecentTime = recentPrices[0] ? recentPrices[0].time : null;
//   for (const priceObj of recentPrices) {
//     const { time, stockTicker } = priceObj;
//     cacheMap[stockTicker].set(time, priceObj);
//   }
//   return { cacheMap, mostRecentTime, stockTickers };
// };

// module.exports = initializeCacheMap;
