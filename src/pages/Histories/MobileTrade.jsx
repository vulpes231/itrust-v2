import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import { format } from "date-fns";
import { GoArrowRight } from "react-icons/go";
import numeral from "numeral";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import CurrencySign from "../CurrencySign";

const MobileTrade = ({ trades }) => {
  const ITEMS_PER_PAGE = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const safeTrades = Array.isArray(trades) ? trades : [];
  const totalPages = Math.ceil(safeTrades.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [trades]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, Math.max(totalPages, 1)));
  }, [totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const filteredTrades = safeTrades.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <React.Fragment>
      <Col>
        <div className="card-height-100">
          <div className="">
            {filteredTrades.length > 0 ? (
              filteredTrades.map((trade) => {
                const value = Number(trade?.performance?.totalReturn) || 0;

                const safeValue = Math.abs(value) < 0.005 ? 0 : value;

                return (
                  <div
                    key={trade._id}
                    className="d-flex align-items-start mb-3"
                  >
                    <div
                      className={`${
                        trade.orderType === "buy"
                          ? "bg-success-subtle text-success"
                          : trade.orderType === "sell"
                            ? "bg-danger-subtle text-danger"
                            : null
                      } bg-success-subtle rounded-circle d-flex align-items-center justify-content-center`}
                      style={{ width: "30px", height: "30px" }}
                    >
                      {trade.orderType === "buy" ? (
                        <FaArrowTrendUp />
                      ) : trade.orderType === "sell" ? (
                        <FaArrowTrendDown />
                      ) : null}
                    </div>

                    <div className="flex-grow-1 ms-3">
                      <h6 className="fs-13 mb-1 d-flex align-items-center gap-2">
                        <span>
                          {trade.orderType === "buy"
                            ? "Buy"
                            : trade.orderType === "sell"
                              ? "Sell"
                              : null}
                        </span>

                        <span
                          className={`fs-10 px-2 py-1 rounded-1 text-capitalize d-flex align-items-center gap-1 ${
                            trade.status === "open"
                              ? "bg-success text-light"
                              : trade.status === "closed"
                                ? "bg-danger text-light"
                                : ""
                          }`}
                        >
                          {trade.status}
                        </span>
                      </h6>

                      <p className="fs-13 mb-0 d-flex align-items-center gap-2 text-muted">
                        <span
                          style={{ whiteSpace: "nowrap" }}
                          className="fw-normal"
                        >
                          {trade?.asset?.symbol}
                        </span>

                        <span>
                          <GoArrowRight />
                        </span>

                        <span
                          style={{ whiteSpace: "nowrap" }}
                          className="fw-normal text-capitalize fs-13"
                        >
                          {trade?.wallet?.slug}
                        </span>
                      </p>

                      <span className="text-muted fs-11">
                        {trade.createdAt
                          ? format(new Date(trade.createdAt), "MMM dd, yyyy")
                          : null}
                      </span>
                    </div>

                    <div className="flex-shrink-0 text-end">
                      <span className="fs-15 fw-medium mb-0 d-flex align-items-center">
                        <CurrencySign />
                        {numeral(trade?.execution?.amount || 0).format(
                          "0,0.00",
                        )}
                      </span>

                      <span
                        className={`${
                          safeValue < 0 ? "text-danger" : "text-success"
                        } d-flex align-items-center`}
                      >
                        {safeValue < 0 ? "-" : ""}
                        <CurrencySign />
                        {numeral(Math.abs(safeValue)).format("0,0.00")}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No records found.</div>
            )}

            {totalPages > 1 && (
              <div className="d-flex align-items-center justify-content-between gap-2 mt-3 pt-3 border-top">
                <span className="text-muted fs-12 text-nowrap">
                  {startIndex + 1}–
                  {Math.min(startIndex + ITEMS_PER_PAGE, safeTrades.length)} of{" "}
                  {safeTrades.length}
                </span>

                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() =>
                      setCurrentPage((page) => Math.max(page - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>

                  <span className="text-muted fs-12 text-nowrap">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() =>
                      setCurrentPage((page) => Math.min(page + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default MobileTrade;
