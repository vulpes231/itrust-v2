import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Input } from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";
import { Link } from "react-router-dom";
import { Quantity, AvgPrice, CurrentValue } from "./MarketStatusCol";
import { formatCurrency } from "../../constants";
import numeral from "numeral";

const MarketStatus = ({ activeWallet, trades, accounts }) => {
  const [currentAccount, setCurrentAccount] = useState("all");

  const tradeAccounts = useMemo(() => {
    return (accounts || []).filter(
      (account) =>
        account && account.name && account.name.toLowerCase() !== "investing",
    );
  }, [accounts]);

  useEffect(() => {
    if (currentAccount === "all") return;

    const accountExists = tradeAccounts.some(
      (account) => String(account._id) === String(currentAccount),
    );

    if (!accountExists) {
      setCurrentAccount("all");
    }
  }, [tradeAccounts, currentAccount]);

  const handleAccountChange = (e) => {
    setCurrentAccount(e.target.value);
  };

  const getTradeWallet = (trade) => {
    if (!trade?.wallet) return null;

    return trade.wallet;
  };

  const tradeBelongsToAccount = (trade, account) => {
    const wallet = getTradeWallet(trade);

    if (!wallet || !account) {
      return false;
    }

    // Wallet is populated as an object.
    if (typeof wallet === "object") {
      if (
        wallet._id &&
        account._id &&
        String(wallet._id) === String(account._id)
      ) {
        return true;
      }

      if (wallet.slug && account.slug && wallet.slug === account.slug) {
        return true;
      }

      if (wallet.name && account.name && wallet.name === account.name) {
        return true;
      }
    }

    if (account._id && String(wallet) === String(account._id)) {
      return true;
    }

    if (account.slug && String(wallet) === String(account.slug)) {
      return true;
    }

    return false;
  };

  const transformedData = useMemo(() => {
    if (!Array.isArray(trades)) {
      return [];
    }

    let filteredTrades = trades;

    if (currentAccount !== "all") {
      const selectedAccount = tradeAccounts.find(
        (account) => String(account._id) === String(currentAccount),
      );

      if (!selectedAccount) {
        return [];
      }

      filteredTrades = trades.filter((trade) =>
        tradeBelongsToAccount(trade, selectedAccount),
      );
    }

    return filteredTrades.map((trade) => ({
      ...trade,

      coinName: trade?.asset?.name || "Unknown",

      img: trade?.asset?.img || "/default-coin.png",

      quantity: Number(trade?.quantity) || 0,

      avgPrice: formatCurrency(Number(trade?.amountInvested) || 0),

      currentValue: Number(trade?.currentValue) || 0,

      todayReturn: Number(trade?.todayReturn) || 0,

      todayReturnPercent: Number(trade?.todayReturnPercent) || 0,

      return: Number(trade?.return) || 0,

      returnPercent: Number(trade?.returnPercent) || 0,

      percentageClass:
        Number(trade?.returnPercent) > 0
          ? "success"
          : Number(trade?.returnPercent) < 0
            ? "danger"
            : "secondary",

      icon:
        Number(trade?.returnPercent) > 0
          ? "ri-arrow-up-line"
          : Number(trade?.returnPercent) < 0
            ? "ri-arrow-down-line"
            : "ri-subtract-line",

      status: trade?.status || "open",
    }));
  }, [trades, currentAccount, tradeAccounts]);

  const columns = useMemo(
    () => [
      {
        header: "Asset",
        accessorKey: "coinName",
        enableColumnFilter: false,

        cell: (cell) => {
          const trade = cell.row.original;

          return (
            <div className="d-flex align-items-center gap-2 fw-medium">
              <img
                src={trade?.asset?.img || trade?.img || "/default-coin.png"}
                alt={cell.getValue()}
                style={{
                  width: "30px",
                  height: "30px",
                }}
                className="p-1 bg-light rounded-circle d-flex align-items-center justify-content-center"
                onError={(e) => {
                  e.currentTarget.src = "/default-coin.png";
                }}
              />

              <Link to="#" className="currency_name">
                {cell.getValue()}
              </Link>
            </div>
          );
        },
      },

      {
        header: "Quantity",
        accessorKey: "quantity",
        enableColumnFilter: false,

        cell: (cell) => {
          return <Quantity {...cell} />;
        },
      },

      {
        header: "Cost",
        accessorKey: "avgPrice",
        enableColumnFilter: false,

        cell: (cell) => {
          return <AvgPrice {...cell} />;
        },
      },

      {
        header: "Current Value",
        accessorKey: "currentValue",
        enableColumnFilter: false,

        cell: (cell) => {
          return <CurrentValue {...cell} />;
        },
      },

      {
        header: "24h P&L",
        accessorKey: "todayReturn",
        enableColumnFilter: false,

        cell: (cell) => {
          const value = Number(cell.row.original.todayReturn) || 0;

          const safeValue = Math.abs(value) < 0.005 ? 0 : value;

          const totalPercent =
            Number(cell.row.original.todayReturnPercent) || 0;

          return (
            <div className="d-flex flex-column gap-1">
              <span>{numeral(safeValue).format("$0,0.00")}</span>

              <span
                className={`fs-12 ${
                  totalPercent < 0
                    ? "text-danger"
                    : totalPercent > 0
                      ? "text-success"
                      : "text-muted"
                }`}
              >
                {totalPercent.toFixed(2)}%
              </span>
            </div>
          );
        },
      },

      {
        header: "P&L",
        accessorKey: "return",
        enableColumnFilter: false,

        cell: (cell) => {
          const value = Number(cell.row.original.return) || 0;

          const safeValue = Math.abs(value) < 0.005 ? 0 : value;

          const totalPercent = Number(cell.row.original.returnPercent) || 0;

          return (
            <div className="d-flex flex-column gap-1">
              <span>{numeral(safeValue).format("$0,0.00")}</span>

              <span
                className={`fs-12 ${
                  totalPercent < 0
                    ? "text-danger"
                    : totalPercent > 0
                      ? "text-success"
                      : "text-muted"
                }`}
              >
                {totalPercent.toFixed(2)}%
              </span>
            </div>
          );
        },
      },

      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,

        cell: (cell) => {
          const status = cell.getValue() || "open";

          return (
            <span
              className={`badge ${
                status === "open"
                  ? "bg-success"
                  : status === "closed"
                    ? "bg-danger"
                    : "bg-warning"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          );
        },
      },
    ],
    [],
  );

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="border-bottom-dashed d-flex align-items-center">
          <h4 className="card-title mb-0 flex-grow-1">Portfolio Holdings</h4>

          <div className="flex-shrink-0">
            <Input
              type="select"
              className="bg-secondary-subtle border-0 text-secondary outline-none"
              onChange={handleAccountChange}
              value={currentAccount}
            >
              <option value="all">All</option>

              {tradeAccounts.map((account) => (
                <option key={account._id} value={account._id}>
                  {account.name}
                </option>
              ))}
            </Input>
          </div>
        </CardHeader>

        <CardBody>
          <TableContainer
            columns={columns}
            data={transformedData}
            isGlobalFilter={false}
            isAddUserList={false}
            customPageSize={transformedData.length || 10}
            className="custom-header-css"
            divClass="table-responsive table-card mb-3"
            tableClass="align-middle table-nowrap"
            theadClass="table-light text-muted"
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MarketStatus;
