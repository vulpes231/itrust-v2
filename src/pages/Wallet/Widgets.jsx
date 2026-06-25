import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { getTransactionAnalytics } from "../../services/user/transactions";
import { formatCurrency, getAccessToken } from "../../constants";
import { getUserWallets, getWalletAnalytics } from "../../services/user/wallet";
import { brief, cash } from "../../assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { format } from "date-fns";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { HiMiniArrowDownTray, HiMiniArrowUpTray } from "react-icons/hi2";

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

  const { data: wallets } = useQuery({
    queryFn: getUserWallets,
    queryKey: ["wallets"],
    enabled: !!token,
  });

  const { data: trxAnalytics } = useQuery({
    queryFn: getTransactionAnalytics,
    queryKey: ["trxAnalytics"],
    enabled: !!token,
  });

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
                          // color: "#6c757d",
                          marginLeft: "2px",
                          alignSelf: "flex-end",
                          marginBottom: "4px",
                        }}
                        className="text-muted"
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
            <div className="bg-light text-muted py-2 px-3 rounded-2 d-flex flex-column gap-3 ">
              <span className="d-flex gap-5 justify-content-between">
                <span className="fs-13 fs-md-14">
                  <img src={cash} alt="" /> Total Deposited:
                </span>
                <span className="d-flex align-items-center gap-1">
                  <HiMiniArrowDownTray className="text-success" />
                  {trxAnalytics
                    ? formatCurrency(trxAnalytics.totalDeposit)
                    : formatCurrency(0)}
                </span>
              </span>
              <span className="d-flex gap-5 justify-content-between ">
                <span className="fs-13 fs-md-14">
                  <img src={cash} alt="" /> Total Withdrawals:
                </span>
                <span className="d-flex align-items-center gap-1">
                  <HiMiniArrowUpTray className="text-danger" />
                  {trxAnalytics
                    ? formatCurrency(trxAnalytics.totalWithdrawal)
                    : formatCurrency(0)}
                </span>
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
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Widgets;
// justify-content-end
