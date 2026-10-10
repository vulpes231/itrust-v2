import React from "react";
import { Label } from "reactstrap";
import { formatCurrency } from "../../constants";
import numeral from "numeral";
import CurrencySign from "../CurrencySign";

const CustomRow = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "space-between",
      }}
    >
      {children}
    </div>
  );
};

const TransferLimits = ({ currency }) => {
  return (
    <div>
      <Label
        className="pt-3 px-3"
        style={{
          fontSize: "16px",
          fontWeight: "600",
          // lineHeight: "0",
          // backgroundColor: "red",
        }}
      >
        Transfer Limits
      </Label>
      <hr
        // className="p-0"
        style={{ border: "0.5px solid gray", padding: "0px" }}
      />
      <div
        className="pb-3 px-3"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          fontSize: "14px",
        }}
      >
        <CustomRow>
          <b className="text-muted " style={{ fontWeight: 300 }}>
            Minimum Transfer
          </b>
          <small
            className="d-flex align-items-center"
            style={{ fontWeight: 500 }}
          >
            <CurrencySign />
            {numeral(50).format("0,0.00")}
          </small>
        </CustomRow>
        <CustomRow>
          <b className="text-muted" style={{ fontWeight: 300 }}>
            Daily Limit
          </b>
          <small
            className="d-flex align-items-center"
            style={{ fontWeight: 500 }}
          >
            <CurrencySign />
            {numeral(1000).format("0,0.00")}
          </small>
        </CustomRow>
        <CustomRow>
          <b className="text-muted " style={{ fontWeight: 300 }}>
            Monthly Limit
          </b>
          <small
            className="d-flex align-items-center"
            style={{ fontWeight: 500 }}
          >
            <CurrencySign />
            {numeral(3000).format("0,0.00")}
          </small>
        </CustomRow>
      </div>
    </div>
  );
};

export default TransferLimits;
