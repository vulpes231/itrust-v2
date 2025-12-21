import { capitalize, upperCase } from "lodash";
import React from "react";
import { auto, broke, cash } from "../../assets";

const FromCol = (cell) => {
  return <React.Fragment>{upperCase(cell.getValue())}</React.Fragment>;
};
{
  /* <i class="ri-24-hours-line"></i> */
}
{
  /* <i class="ri-bar-chart-2-line"></i> */
}
const ToCol = (cell) => {
  const getIcon = (value) => {
    switch (value) {
      case "cash":
        return broke;
      case "automated investing":
        return auto;
      case "brokerage":
        return cash;
      default:
        return null;
    }
  };

  const cellValue = cell.getValue();
  const icon = getIcon(cellValue);

  return (
    <React.Fragment>
      <div className="d-flex align-items-center gap-2">
        {icon && <img src={icon} alt="" width={20} />}
        <span>{capitalize(cellValue)}</span>
      </div>
    </React.Fragment>
  );
};

const DetailsCol = (cell) => {
  return <React.Fragment>{capitalize(cell.getValue())}</React.Fragment>;
};

const TransactionID = (cell) => {
  return <React.Fragment>{cell.getValue().slice(0, 16)}</React.Fragment>;
};

const TypeCol = (cell) => {
  return <React.Fragment>{capitalize(cell.getValue())}</React.Fragment>;
};

const Status = (cell) => {
  return (
    <React.Fragment>
      {cell.getValue() === "pending" ? (
        <span className="badge bg-warning-subtle text-warning fs-11">
          {" "}
          <i className="ri-time-line align-bottom"></i>{" "}
          {capitalize(cell.getValue())}
        </span>
      ) : cell.getValue() === "completed" ? (
        <span className="badge bg-success-subtle text-success fs-11">
          {" "}
          <i className="ri-checkbox-circle-line align-bottom"></i>{" "}
          {capitalize("processed")}
        </span>
      ) : cell.getValue() === "failed" ? (
        <span className="badge bg-danger-subtle text-danger fs-11">
          {" "}
          <i className="ri-close-circle-line align-bottom"></i>{" "}
          {capitalize(cell.getValue())}
        </span>
      ) : null}
    </React.Fragment>
  );
};

export { FromCol, ToCol, DetailsCol, TransactionID, TypeCol, Status };
