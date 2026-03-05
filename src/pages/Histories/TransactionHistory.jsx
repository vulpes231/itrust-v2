import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";
import {
  FromCol,
  ToCol,
  DetailsCol,
  TransactionID,
  TypeCol,
  Status,
} from "../Wallet/TransactionsCol";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/user/transactions";
import { getAccessToken } from "../../constants";
import { auto, broke, btc, cash, eth, ltc, usdt } from "../../assets";
import Deposit from "../Deposit";
import Withdraw from "../Withdraw";
import Transfer from "../Transfer";

const TransactionHistory = ({ filter }) => {
  const token = getAccessToken();

  const { data: transactions, isLoading: getTransactionLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    enabled: !!token,
  });

  const [action, setAction] = useState("");

  const transformedData = useMemo(() => {
    if (!transactions) return [];

    const filteredTrnxs =
      filter === "all"
        ? transactions
        : filter === "deposit" ||
          filter === "withdrawal" ||
          filter === "transfer"
        ? transactions.filter((trx) => trx.type === filter)
        : filter === "completed" || filter === "pending" || filter === "failed"
        ? transactions.filter((trx) => trx.status === filter)
        : transactions.filter((trx) => trx.account === filter);

    return filteredTrnxs.map((transaction, index) => {
      let icon, iconClass, amountColor;

      switch (transaction.type) {
        case "deposit":
          icon = "ri-arrow-right-up-fill";
          iconClass = "success";
          amountColor = "success";
          break;
        case "withdrawal":
          icon = "ri-arrow-right-down-fill";
          iconClass = "danger";
          amountColor = "danger";
          break;
        case "transfer":
          icon = "ri-arrow-left-right-line";
          iconClass = "warning";
          amountColor = "warning";
          break;
        default:
          icon = "ri-exchange-line";
          iconClass = "info";
          amountColor = "info";
      }

      const dateObj = new Date(transaction.createdAt);
      const date = dateObj.toLocaleDateString();
      const time = dateObj.toLocaleTimeString();

      return {
        ...transaction,
        id: transaction._id,
        time: time,
        date: date,
        currency: transaction.method?.mode || "Unknown",
        from: transaction.method?.mode || "Unknown",
        to: transaction.account || "Unknown",
        details: transaction.memo || "No details",
        amount: `$${transaction.amount}`,
        amount1: `${transaction.amount} USD`,
        status: transaction.status,
        type: transaction.type,
        icon: icon,
        iconClass: iconClass,
        amountColor: amountColor,
        image: getCurrencyImage(transaction.method?.mode),
      };
    });
  }, [transactions, filter]);

  function getCurrencyImage(currency) {
    const images = {
      cash: cash,
      usdt: usdt,
      btc: btc,
      eth: eth,
      bank: ltc,
      brokerage: broke,
      "automated investing": auto,
      "Traditional ira": auto,
      "Health savings": auto,
    };
    return images[currency?.toLowerCase()] || "/images/currencies/default.png";
  }

  const columns = useMemo(
    () => [
      {
        header: "#",
        cell: (cell) => (
          <div className="avatar-xs">
            <div
              className={`avatar-title bg-${cell.row.original.iconClass}-subtle text-${cell.row.original.iconClass} rounded-circle fs-16`}
            >
              <i className={cell.row.original.icon}></i>
            </div>
          </div>
        ),
      },
      {
        header: "Date",
        accessorKey: "time",
        enableColumnFilter: false,
        cell: (cell) => (
          <>
            {cell.row.original.date}{" "}
            <small className="text-muted">{cell.getValue()}</small>
          </>
        ),
      },
      {
        header: "Details",
        accessorKey: "details",
        enableColumnFilter: false,
        cell: (cell) => {
          return <DetailsCol {...cell} />;
        },
      },
      {
        header: "Account",
        accessorKey: "to",
        enableColumnFilter: false,
        cell: (cell) => {
          return <ToCol {...cell} />;
        },
      },
      {
        header: "Transaction ID",
        accessorKey: "id",
        enableColumnFilter: false,
        cell: (cell) => {
          return <TransactionID {...cell} />;
        },
      },
      {
        header: "Amount",
        accessorKey: "amount",
        enableColumnFilter: false,
        cell: (cell) => (
          <>
            <h6 className={`text-${cell.row.original.amountColor} amount mb-1`}>
              {cell.getValue()}
            </h6>
            <p className="text-muted mb-0">{cell.row.original.amount1}</p>
          </>
        ),
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
        <CardHeader className="d-flex flex-column gap-2">
          Recent Transactions
        </CardHeader>
        <CardBody>
          <TableContainer
            columns={columns}
            data={transformedData}
            isGlobalFilter={false}
            isAddUserList={false}
            customPageSize={8}
            className="custom-header-css"
            divClass="table-responsive table-card mb-4"
            tableClass="align-middle table-nowrap mb-0"
            theadClass="table-light table-nowrap"
            thClass="table-light text-muted"
            isLoading={getTransactionLoading}
          />
        </CardBody>
      </Card>
      <Modal
        isOpen={action === "deposit"}
        centered={true}
        size="lg"
        toggle={() => setAction("")}
      >
        <ModalHeader
          toggle={() => setAction("")}
          className="p-3 text-uppercase fw-bold"
        >
          Deposit
        </ModalHeader>
        <Deposit />
      </Modal>
      <Modal
        isOpen={action === "withdraw"}
        centered={true}
        size="lg"
        toggle={() => setAction("")}
      >
        <ModalHeader
          toggle={() => setAction("")}
          className="p-3 text-uppercase fw-bold"
        >
          Withdraw
        </ModalHeader>
        <Withdraw />
      </Modal>
      <Modal
        isOpen={action === "transfer"}
        centered={true}
        size="lg"
        toggle={() => setAction("")}
      >
        <ModalHeader
          toggle={() => setAction("")}
          className="p-3 text-uppercase fw-bold"
        >
          Transfer
        </ModalHeader>
        <Transfer />
      </Modal>
    </React.Fragment>
  );
};

export default TransactionHistory;
