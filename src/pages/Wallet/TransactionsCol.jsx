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
      case "cash":
        return broke;
      case "automated investing":
        return auto;
      case "brokerage":
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
        {(icon && cellValue === "cash") ||
        cellValue === "automated investing" ? (
          <img src={icon} alt="" width={20} />
        ) : (
          <span>{icon}</span>
        )}
        <span>
          {cellValue === "Traditional IRA" || cellValue === "Health Savings"
            ? cellValue
            : capitalize(cellValue)}
        </span>
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
