import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Mousewheel } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { getTransactionAnalytics } from "../../services/user/transactions";
import { formatCurrency, getAccessToken } from "../../constants";
import { getWalletAnalytics } from "../../services/user/wallet";
import { cash } from "../../assets";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const Widgets = () => {
  const token = getAccessToken();
  const { data: analytics } = useQuery({
    queryFn: getTransactionAnalytics,
    queryKey: ["trnxAnalytics"],
    enabled: !!token,
  });

  const { data: walletAnalytics } = useQuery({
    queryFn: getWalletAnalytics,
    queryKey: ["walletAnalytics"],
    enabled: !!token,
  });
  const { data: trxAnalytics } = useQuery({
    queryFn: getTransactionAnalytics,
    queryKey: ["trxAnalytics"],
    enabled: !!token,
  });

  const [wholePart, setWholePart] = useState(0);
  const [decimalPart, setDecimalPart] = useState("00");
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    if (walletAnalytics) {
      const formatted = walletAnalytics.availableBalance.toFixed(2);
      const [whole, decimal] = formatted.split(".");
      setWholePart(parseInt(whole));
      setDecimalPart(decimal);
    }
  }, [walletAnalytics]);

  return (
    <React.Fragment>
      <Card
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "end",
          padding: "20px 18px",
        }}
        className="mb-3"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "12px",
            width: "70%",
          }}
        >
          <span className="text-muted" style={{ fontSize: "12px" }}>
            Updated 16/12/2025 at 12:31 AM
          </span>
          <i className="ri-briefcase-line" style={{ fontSize: "45px" }}></i>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <div
              style={{
                display: showBalance ? "flex" : "none",
                alignItems: "baseline",
              }}
            >
              <span
                style={{ fontSize: "24px", fontWeight: 600, color: "#495057" }}
              >
                ${" "}
                <CountUp start={0} end={wholePart} duration={2} separator="," />
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
                .{decimalPart}k
              </span>
            </div>
            <div
              style={{
                display: !showBalance ? "flex" : "none",
                alignItems: "baseline",
              }}
            >
              <span
                style={{ fontSize: "24px", fontWeight: 600, color: "#495057" }}
              >
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

          <span className="text-muted" style={{ fontSize: "14px" }}>
            Cash Balance
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            backgroundColor: "whitesmoke",
            width: "100%",
            padding: " 8px",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          <span
            className="text-muted"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>
              <img src={cash} alt="" /> Total Deposited:
            </span>
            <span>
              <i class="ri-corner-right-down-line text-success"></i>{" "}
              {trxAnalytics
                ? formatCurrency(trxAnalytics.totalDeposit)
                : formatCurrency(0)}
            </span>
          </span>
          <span
            className="text-muted"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>
              <img src={cash} alt="" /> Total Withdrawals:
            </span>
            <span>
              <i class="ri-corner-right-up-line text-danger"></i>{" "}
              {trxAnalytics
                ? formatCurrency(trxAnalytics.totalWithdrawal)
                : formatCurrency(0)}
            </span>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // alignItems: "start",
            justifyContent: "end",
            gap: "12px",
            width: "100%",
          }}
        >
          <Link className="btn btn-primary" to={"/deposit"}>
            Deposit
          </Link>
          <Link className="btn btn-success" to={"/transfer"}>
            Transfer
          </Link>
          <Link className="btn btn-danger" to={"/withdraw"}>
            Withdraw
          </Link>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Widgets;
