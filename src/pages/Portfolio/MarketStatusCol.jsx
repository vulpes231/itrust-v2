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
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
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
  return <React.Fragment>{formatCurrency(cell.getValue())}</React.Fragment>;
};

export { Quantity, AvgPrice, CurrentValue, Returns, OrderType, Date };
