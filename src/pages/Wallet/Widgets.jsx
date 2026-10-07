import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { getTransactionAnalytics } from "../../services/user/transactions";
import { formatCurrency, getAccessToken } from "../../constants";
import { getUserWallets } from "../../services/user/wallet";
import { brief, cash } from "../../assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { format } from "date-fns";
import { getUserInfo } from "../../services/user/user";
import numeral from "numeral";

const Widgets = ({ wallets, user, trxAnalytics }) => {
  const cashAccount =
    wallets &&
    wallets.length > 0 &&
    wallets.find((wallet) => wallet.slug === "cash");

  const [wholePart, setWholePart] = useState(0);
  const [decimalPart, setDecimalPart] = useState("00");
  const [showBalance, setShowBalance] = useState(true);
  // console.log(cashAccount);
  useEffect(() => {
    if (cashAccount) {
      const formatted = cashAccount.balance.available.toFixed(2);
      const [whole, decimal] = formatted.split(".");
      setWholePart(parseInt(whole));
      setDecimalPart(decimal);
    }
  }, [cashAccount]);

  return (
    <React.Fragment>
      <Card className="p-4">
        <div className="d-flex flex-column gap-4 flex-md-row align-items-md-end justify-content-md-between">
          <div className="d-flex flex-column flex-md-row align-items-md-end gap-md-5 gap-4">
            <div md={3} className="d-flex align-items-center gap-3 ">
              <div className="d-flex flex-column">
                <span className="text-muted fs-11">
                  Updated at {`${format(Date.now(), "dd/MM/yyyy hh:mm a")}`}
                </span>
                <img src={brief} alt="" width={40} />
                <span className=" text-uppercase fs-13 d-flex align-items-center justify-content-between gap-5">
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
                          // color: "#495057",
                        }}
                        className="text-nowrap"
                      >
                        {user?.currency?.sign}
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
                          // color: "#6c757d",
                          marginLeft: "2px",
                          alignSelf: "flex-end",
                          marginBottom: "4px",
                        }}
                        className="text-muted"
                      >
                        .{decimalPart}
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
                          // color: "#495057",
                        }}
                      >
                        $ ******
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          // color: "#6c757d",
                          marginLeft: "2px",
                          alignSelf: "flex-end",
                          marginBottom: "4px",
                        }}
                        className="text-muted"
                      >
                        .**k
                      </span>
                    </div>
                  </div>
                  <span
                    onClick={() => setShowBalance(!showBalance)}
                    className="px-3 bg-light rounded-1"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {showBalance ? (
                      <FaEye size={16} />
                    ) : (
                      <FaEyeSlash size={16} />
                    )}
                  </span>
                </span>
                <div className="d-flex align-items-center justify-content-between text-muted">
                  Cash Balance
                </div>
              </div>
            </div>
            {/* total container */}
            <div className="d-none d-md-flex">
              <span
                style={{ border: "1px solid #dedede" }}
                className="d-flex gap-2 flex-column align-items-start border-1 border-dotted bg-light-subtle py-2 px-2 px-md-4"
              >
                <h5 className="fs-13 fs-md-14 text-muted">Total Deposits</h5>
                <h4 className="d-flex align-items-center gap-1 fw-normal fw-md-bold">
                  {user?.currency?.sign}
                  {trxAnalytics
                    ? numeral(trxAnalytics.totalDeposit).format("0,0.00")
                    : numeral(0).format("0,0.00")}
                </h4>
              </span>
              <span
                style={{ border: "1px solid #dedede" }}
                className="d-flex gap-2 flex-column align-items-start border-1 border-dotted bg-light-subtle py-2 px-2 px-md-4"
              >
                <h5 className="fs-13 fs-md-14 text-muted">Total Withdrawals</h5>
                <h4 className="d-flex align-items-center gap-1 fw-normal fw-md-bold">
                  {user?.currency?.sign}
                  {trxAnalytics
                    ? numeral(trxAnalytics.totalWithdrawal).format("0,0.00")
                    : numeral(0).format("0,0.00")}
                </h4>
              </span>
            </div>
          </div>
          <div md={6} className="d-flex gap-2">
            <Link className="btn btn-primary" to={"/deposit"}>
              Deposit
            </Link>
            <Link
              className="btn bg-none border border-secondary text-primary"
              to={"/transfer"}
            >
              Transfer
            </Link>
            <Link className="btn btn-danger" to={"/withdraw"}>
              Withdraw
            </Link>
          </div>
          {/* mobile total container */}
          <div className="d-flex d-md-none">
            <span
              style={{ border: "1px solid #dedede", width: "100%" }}
              className="d-flex gap-2 flex-column align-items-start border-1 border-dotted bg-light-subtle py-2 px-2 px-md-4"
            >
              <h5 className="fs-13 fs-md-14 text-muted">Total Deposits</h5>
              <h4
                className="d-flex align-items-center gap-1 fw-normal fs-18"
                style={{ fontWeight: 700 }}
              >
                {user?.currency?.sign}
                {trxAnalytics
                  ? numeral(trxAnalytics.totalDeposit).format("0,0.00")
                  : numeral(0).format("0,0.00")}
              </h4>
            </span>
            <span
              style={{ border: "1px solid #dedede", width: "100%" }}
              className="d-flex gap-2 flex-column align-items-start border-1 border-dotted bg-light-subtle py-2 px-2 px-md-4"
            >
              <h5 className="fs-13 fs-md-18 text-muted">Total Withdrawals</h5>
              <h4
                className="d-flex align-items-center gap-1 fw-normal fs-18"
                style={{ fontWeight: 700 }}
              >
                {user?.currency?.sign}
                {trxAnalytics
                  ? numeral(trxAnalytics.totalWithdrawal).format("0,0.00")
                  : numeral(0).format("0,0.00")}
              </h4>
            </span>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Widgets;
