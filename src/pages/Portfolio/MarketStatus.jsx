import React, { useEffect, useMemo } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";
import { marketStatus } from "../../common/data";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Quantity,
  AvgPrice,
  CurrentValue,
  Returns,
  OrderType,
  Date,
} from "./MarketStatusCol";
import { getUserTrades } from "../../services/user/trade";
import { formatCurrency, getAccessToken } from "../../constants";

const MarketStatus = () => {
  const queryData = { limit: 6 };
  const token = getAccessToken();

  const { data: trades, isLoading: getUserTradeLoading } = useQuery({
    queryFn: getUserTrades,
    queryKey: ["userTrades"],
    enabled: !!token,
  });

  const transformedData = useMemo(() => {
    if (!trades) return [];

    return trades.map((trade) => ({
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
  }, [trades]);

  const columns = useMemo(
    () => [
      // {
      //   header: "Date",
      //   accessorKey: "createdAt",
      //   enableColumnFilter: false,
      //   cell: (cell) => {
      //     return <Date {...cell} />;
      //   },
      // },
      {
        header: "Name",
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
        header: "Type",
        accessorKey: "orderType",
        enableColumnFilter: false,
        cell: (cell) => {
          return <OrderType {...cell} />;
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
        accessorKey: "value",
        enableColumnFilter: false,
        cell: (cell) => {
          return <CurrentValue {...cell} />;
        },
      },
      {
        header: "Price",
        accessorKey: "execution.price",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Returns {...cell} />;
        },
      },
      {
        header: "Returns %",
        accessorKey: "percentage",
        enableColumnFilter: false,
        cell: (cell) => (
          <h6
            className={
              "text-" + cell.row.original.percentageClass + " fs-13 mb-0"
            }
          >
            <i className={cell.row.original.icon + " align-middle me-1"}></i>
            {parseFloat(cell.getValue()).toFixed(2)}%
          </h6>
        ),
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

  // useEffect(() => {
  //   if (trades) console.log(trades);
  // }, [trades]);

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="border-bottom-dashed d-flex align-items-center">
          <h4 className="card-title mb-0 flex-grow-1">Market Status</h4>
          <div className="flex-shrink-0">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-primary btn-sm">
                Today
              </button>
              <button type="button" className="btn btn-outline-primary btn-sm">
                Overall
              </button>
            </div>
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
            isLoading={getUserTradeLoading}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MarketStatus;
