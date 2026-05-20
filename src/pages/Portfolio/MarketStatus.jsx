import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Input } from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";
import { Link } from "react-router-dom";
import { Quantity, AvgPrice, CurrentValue, Returns } from "./MarketStatusCol";
import { formatCurrency } from "../../constants";
import numeral from "numeral";

const MarketStatus = ({ activeWallet, trades }) => {
  const [currentAccount, setCurrentAccount] = useState("investing");

  const handleAccountChange = (e) => {
    setCurrentAccount(e.target.value);
  };

  // console.log(trades);

  const transformedData = useMemo(() => {
    if (!trades) return [];

    const filteredTrades =
      currentAccount === "investing"
        ? trades
        : trades.filter((trd) => trd.wallet.name === currentAccount);

    return filteredTrades.map((trade) => ({
      ...trade,
      coinName: trade.asset?.name || "Unknown",
      img: trade.asset?.img || "/default-coin.png",
      quantity: trade?.quantity || 0,
      avgPrice: formatCurrency(trade?.amountInvested) || 0,
      value: trade?.currentValue || 0,
      todayReturn: formatCurrency(trade?.todayReturn) || 0,
      returns: formatCurrency(trade?.return) || 0,
      percentage: trade?.returnPercent || 0,
      percentageClass: (trade?.returnPercent || 0) > 0 ? "success" : "danger",
      icon:
        (trade?.returnPercent || 0) > 0
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
          <div className="d-flex align-items-center gap-2 fw-medium">
            <img
              src={cell.row.original.asset.img}
              alt={cell.getValue()}
              style={{ width: "30px", height: "30px" }}
              className="p-1 bg-light rounded-circle d-flex align-items-center justify-content-center"
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

          const totalPercent = cell.row.original.todayReturnPercent;
          return (
            <div className="d-flex flex-column gap-1">
              <span>{numeral(safeValue).format("$0,0.00")}</span>
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
        header: "P&L",
        accessorKey: "percentage",
        enableColumnFilter: false,
        cell: (cell) => {
          const value = Number(cell.row.original.return) || 0;

          const safeValue = Math.abs(value) < 0.005 ? 0 : value;

          const totalPercent = cell.row.original.percentage;
          return (
            <div className="d-flex flex-column gap-1">
              <span>{numeral(safeValue).format("$0,0.00")}</span>
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
                  ? "bg-danger"
                  : "bg-warning"
            }`}
          >
            {cell.getValue().charAt(0).toUpperCase() + cell.getValue().slice(1)}
          </span>
        ),
      },
    ],
    [],
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
              <option value="investing">All</option>
              <option value="individual brokerage">Brokerage</option>
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
