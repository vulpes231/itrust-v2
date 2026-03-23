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
  /*  */
}
const ToCol = (cell) => {
  const getIcon = (value) => {
    switch (value) {
      case "cash account":
        return cash;
      case "automated investing":
        return auto;
      case "individual brokerage":
        return (
          <i
            style={{ color: "#C5CAD0" }}
            className="ri-bar-chart-2-line fs-22"
          ></i>
        );
      case "Traditional IRA":
        return (
          <i style={{ color: "#C5CAD0" }} className="ri-shield-line fs-22"></i>
        );
      case "Health Savings":
        return (
          <i style={{ color: "#C5CAD0" }} className="ri-service-line fs-22"></i>
        );
      default:
        return null;
    }
  };

  const cellValue = cell.getValue();
  const icon = getIcon(cellValue);

  return (
    <React.Fragment>
      <div className="d-flex align-items-center gap-2">
        {(icon && cellValue === "cash account") ||
        cellValue === "automated investing" ? (
          <img src={icon} alt="" width={20} />
        ) : (
          <span>{icon}</span>
        )}
        <span className="text-capitalize">{cellValue}</span>
      </div>
    </React.Fragment>
  );
};

const DetailsCol = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const TransactionID = (cell) => {
  return <React.Fragment>{cell.getValue().slice(0, 16)}</React.Fragment>;
};

const TypeCol = (cell) => {
  return <React.Fragment>{capitalize(cell.getValue())}</React.Fragment>;
};

const Status = (cell) => {
  const status = cell.getValue();
  const icon =
    status === "pending" ? <i className="ri-time-line align-bottom"></i> : null;
  return (
    <React.Fragment>
      <span
        className={`${
          status === "pending"
            ? "bg-warning-subtle text-warning badge text-capitalize"
            : ""
        }`}
      >
        <span className="d-flex items-center gap-1 p-1 rounded-4">
          {icon}
          {cell.getValue()}
        </span>
      </span>
    </React.Fragment>
  );
};

export { FromCol, ToCol, DetailsCol, TransactionID, TypeCol, Status };
