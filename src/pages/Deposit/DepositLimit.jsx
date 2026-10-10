import React, { useEffect, useMemo } from "react";
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

const DepositLimit = ({ userSettings, globalSettings, active, currency }) => {
  const bankLimits =
    userSettings?.limits?.deposit?.bank ?? globalSettings?.depositLimits?.bank;
  const cryptoLimits =
    userSettings?.limits?.deposit?.crypto ??
    globalSettings?.depositLimits?.crypto;

  return (
    <div>
      <Label
        className="pt-3 px-3"
        style={{ fontSize: "16px", fontWeight: "600" }}
      >
        Deposit Limits
      </Label>

      <hr style={{ border: "0.5px solid gray", padding: "0px" }} />

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
          <b style={{ fontWeight: 300 }} className="text-muted">
            Minimum Deposit
          </b>
          <small
            style={{ fontWeight: 500 }}
            className="d-flex align-items-center"
          >
            <CurrencySign />
            {active === "crypto"
              ? numeral(cryptoLimits?.min ?? 0).format("0,0.00")
              : numeral(bankLimits?.min ?? 0).format("0,0.00")}
          </small>
        </CustomRow>

        <CustomRow>
          <b style={{ fontWeight: 300 }} className="text-muted">
            Maximum Deposit
          </b>
          <small
            style={{ fontWeight: 500 }}
            className="d-flex align-items-center"
          >
            <CurrencySign />
            {active === "crypto"
              ? numeral(cryptoLimits?.max ?? 0).format("0,0.00")
              : numeral(bankLimits?.max ?? 0).format("0,0.00")}
          </small>
        </CustomRow>
      </div>
    </div>
  );
};

export default DepositLimit;
