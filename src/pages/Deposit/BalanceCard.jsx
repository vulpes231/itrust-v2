import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../constants";
import { getWalletAnalytics } from "../../services/user/wallet";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CountUp from "react-countup";

const BalanceCard = () => {
  const token = getAccessToken();
  const [wholePart, setWholePart] = useState(0);
  const [decimalPart, setDecimalPart] = useState("00");
  const [showBalance, setShowBalance] = useState(true);

  const { data: walletAnalytics } = useQuery({
    queryFn: getWalletAnalytics,
    queryKey: ["walletAnalytics"],
    enabled: !!token,
  });

  useEffect(() => {
    if (walletAnalytics) {
      const formatted = walletAnalytics.availableBalance.toFixed(2);
      const [whole, decimal] = formatted.split(".");
      setWholePart(parseInt(whole));
      setDecimalPart(decimal);
    }
  }, [walletAnalytics]);

  return (
    <div
      className="py-3 px-3"
      style={{ display: "flex", flexDirection: "column", gap: "2px" }}
    >
      <i className="ri-briefcase-line" style={{ fontSize: "29px" }}></i>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: showBalance ? "flex" : "none",
            alignItems: "baseline",
          }}
        >
          <span
            style={{ fontSize: "24.5px", fontWeight: "500", color: "#495057" }}
          >
            $ <CountUp start={0} end={wholePart} duration={2} separator="," />
          </span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#6c757d",
              marginLeft: "2px",
              alignSelf: "flex-end",
              marginBottom: "4px",
            }}
          >
            .{decimalPart}k
          </span>
        </div>
        <div
          style={{
            display: !showBalance ? "flex" : "none",
            alignItems: "baseline",
          }}
        >
          <span style={{ fontSize: "24px", fontWeight: 600, color: "#495057" }}>
            $ ******
          </span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#6c757d",
              marginLeft: "2px",
              alignSelf: "flex-end",
              marginBottom: "4px",
            }}
          >
            .**k
          </span>
        </div>
        <span
          onClick={() => setShowBalance(!showBalance)}
          className="px-2 mx-2"
          style={{
            backgroundColor: "whitesmoke",
            padding: "2px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {showBalance ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
      <span
        className="text-muted"
        style={{ fontSize: "14px", fontWeight: "200" }}
      >
        Cash Balance(USD)
      </span>
    </div>
  );
};

export default BalanceCard;
