import React from "react";
import { Label } from "reactstrap";
import { IoTrendingUpSharp } from "react-icons/io5";
import { formatCurrency } from "../../constants";
import { CiCalendar } from "react-icons/ci";

const CustomSpan = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {children}
    </div>
  );
};
const Title = ({ children }) => {
  return <b style={{ color: "#878A99", fontWeight: 300 }}>{children}</b>;
};
const Small = ({ children }) => {
  return (
    <small style={{ color: "#495057", fontWeight: 500 }}>{children}</small>
  );
};

const CustomRow = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      {children}
    </div>
  );
};

const AccountStat = ({ analytics }) => {
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
        Account Stats
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
          <span
            style={{
              backgroundColor: "#E8F3EA",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
            className="p-2"
          >
            <IoTrendingUpSharp className="text-success" size={22} />
          </span>
          <CustomSpan>
            <Title>Total Deposited</Title>
            <Small>{formatCurrency(analytics?.totalDeposit)}</Small>
          </CustomSpan>
        </CustomRow>
        <CustomRow>
          <span
            style={{
              backgroundColor: "#DFF5FA",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
            className="p-2"
          >
            <CiCalendar className="text-info" size={22} />
          </span>
          <CustomSpan>
            <Title>This Month</Title>
            <Small>{formatCurrency(analytics?.monthlyDeposit)}</Small>
          </CustomSpan>
        </CustomRow>
      </div>
    </div>
  );
};

export default AccountStat;
