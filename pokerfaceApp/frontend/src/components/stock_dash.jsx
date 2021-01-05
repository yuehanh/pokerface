import React, { useEffect, useState, useRef } from "react";
import { StockRow } from "./stock_row";
import "../stylesheets/stock_dash.css";
export const StockDash = () => {
  const ws = useRef(null);
  const [stockData, setStockData] = useState({});

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

  return (
    <div className="wrapper">
      <table className>
        <thead>
          <tr>
            <th colspan="3" className="title">
              Stock Dashboard
            </th>
          </tr>
          <tr className="header">
            <th>Name</th>
            <th>Last Price</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stockData)
            .filter((el) => el !== "updateTime")
            .map((stock) => (
              <StockRow ticker={stock} history={stockData[stock]} key={stock} />
            ))}
        </tbody>
      </table>
    </div>
  );
};
