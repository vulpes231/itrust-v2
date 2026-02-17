import React, { useEffect, useMemo } from "react";
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

const DepositLimit = ({ userSettings, globalSettings, active }) => {
  const bankLimits =
    userSettings?.limits?.deposit?.bank ?? globalSettings?.depositLimits?.bank;
  const cryptoLimits =
    userSettings?.limits?.deposit?.crypto ??
    globalSettings?.depositLimits?.crypto;

  useEffect(() => {
    if (active) console.log(active);
  }, [active]);

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
          <b style={{ color: "#878A99", fontWeight: 300 }}>Minimum Deposit</b>
          <small style={{ color: "#495057", fontWeight: 500 }}>
            {active === "crypto"
              ? formatCurrency(cryptoLimits?.min ?? 0)
              : formatCurrency(bankLimits?.min ?? 0)}
          </small>
        </CustomRow>

        <CustomRow>
          <b style={{ color: "#878A99", fontWeight: 300 }}>Maximum Deposit</b>
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

export default DepositLimit;
