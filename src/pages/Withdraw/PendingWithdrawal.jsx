import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { formatCurrency } from "../../constants";

const PendingWithdrawal = () => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyItems: "start",
          alignItems: "flex-start",
          color: "#495057",
          gap: "16px",
        }}
        className="p-3"
      >
        <span>
          <FiAlertTriangle size={20} className="text-warning" />
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span
            className="text-warning"
            style={{ fontSize: "15px", fontWeight: "300" }}
          >
            Pending Withdrawals
          </span>
          <span style={{ fontWeight: "500", fontSize: "24.5px" }}>
            {formatCurrency(34000)}
          </span>
          <span
            className="text-warning"
            style={{ fontSize: "15px", fontWeight: "300" }}
          >
            Being Processed.
          </span>
        </span>
      </div>
    </React.Fragment>
  );
};

export default PendingWithdrawal;
