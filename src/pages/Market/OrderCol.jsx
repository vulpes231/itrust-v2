import numeral from "numeral";
import React from "react";

const Date = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const Type = (cell) => {
  const type = cell.getValue();
  return (
    <React.Fragment>
      <span
        className={`text-capitalize ${
          type === "buy" ? "text-success" : "text-danger"
        }`}
      >
        {cell.getValue()}
      </span>
    </React.Fragment>
  );
};

const AssetName = ({ name, symbol, image }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <span
        className="p-1 rounded-circle bg-light"
        // style={{ width: "27px", height: "27px" }}
      >
        <img
          src={image}
          alt={"HS"}
          style={{ borderRadius: "50%", width: "25px", height: "25px" }}
        />
      </span>
      <div>
        <div>{name}</div>
        <small className="text-muted">{symbol}</small>
      </div>
    </div>
  );
};

const Account = (cell) => {
  return (
    <React.Fragment>
      <span className="text-capitalize">{cell.getValue()}</span>
    </React.Fragment>
  );
};

const Amount = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const Quantity = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const CurrentValue = (cell) => {
  const currentValue =
    Number(cell?.row?.original?.performance?.currentValue) || 0;

  // console.log(currentValue);

  const extra = Number(cell?.row?.original?.extra) || 0;

  const leverage = Number(cell?.row?.original?.execution?.leverage) || 1;

  const marginDebt = Number(cell?.row?.original?.execution?.marginDebt) || 0;

  // console.log(currentValue, leverage, extra, marginDebt);

  const leveragedExtra = extra * leverage;

  const adjustedValue = currentValue - extra + leveragedExtra;

  const total = adjustedValue - marginDebt;

  return <>{numeral(total).format("$0,0.00")}</>;
};

const UnrealizedPL = ({ value, percent }) => {
  return (
    <React.Fragment>
      <div className="d-flex gap-2 flex-column">
        <span>{value}</span>
        <span
          className={`${percent < 0 ? "text-danger" : "text-success"} fs-12`}
        >
          {percent}%
        </span>
      </div>
    </React.Fragment>
  );
};

const RealizedPL = ({ cell, value, percent }) => {
  const totalReturn = value || 0;
  const extra = Number(cell?.row?.original?.extra) || 0;
  const leverage = Number(cell?.row?.original?.execution?.leverage) || 1;

  const leveragedExtra = extra * leverage;

  // console.log(totalReturn, extra, leverage);

  const adjustedReturn = totalReturn - extra + leveragedExtra;
  return (
    <React.Fragment>
      <div className="d-flex gap-2 flex-column">
        <span>{numeral(adjustedReturn).format("$0,0.00")}</span>
        <span
          className={`${percent < 0 ? "text-danger" : "text-success"} fs-12`}
        >
          {percent}%
        </span>
      </div>
    </React.Fragment>
  );
};

const Status = (cell) => {
  const status = cell.getValue();
  return (
    <React.Fragment>
      <span
        className={`px-4 py-1 rounded-2 text-capitalize fs-12 text-light ${
          status === "open" ? "bg-success" : "bg-danger"
        }`}
      >
        {cell.getValue()}
      </span>
    </React.Fragment>
  );
};

export {
  Date,
  Type,
  AssetName,
  Account,
  Amount,
  Quantity,
  CurrentValue,
  UnrealizedPL,
  RealizedPL,
  Status,
};
