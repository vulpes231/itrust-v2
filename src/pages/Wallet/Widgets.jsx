import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { getTransactionAnalytics } from "../../services/user/transactions";
import { formatCurrency, getAccessToken } from "../../constants";
import { getWalletAnalytics } from "../../services/user/wallet";
import { brief, cash } from "../../assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { format } from "date-fns";

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
      <Card className="p-4">
        <Row className="align-items-end">
          <Col md={4} className="d-flex align-items-center gap-3">
            <img src={brief} alt="" width={40} />

            <div>
              <span className="text-muted text-uppercase fs-13 d-flex align-items-center justify-content-between gap-5">
                Cash Balance
                <span
                  onClick={() => setShowBalance(!showBalance)}
                  className="px-3 bg-light rounded-1"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {showBalance ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                </span>
              </span>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div
                    style={{
                      display: showBalance ? "flex" : "none",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        color: "#495057",
                      }}
                    >
                      ${" "}
                      <CountUp
                        start={0}
                        end={wholePart}
                        duration={2}
                        separator=","
                      />
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
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        color: "#495057",
                      }}
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
                </div>
                <span
                  className={`${
                    walletAnalytics?.totalProfitPercent < 0
                      ? "bg-danger-subtle text-danger"
                      : "bg-success-subtle text-success"
                  } fs-10 fw-light px-2 py-1 rounded-1`}
                >
                  {walletAnalytics?.totalProfitPercent || 0}%
                </span>
              </div>
              <span className="text-muted fs-11">
                Updated at {`${format(Date.now(), "dd/MM/yyyy")}`}
              </span>
            </div>
          </Col>
          <Col md={4} className="bg-light p-2 rounded-1">
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
          </Col>
          <Col md={4} className="d-flex justify-content-end gap-2">
            <Link className="btn btn-primary" to={"/deposit"}>
              Deposit
            </Link>
            <Link className="btn btn-success" to={"/transfer"}>
              Transfer
            </Link>
            <Link className="btn btn-danger" to={"/withdraw"}>
              Withdraw
            </Link>
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
};

export default Widgets;
