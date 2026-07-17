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
} from "./TransactionsCol";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/user/transactions";
import { getAccessToken } from "../../constants";
import { auto, broke, btc, cash, eth, ltc, usdt } from "../../assets";
import Deposit from "../Deposit";
import Withdraw from "../Withdraw";
import Transfer from "../Transfer";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

import { format } from "date-fns";
import PendingDropDown from "./PendingDropDown";
import MobileTransaction from "./MobileTransaction";
import numeral from "numeral";

const AllTransactions = () => {
  const token = getAccessToken();

  const { data: transactions, isLoading: getTransactionLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    enabled: !!token,
  });

  const [action, setAction] = useState("");
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(true);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  // console.log(transactions);
  const transformedData = useMemo(() => {
    if (!transactions) return [];

    const filteredTrnxs =
      filter === "all"
        ? transactions
        : filter === "deposit" || filter === "withdraw" || filter === "transfer"
          ? transactions.filter((trx) => trx.type === filter)
          : filter === "processed" ||
              filter === "pending" ||
              filter === "cancelled"
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
        case "withdraw":
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
        amount: numeral(transaction.amount).format("$0,0.00"),
        amount1: `${transaction.amount} USD`,
        status: transaction.status,
        type: transaction.type,
        tag: transaction.tag || "cash",
        icon: icon,
        iconClass: iconClass,
        amountColor: amountColor,
        image: getCurrencyImage(transaction.method?.mode),
      };
    });
  }, [transactions, filter]);

  console.log(transformedData);

  function getCurrencyImage(currency) {
    const images = {
      "cash account": cash,
      usdt: usdt,
      btc: btc,
      eth: eth,
      bank: ltc,
      "individual brokerage": broke,
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
        accessorKey: "createdAt",
        enableColumnFilter: false,
        cell: (cell) => (
          <span className="d-flex gap-1 align-items-end">
            <span>{format(cell.getValue(), "MMM dd, yyyy")}</span>
            <small className="text-muted">
              {format(cell.getValue(), "hh:mm a")}
            </small>
          </span>
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
          const wallet = cell.row.original;
          return <ToCol cell={cell} trnx={wallet} />;
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
      {
        header: "Action",
        accessorKey: "action",
        enableColumnFilter: false,
        cell: (cell) => {
          const id = cell.row.original._id;
          const status = cell.row.original.status;
          return (
            <div>
              {status === "pending" ? <PendingDropDown id={id} /> : null}
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="d-flex flex-column gap-2">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Recent Cash Transactions</h5>

            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={() => setShowFilter(!showFilter)}
                className="btn btn-secondary"
              >
                <i className="ri-equalizer-line align-bottom me-1"></i>
                Filters
              </button>
            </div>
          </div>
          {showFilter && (
            <div className="d-flex flex-column flex-lg-row gap-3 justify-content-between align-items-stretch align-items-lg-center">
              <div className="d-flex flex-md-row gap-2 w-100">
                <Input type="select" onChange={handleFilter} className="w-100">
                  <option value="">Select Account</option>
                  <option value="all">All</option>
                  <option value="cash">Cash</option>
                  <option value="automated investing">
                    Automated Investing
                  </option>
                  <option value="brokerage">Brokerage</option>
                </Input>

                <Input type="select" onChange={handleFilter} className="w-100">
                  <option value="">Select Status</option>
                  <option value="all">All Status</option>
                  <option value="completed">Processed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </Input>
              </div>

              <div className="d-flex flex-wrap flex-md-nowrap gap-2">
                <button
                  onClick={() => setFilter("deposit")}
                  className={`btn text-capitalize ${
                    filter === "deposit"
                      ? "btn-secondary"
                      : "bg-secondary-subtle text-secondary"
                  }`}
                >
                  Deposit
                </button>

                <button
                  onClick={() => setFilter("withdraw")}
                  className={`btn text-capitalize ${
                    filter === "withdraw"
                      ? "btn-secondary"
                      : "bg-secondary-subtle text-secondary"
                  }`}
                >
                  Withdrawals
                </button>

                <button
                  onClick={() => setFilter("transfer")}
                  className={`btn text-capitalize ${
                    filter === "transfer"
                      ? "btn-secondary"
                      : "bg-secondary-subtle text-secondary"
                  }`}
                >
                  Transfers
                </button>

                <button
                  onClick={() => setFilter("all")}
                  className={`btn text-capitalize ${
                    filter === "all"
                      ? "btn-secondary"
                      : "bg-secondary-subtle text-secondary"
                  }`}
                >
                  Transactions
                </button>
              </div>
            </div>
          )}
        </CardHeader>
        <CardBody>
          <div className="d-none d-md-flex flex-md-column">
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
              pageParam="cash-history"
            />
          </div>
          <div className="d-flex d-md-none">
            <MobileTransaction data={transformedData} />
          </div>
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

export default AllTransactions;
