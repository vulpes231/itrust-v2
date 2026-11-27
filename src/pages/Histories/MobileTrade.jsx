import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import { format } from "date-fns";
import { GoArrowRight } from "react-icons/go";
import numeral from "numeral";
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaEllipsisVertical,
} from "react-icons/fa6";
import CurrencySign from "../CurrencySign";
import ManageMobileTrade from "../ManageMobileTrade";

const MobileTrade = ({ trades }) => {
  const [showTradeMenu, setShowTradeMenu] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const tradesPerPage = 8;
  const totalTrades = trades?.length || 0;
  const totalPages = Math.ceil(totalTrades / tradesPerPage);

  const startIndex = (currentPage - 1) * tradesPerPage;
  const filteredTrades =
    trades?.slice(startIndex, startIndex + tradesPerPage) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setShowTradeMenu("");
  };

  return (
    <React.Fragment>
      <Col>
        <div>
          <div className=" align-items-center d-flex">
            <h4 className="card-title mb-4 flex-grow-1">Recent Orders</h4>
          </div>

          <div className="">
            {filteredTrades.length > 0 ? (
              filteredTrades.map((trade) => {
                const totalReturn =
                  Number(trade?.performance?.totalReturn) || 0;

                const safeValue =
                  Math.abs(totalReturn) < 0.005 ? 0 : totalReturn;

                const displayTradeMenu = trade.status === "open";

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
                      } rounded-circle d-flex align-items-center justify-content-center`}
                      style={{ width: "30px", height: "30px" }}
                    >
                      {trade.orderType === "buy" ? (
                        <FaArrowTrendUp />
                      ) : trade.orderType === "sell" ? (
                        <FaArrowTrendDown />
                      ) : null}
                    </div>

                    <div className="flex-grow-1 ms-3">
                      <h6 className="fs-15 mb-1 d-flex align-items-center gap-2">
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
                          style={{
                            whiteSpace: "nowrap",
                            fontSize: window.innerWidth > 562 ? "16px" : "13px",
                          }}
                          className="fw-normal"
                        >
                          {trade.asset.symbol}
                        </span>

                        <span>
                          <GoArrowRight />
                        </span>

                        <span
                          style={{
                            whiteSpace: "nowrap",
                            fontSize: window.innerWidth > 562 ? "16px" : "13px",
                          }}
                          className="fw-normal text-capitalize"
                        >
                          {trade.wallet.name}
                        </span>
                      </p>

                      <span className="text-muted fs-11">
                        {trade.createdAt
                          ? format(trade.createdAt, "MMM dd, yyyy")
                          : null}
                      </span>
                    </div>

                    <div className="flex-shrink-0 text-end">
                      <span className="fs-15 fw-medium mb-0 d-flex align-items-center">
                        <CurrencySign />
                        {numeral(Number(trade?.execution?.amount) || 0).format(
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

                    {displayTradeMenu && (
                      <div className="position-relative">
                        <button
                          onClick={() =>
                            setShowTradeMenu(
                              showTradeMenu === trade._id ? "" : trade._id,
                            )
                          }
                          type="button"
                          className="bg-transparent border-0"
                        >
                          <FaEllipsisVertical />
                        </button>

                        {showTradeMenu === trade._id && (
                          <ManageMobileTrade
                            trade={trade}
                            onClose={() => setShowTradeMenu("")}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div>No records found.</div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>

                <div className="d-flex align-items-center gap-1">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`btn btn-sm ${
                        currentPage === page ? "btn-primary" : "btn-light"
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}

            {totalTrades > 0 && (
              <div className="text-muted fs-12 text-center mt-2">
                Showing {startIndex + 1}–
                {Math.min(startIndex + tradesPerPage, totalTrades)} of{" "}
                {totalTrades} orders
              </div>
            )}
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default MobileTrade;
