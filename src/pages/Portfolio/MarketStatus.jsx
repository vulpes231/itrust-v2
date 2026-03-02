import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Input } from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";
import { Link } from "react-router-dom";
import { Quantity, AvgPrice, CurrentValue, Returns } from "./MarketStatusCol";
import { formatCurrency } from "../../constants";
import numeral from "numeral";

const MarketStatus = ({ activeWallet, trades }) => {
  const [currentAccount, setCurrentAccount] = useState("all");

  const handleAccountChange = (e) => {
    setCurrentAccount(e.target.value);
  };

  const transformedData = useMemo(() => {
    if (!trades) return [];

    const filteredTrades =
      currentAccount === "all"
        ? trades
        : trades.filter((trd) => trd.wallet.name === currentAccount);

    return filteredTrades.map((trade) => ({
      ...trade,
      coinName: trade.asset?.name || "Unknown",
      img: trade.asset?.img || "/default-coin.png",
      quantity: trade.execution?.quantity || 0,
      avgPrice: formatCurrency(trade.execution?.amount) || 0,
      value: formatCurrency(trade.performance?.currentValue) || 0,
      returns: formatCurrency(trade.performance?.totalReturn) || 0,
      percentage: trade.performance?.totalReturnPercent || 0,
      percentageClass:
        (trade.performance?.totalReturnPercent || 0) > 0 ? "success" : "danger",
      icon:
        (trade.performance?.totalReturnPercent || 0) > 0
          ? "ri-arrow-up-line"
          : "ri-arrow-down-line",
      status: trade.status || "open",
    }));
  }, [trades, currentAccount]);

  const columns = useMemo(
    () => [
      {
        header: "Asset",
        accessorKey: "coinName",
        enableColumnFilter: false,
        cell: (cell) => (
          <div className="d-flex align-items-center fw-medium">
            <img
              src={cell.row.original.img}
              alt={cell.getValue()}
              className="avatar-xxs me-2"
              onError={(e) => {
                e.target.src = "/default-coin.png";
              }}
            />
            <Link to="#" className="currency_name">
              {cell.getValue()}
            </Link>
          </div>
        ),
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
        accessorKey: "value",
        enableColumnFilter: false,
        cell: (cell) => {
          return <CurrentValue {...cell} />;
        },
      },
      {
        header: "24h P&L",
        accessorKey: "performance.todayReturn",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Returns {...cell} />;
        },
      },
      {
        header: "P&L",
        accessorKey: "percentage",
        enableColumnFilter: false,
        cell: (cell) => {
          const total = cell.row.original.performance.totalReturn;
          const totalPercent = cell.row.original.performance.totalReturnPercent;
          return (
            <div className="d-flex flex-column gap-1">
              <span>{numeral(total).format("$0,0.00")}</span>
              <span
                className={`fs-12 ${
                  totalPercent < 0 ? "text-danger" : "text-success"
                }`}
              >
                {parseFloat(totalPercent).toFixed(2)}%
              </span>
            </div>
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell) => (
          <span
            className={`badge ${
              cell.getValue() === "open"
                ? "bg-success"
                : cell.getValue() === "closed"
                ? "bg-secondary"
                : "bg-warning"
            }`}
          >
            {cell.getValue().charAt(0).toUpperCase() + cell.getValue().slice(1)}
          </span>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    if (activeWallet) setCurrentAccount(activeWallet.name);
  }, [activeWallet]);

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
              <option value="cash">Cash</option>
              <option value="brokerage">Brokerage</option>
              <option value="automated investing">Automated Investing</option>
            </Input>
          </div>
        </CardHeader>
        <CardBody>
          <TableContainer
            columns={columns}
            data={transformedData.length > 0 ? transformedData : []}
            isGlobalFilter={false}
            isAddUserList={false}
            customPageSize={transformedData.length}
            className="custom-header-css"
            divClass="table-responsive table-card mb-3"
            tableClass="align-middle table-nowrap"
            theadClass="table-light text-muted"
            // isLoading={getUserTradeLoading}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MarketStatus;
