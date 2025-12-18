import React from "react";
import { Label } from "reactstrap";
import { formatCurrency } from "../../constants";

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

const TransferLimits = () => {
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
          <b style={{ color: "#878A99", fontWeight: 300 }}>Minimum Transfer</b>
          <small style={{ color: "#495057", fontWeight: 500 }}>
            {formatCurrency(50)}
          </small>
        </CustomRow>
        <CustomRow>
          <b style={{ color: "#878A99", fontWeight: 300 }}>Monthly Limit</b>
          <small style={{ color: "#495057", fontWeight: 500 }}>
            {formatCurrency(3000)}
          </small>
        </CustomRow>
      </div>
    </div>
  );
};

export default TransferLimits;
