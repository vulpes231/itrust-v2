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
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
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

const RealizedPL = ({ value, percent }) => {
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
