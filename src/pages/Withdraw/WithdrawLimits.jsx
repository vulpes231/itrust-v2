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

const WithdrawalLimits = ({ userSettings, globalSettings, active }) => {
  const bankLimits =
    userSettings?.limits?.withdrawal?.bank ??
    globalSettings?.withdrawalLimits?.bank;
  const cryptoLimits =
    userSettings?.limits?.withdrawal?.crypto ??
    globalSettings?.withdrawalLimits?.crypto;
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
        Withdrawal Limits
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
          <b style={{ color: "#878A99", fontWeight: 300 }}>
            Minimum Withdrawal
          </b>
          <small style={{ color: "#495057", fontWeight: 500 }}>
            {active === "crypto"
              ? formatCurrency(cryptoLimits?.min ?? 0)
              : formatCurrency(bankLimits?.min ?? 0)}
          </small>
        </CustomRow>
        <CustomRow>
          <b style={{ color: "#878A99", fontWeight: 300 }}>
            {" "}
            Maximum Withdrawal
          </b>
          <small style={{ color: "#495057", fontWeight: 500 }}>
            {active === "crypto"
              ? formatCurrency(cryptoLimits?.max ?? 0)
              : formatCurrency(bankLimits?.max ?? 0)}
          </small>
        </CustomRow>
      </div>
    </div>
  );
};

export default WithdrawalLimits;
