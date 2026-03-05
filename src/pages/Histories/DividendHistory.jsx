import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";

import {
  Account,
  Amount,
  Date,
  Quantity,
  Status,
  Type,
} from "../Market/OrderCol";

import { format } from "date-fns";
import numeral from "numeral";

const DividendHistory = ({ dividends }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const transformedData = useMemo(() => {
    if (!dividends) return [];

    return dividends.map((dividend) => ({
      ...dividend,
      date: format(dividend?.createdAt, "MMM dd, yyyy"),
      type: dividend?.orderType,
      name:
        `${
          dividend?.asset?.name.length > 15
            ? `${dividend?.asset?.name.slice(0, 15)}...`
            : `${dividend?.asset?.name}`
        }` || "Unknown",
      img: dividend?.asset?.img || "/default-coin.png",
      account: dividend?.wallet?.name || "/default-coin.png",
      amount: numeral(dividend?.execution?.amount).format("$0,0.00"),
      quantity: parseFloat(dividend?.execution?.quantity).toFixed(4),
      currentValue: numeral(dividend?.performance?.currentValue).format(
        "$0,0.00"
      ),
      unrealizedProfit: numeral(0).format("$0,0.00"),
      realizedProfit:
        numeral(dividend.performance?.totalReturn).format("$0,0.00") || 0,
      symbol: dividend?.asset?.symbol,
      percentChange: dividend.performance?.totalReturnPercent?.toFixed(2) || 0,
      unrealizedPercentChange: parseFloat(0).toFixed(2),
      percentageClass:
        (dividend.performance?.totalReturnPercent || 0) > 0
          ? "success"
          : "danger",
      icon:
        (dividend.performance?.totalReturnPercent || 0) > 0
          ? "ri-arrow-up-line"
          : "ri-arrow-down-line",
    }));
  }, [dividends]);

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
        header: "Details",
        accessorKey: "type",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Type {...cell} />;
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
        header: "Transaction ID",
        accessorKey: "quantity",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Quantity {...cell} />;
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
              <h4 className="card-title mb-0 flex-grow-1">Dividends History</h4>
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

export default DividendHistory;
