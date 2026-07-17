import { capitalize, upperCase } from "lodash";
import React from "react";
import { auto, broke, cash } from "../../assets";
import { getWalletColorBySlug, getWalletLogoBySlug } from "../../constants";

const FromCol = (cell) => {
  return <React.Fragment>{upperCase(cell.getValue())}</React.Fragment>;
};

const ToCol = ({ cell, trnx }) => {
  const cellValue = cell.getValue();

  const tag = trnx.tag ? trnx.tag : trnx.account;

  return (
    <React.Fragment>
      <div className="d-flex align-items-center gap-2">
        <span className="text-muted">
          <i
            style={{
              color: getWalletColorBySlug(tag),
            }}
            className={getWalletLogoBySlug(tag)}
          />
        </span>
        <span className="text-uppercase fs-13">{cellValue}</span>
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
    status === "pending" ? (
      <i className="ri-time-line align-bottom"></i>
    ) : status === "processed" ? (
      <i className="ri-checkbox-circle-line align-bottom"></i>
    ) : status === "cancelled" ? (
      <i className="ri-close-circle-line align-bottom"></i>
    ) : null;
  return (
    <React.Fragment>
      <span
        className={`${
          status === "pending"
            ? "bg-warning-subtle text-warning badge text-capitalize"
            : status === "processed"
              ? "bg-success-subtle text-success badge text-capitalize"
              : status === "cancelled"
                ? "bg-danger-subtle text-danger badge text-capitalize"
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
