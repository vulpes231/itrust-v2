import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
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

const AllTransactions = () => {
  const token = getAccessToken();

  const { data: transactions, isLoading: getTransactionLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    enabled: !!token,
  });

  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [action, setAction] = useState("");

  useEffect(() => {
    if (transactions) {
      setFilteredTransactions(transactions);
    }
  }, [transactions]);

  const category = (e) => {
    if (e === "All") {
      setFilteredTransactions(transactions);
    } else {
      const filter = transactions.filter((item) => item.method?.mode === e);
      setFilteredTransactions(filter);
    }
  };

  const transformedData = useMemo(() => {
    if (!filteredTransactions) return [];

    return filteredTransactions.map((transaction, index) => {
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
  }, [filteredTransactions]);

  function getCurrencyImage(currency) {
    const images = {
      cash: cash,
      usdt: usdt,
      btc: btc,
      eth: eth,
      bank: ltc,
      brokerage: broke,
      "automated investing": auto,
    };
    return images[currency?.toLowerCase()] || "/images/currencies/default.png";
  }

  const selectAction = (type) => {
    setAction(type);
    // console.log(`Opening ${type} modal`);
  };

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
      // {
      //   header: "Method",
      //   accessorKey: "currency",
      //   enableColumnFilter: false,
      //   cell: (cell) => (
      //     <div className="d-flex align-items-center">
      //       <img
      //         src={getCurrencyImage(cell.getValue())}
      //         alt={cell.getValue()}
      //         className="avatar-xxs me-2"
      //         onError={(e) => {
      //           e.target.src = "/images/currencies/default.png";
      //         }}
      //       />
      //       {cell.getValue().toUpperCase()}
      //     </div>
      //   ),
      // },
      // {
      //   header: "From",
      //   accessorKey: "from",
      //   enableColumnFilter: false,
      //   cell: (cell) => {
      //     return <FromCol {...cell} />;
      //   },
      // },

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
      // {
      //   header: "Type",
      //   accessorKey: "type",
      //   enableColumnFilter: false,
      //   cell: (cell) => {
      //     return <TypeCol {...cell} />;
      //   },
      // },
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

  // useEffect(() => {
  //   if (action) console.log(action);
  // }, [action]);

  return (
    <React.Fragment>
      <Row className="align-items-center mb-4 g-3">
        <Col sm={2}>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted flex-shrink-0">Sort by: </span>
            <select
              className="form-control mb-0"
              name="choices-single-default"
              id="choices-single-default"
              onChange={(e) => category(e.target.value)}
            >
              <option value="All">All</option>
              <option value="cash">Cash</option>
              <option value="auto">Automated Investing</option>
              <option value="brokerage">Brokerage</option>
              <option value="eth">ETH</option>
              <option value="usdt">USDT</option>
              <option value="btc">BTC</option>
            </select>
          </div>
        </Col>
        <div className="col-sm-auto ms-auto">
          <div className="d-flex gap-2">
            {/* <button
              type="button"
              // data-bs-toggle="modal"
              className="btn btn-info"
              onClick={() => selectAction("deposit")}
            >
              Deposit
            </button>
            <button
              type="button"
              // data-bs-toggle="modal"
              className="btn btn-danger"
              onClick={() => selectAction("withdraw")}
            >
              Withdraw
            </button>
            <button
              type="button"
              // data-bs-toggle="modal"
              className="btn btn-success"
              onClick={() => selectAction("transfer")}
            >
              Transfer
            </button> */}
          </div>
        </div>
      </Row>

      <Card>
        <CardHeader>
          <Row className="align-items-center g-3">
            <Col md={3}>
              <h5 className="card-title mb-0">All Transactions</h5>
            </Col>
            <div className="col-md-auto ms-auto">
              <div className="d-flex gap-2">
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control search"
                    placeholder="Search for transactions..."
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
                <button className="btn btn-success">
                  <i className="ri-equalizer-line align-bottom me-1"></i>
                  Filters
                </button>
              </div>
            </div>
          </Row>
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

export default AllTransactions;
