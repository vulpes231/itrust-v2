import React from "react";

const Price = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const Pairs = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const HighPrice = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const LowPrice = (cell) => {
  return <React.Fragment>{cell.getValue()}</React.Fragment>;
};

const MarketVolume = (cell) => {
  return (
    <React.Fragment>
      <span className="text-capitalize">{cell.getValue()}</span>
    </React.Fragment>
  );
};

export { Price, Pairs, HighPrice, LowPrice, MarketVolume };
