import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";
import {
  formatCurrency,
  formatMarketCap,
  getAccessToken,
} from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { getUserTrades } from "../../services/user/trade";
import {
  Account,
  Amount,
  AssetName,
  CurrentValue,
  Date,
  Quantity,
  RealizedPL,
  Status,
  Type,
  UnrealizedPL,
} from "./OrderCol";

import { format } from "date-fns";
import numeral from "numeral";

const OrderHistory = () => {
  const tk = getAccessToken();
  const [currentPage, setCurrentPage] = useState(1);

  const queryData = { limit: 7 };
  const { data: trades } = useQuery({
    queryKey: ["recentTrades"],
    queryFn: () => getUserTrades(),
    enabled: !!tk,
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const transformedData = useMemo(() => {
    if (!trades) return [];

    return trades.map((trade) => ({
      ...trade,
      date: format(trade?.createdAt, "MM/dd/yyyy"),
      type: trade?.orderType,
      name:
        `${
          trade?.asset?.name.length > 15
            ? `${trade?.asset?.name.slice(0, 15)}...`
            : `${trade?.asset?.name}`
        }` || "Unknown",
      img: trade?.asset?.img || "/default-coin.png",
      account: trade?.wallet?.name || "/default-coin.png",
      amount: numeral(trade?.execution?.amount).format("$0,0.00"),
      quantity: parseFloat(trade?.execution?.quantity).toFixed(4),
      currentValue: numeral(trade?.performance?.currentValue).format("$0,0.00"),
      unrealizedProfit: numeral(0).format("$0,0.00"),
      realizedProfit:
        numeral(trade.performance?.totalReturn).format("$0,0.00") || 0,
      symbol: trade?.asset?.symbol,
      percentChange: trade.performance?.totalReturnPercent?.toFixed(2) || 0,
      unrealizedPercentChange: parseFloat(0).toFixed(2),
      percentageClass:
        (trade.performance?.totalReturnPercent || 0) > 0 ? "success" : "danger",
      icon:
        (trade.performance?.totalReturnPercent || 0) > 0
          ? "ri-arrow-up-line"
          : "ri-arrow-down-line",
    }));
  }, [trades]);

  const columns = useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "date",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Date {...cell} />;
        },
      },
      {
        header: "Type",
        accessorKey: "type",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Type {...cell} />;
        },
      },
      {
        header: "Asset",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <AssetName
              name={cell.getValue()}
              symbol={cell.row.original.symbol}
              image={cell.row.original.img}
            />
          );
        },
      },
      {
        header: "Account",
        accessorKey: "account",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Account {...cell} />;
        },
      },
      {
        header: "Amount",
        accessorKey: "amount",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Amount {...cell} />;
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
        header: "Current Value",
        accessorKey: "currentValue",
        enableColumnFilter: false,
        cell: (cell) => {
          return <CurrentValue {...cell} />;
        },
      },
      {
        header: "Unrealized P&L",
        accessorKey: "unrealizedProfit",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <UnrealizedPL
              value={cell.getValue()}
              percent={cell.row.original.unrealizedPercentChange}
            />
          );
        },
      },
      {
        header: "Realized P&L",
        accessorKey: "realizedProfit",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <RealizedPL
              value={cell.getValue()}
              percent={cell.row.original.percentChange}
            />
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Status {...cell} />;
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (trades) console.log(trades);
  }, [trades]);

  const [activeOrderTab, setActiveOrderTab] = useState("trades");

  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <Row className="align-items-center">
            <Col xs={3}>
              <h4 className="card-title mb-0 flex-grow-1">Order History</h4>
            </Col>
            <div className="col-auto ms-auto">
              <div className="flex-shrink-0 d-flex align-items-center gap-2 ">
                <Input type="text" placeholder="Search for orders" />
                <button className="btn btn-secondary">filter</button>
              </div>
            </div>
          </Row>
        </CardHeader>
        <CardBody>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <span style={{ whiteSpace: "nowrap" }}>Sort by:</span>
              <Input type="select">
                <option value="">All Account</option>
              </Input>
              <Input type="select">
                <option value="">Status</option>
              </Input>
            </div>
            <div className="d-flex gap-2">
              <button
                onClick={() => setActiveOrderTab("trades")}
                className={`btn text-capitalize ${
                  activeOrderTab === "trades"
                    ? "btn-secondary"
                    : "bg-secondary-subtle text-secondary"
                }`}
              >
                trade orders
              </button>
              <button
                onClick={() => setActiveOrderTab("dividends")}
                className={`btn text-capitalize ${
                  activeOrderTab === "dividends"
                    ? "btn-secondary"
                    : "bg-secondary-subtle text-secondary"
                }`}
              >
                dividends
              </button>
            </div>
          </Col>
        </CardBody>

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
            // isLoading={getAssetsLoading}
            // pagination={pagination}
            // onPageChange={handlePageChange}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default OrderHistory;
