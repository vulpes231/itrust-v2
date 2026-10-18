import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../constants";
import { format } from "date-fns";
import { capitalize } from "lodash";
import { MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";
import { GoArrowRight, GoClock } from "react-icons/go";
import FeatherIcon from "feather-icons-react";

const MobileTransaction = ({ data }) => {
  const ITEMS_PER_PAGE = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData =
    data?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div
      className="d-flex flex-column gap-3 w-100 "
      style={{ marginBottom: "50px" }}
    >
      {paginatedData.length > 0 ? (
        paginatedData.map((trx) => (
          <div
            key={trx._id}
            style={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <div className="d-flex align-items-start gap-3">
              <div
                className={`${
                  trx.type === "deposit"
                    ? "bg-success-subtle"
                    : trx.type === "transfer"
                      ? "bg-warning-subtle"
                      : trx.type === "withdraw"
                        ? "bg-danger-subtle"
                        : "bg-info-subtle"
                } rounded-circle d-flex align-items-center justify-content-center`}
                style={{ width: "30px", height: "30px", flexShrink: 0 }}
              >
                {trx.type === "deposit" ? (
                  <i className="ri-arrow-left-down-fill text-success fs-18"></i>
                ) : trx.type === "transfer" ? (
                  <FeatherIcon
                    icon="send"
                    className="text-warning"
                    style={{ height: "14px" }}
                  />
                ) : trx.type === "withdraw" ? (
                  <i className="ri-arrow-right-down-fill text-danger fs-18"></i>
                ) : (
                  <i className="ri-exchange-line text-info fs-18"></i>
                )}
              </div>

              <div>
                <h6 className="fs-15 mb-1 d-flex align-items-center gap-2 flex-wrap">
                  <span>
                    {trx.type === "deposit"
                      ? "Deposit"
                      : trx.type === "transfer"
                        ? "Transfer"
                        : trx.type === "withdraw"
                          ? "Withdraw"
                          : "Savings"}
                  </span>

                  <span
                    className={`fs-10 px-2 py-1 rounded-1 text-capitalize d-flex align-items-center gap-1 ${
                      trx.status === "processed"
                        ? "bg-success-subtle text-success"
                        : trx.status === "pending"
                          ? "bg-warning-subtle text-warning"
                          : trx.status === "cancelled"
                            ? "bg-danger-subtle text-danger"
                            : ""
                    }`}
                  >
                    {trx.status === "processed" ? (
                      <MdOutlineCheckCircle />
                    ) : trx.status === "pending" ? (
                      <GoClock />
                    ) : trx.status === "cancelled" ? (
                      <MdOutlineCancel />
                    ) : null}
                    {trx.status}
                  </span>
                </h6>

                <p className="fs-13 mb-0 d-flex align-items-center gap-2 text-muted">
                  <span
                    style={{ whiteSpace: "nowrap" }}
                    className="fw-normal fs-10"
                  >
                    {trx?.method?.mode === "BTC"
                      ? "Bitcoin"
                      : trx?.method?.mode === "USDT"
                        ? "USDT"
                        : trx?.method?.mode === "ETH"
                          ? "Ethereum"
                          : capitalize(trx?.method?.mode || "")}
                  </span>

                  <span>
                    <GoArrowRight />
                  </span>

                  <span
                    style={{ whiteSpace: "nowrap" }}
                    className="fw-normal fs-10 text-capitalize"
                  >
                    {trx?.account}
                  </span>
                </p>

                <span className="text-muted fs-11">
                  {trx.createdAt
                    ? format(new Date(trx.createdAt), "MMM dd, yyyy")
                    : null}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                whiteSpace: "nowrap",
              }}
              className={`fs-15 fw-medium ms-2 ${
                trx.type === "deposit"
                  ? "text-success"
                  : trx.type === "transfer"
                    ? "text-warning"
                    : trx.type === "withdraw"
                      ? "text-danger"
                      : "text-info"
              }`}
            >
              {trx.type === "deposit"
                ? "+"
                : trx.type === "withdraw"
                  ? "-"
                  : null}
              {trx?.amount != null
                ? numeral(trx.amount).format("$0,0.00")
                : formatCurrency(0)}
            </div>
          </div>
        ))
      ) : (
        <div>No records found.</div>
      )}

      {totalPages > 1 && (
        <div className="d-flex align-items-center justify-content-center gap-3 mt-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="fs-13 text-muted text-nowrap">
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileTransaction;
