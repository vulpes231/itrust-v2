import React, { useState } from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../components/Common/BreadCrumb";
import VerifyAccountNotify from "../VerifyAccountNotify";
import Widgets from "./Widgets";
import { useQuery } from "@tanstack/react-query";
import { getTransactionAnalytics } from "../../services/user/transactions";
import { getAccessToken } from "../../constants";
import { getUserTrades } from "../../services/user/trade";
import HistoryManager from "./HistoryManager";
import TransactionHistory from "./TransactionHistory";
import TradeHistory from "./TradeHistory";
import DividendHistory from "./DividendHistory";
// import SavingHistory from "./SavingsHistory";

const Histories = () => {
  const token = getAccessToken();

  const [activeHistoryTab, setActiveHistoryTab] = useState(() => {
    return sessionStorage.getItem("historyTab") || "all";
  });

  const { data: trxAnalytics } = useQuery({
    queryFn: getTransactionAnalytics,
    queryKey: ["trxAnalytics"],
    enabled: !!token,
  });

  const queryData = { limit: 7 };

  const { data: trades } = useQuery({
    queryKey: ["recentTrades"],
    queryFn: () => getUserTrades({ sortBy: "createdAt" }),
    enabled: !!token,
  });

  const activeTrades =
    trades && trades.length > 0
      ? trades.filter((trd) => trd.status === "open")
      : [];

  const tradesAnalytic = {
    length: trades?.length,
    activeTradesLength: activeTrades?.length,
  };

  const handleHistoryTabChange = (tab) => {
    setActiveHistoryTab(tab);
    sessionStorage.setItem("historyTab", tab);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="History" pageTitle="Activities" />

          <VerifyAccountNotify />

          <Widgets analytics={trxAnalytics} tradeInfo={tradesAnalytic} />

          <HistoryManager
            activeHistoryTab={activeHistoryTab}
            setActiveHistoryTab={handleHistoryTabChange}
          />

          {activeHistoryTab === "all" && (
            <TransactionHistory filter={activeHistoryTab} />
          )}

          {activeHistoryTab === "trade" && <TradeHistory trades={trades} />}

          {activeHistoryTab === "deposit" && (
            <TransactionHistory filter={activeHistoryTab} />
          )}

          {activeHistoryTab === "transfer" && (
            <TransactionHistory filter={activeHistoryTab} />
          )}

          {activeHistoryTab === "withdrawal" && (
            <TransactionHistory filter={activeHistoryTab} />
          )}

          {activeHistoryTab === "dividend" && (
            <DividendHistory dividends={[]} />
          )}

          {activeHistoryTab === "savings" && (
            <TransactionHistory filter={activeHistoryTab} />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Histories;
