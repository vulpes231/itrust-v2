import React from "react";
import { formatCurrency } from "../../constants";
import { format } from "date-fns";
import { capitalize } from "lodash";

const Date = (cell) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
      >
        <span>{format(cell.getValue(), "dd MMM, yyyy")}</span>
        <small className="text-muted">
          {format(cell.getValue(), "hh:mm a")}
        </small>
      </div>
    </React.Fragment>
  );
};
const Quantity = (cell) => {
  return (
    <React.Fragment>{parseFloat(cell.getValue()).toFixed(4)}</React.Fragment>
  );
};
const OrderType = (cell) => {
  return (
    <React.Fragment>
      <span
        className={cell.getValue() === "buy" ? "text-success" : "text-danger"}
      >
        {capitalize(cell.getValue())}
      </span>
    </React.Fragment>
  );
};

const AvgPrice = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const CurrentValue = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const Returns = (cell) => {
  const today = cell.row.original.performance.todayReturn;
  const todayPercent = cell.row.original.performance.todayReturnPercent;
  return (
    <React.Fragment>
      <div className="d-flex flex-column gap-1">
        <span>{formatCurrency(today)}</span>
        <span
          className={`fs-12 ${
            todayPercent < 0 ? "text-danger" : "text-success"
          }`}
        >
          {parseFloat(todayPercent).toFixed(2)}%
        </span>
      </div>
    </React.Fragment>
  );
};

export { Quantity, AvgPrice, CurrentValue, Returns, OrderType, Date };
