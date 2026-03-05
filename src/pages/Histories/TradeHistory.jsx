import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";

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
} from "../Market/OrderCol";

import { format } from "date-fns";
import numeral from "numeral";

const TradeHistory = ({ trades }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const transformedData = useMemo(() => {
    if (!trades) return [];

    return trades.map((trade) => ({
      ...trade,
      date: format(trade?.createdAt, "MMM dd, yyyy"),
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

  return (
    <React.Fragment>
      <Card className="mt-4">
        <CardHeader>
          <Row className="align-items-center">
            <Col xs={3}>
              <h4 className="card-title mb-0 flex-grow-1">Order History</h4>
            </Col>
          </Row>
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
            // isLoading={getAssetsLoading}
            // pagination={pagination}
            // onPageChange={handlePageChange}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default TradeHistory;
