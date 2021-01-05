import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import "../stylesheets/stock_row.css";
export const StockRow = (props) => {
  const { ticker, history } = props;
  const historyLen = history.length;
  const prevPrice = history[historyLen - 2];
  const currPrice = history[historyLen - 1];
  let currColor = null;

  if (prevPrice !== currPrice) {
    currColor = Number(prevPrice) < Number(currPrice) ? "green" : "red";
  }

  return (
    <tr>
      <td>{ticker}</td>
      <td className={currColor}>{currPrice}</td>

      <td>
        <Sparklines
          margin={16}
          data={historyLen > 3 ? history : [1, 2]}
          limit={50}
        >
          <SparklinesLine color="blue" />
        </Sparklines>
      </td>
    </tr>
  );
};
