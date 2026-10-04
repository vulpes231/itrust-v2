import React, { useEffect, useMemo, useState } from "react";

import numeral from "numeral";

const PlanOrders = ({
  planId,
  planName,
  planOrders = [],
  isLoading,
  error,
}) => {
  // console.log(planOrders);
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(planOrders.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [planId, planOrders.length]);

  const currentOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const endIndex = startIndex + ITEMS_PER_PAGE;

    return planOrders.slice(startIndex, endIndex);
  }, [planOrders, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        Error loading orders: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-light">
            <tr className="text-muted">
              <th>Date</th>
              <th>Type</th>
              <th>Asset</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Quantity</th>
              <th>Current Value</th>
              <th>Unrealized P&L</th>
              <th>Realized P&L</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {!planOrders.length ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No orders found for this plan
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => (
                <tr key={order._id} className="text-capitalize">
                  {/* Date */}
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                  {/* Type */}
                  <td>
                    <span
                      className={`badge text-capitalize ${
                        order.orderType === "buy"
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {order.orderType}
                    </span>
                  </td>

                  {/* Asset */}
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span className="rounded-circle bg-light">
                        <img
                          src={order.asset?.img}
                          alt={order.asset?.symbol || "asset"}
                          width={30}
                          height={30}
                          className="rounded-circle"
                        />
                      </span>

                      <div>
                        <strong>{order.asset?.symbol}</strong>

                        <br />

                        <small className="text-body-secondary">
                          {order.asset?.name}
                        </small>
                      </div>
                    </div>
                  </td>

                  {/* Plan */}
                  <td>{planName || "N/A"}</td>

                  {/* Amount */}
                  <td>${order.execution?.amount?.toFixed(2) || "0.00"}</td>

                  {/* Quantity */}
                  <td>{order.execution?.quantity?.toFixed(6) || "0"}</td>

                  {/* Current Value */}
                  <td>
                    {numeral(order.performance?.currentValue).format("$0,0.00")}
                  </td>

                  {/* Unrealized P&L */}
                  <td
                    className={
                      order.performance?.totalReturn > 0
                        ? "text-success"
                        : order.performance?.totalReturn < 0
                          ? "text-danger"
                          : ""
                    }
                  >
                    ${order.performance?.totalReturn?.toFixed(2) || "0.00"} (
                    {order.performance?.totalReturnPercent?.toFixed(2) || "0"}
                    %)
                  </td>

                  {/* Realized P&L */}
                  <td>
                    $
                    {(order.status === "closed"
                      ? numeral(order.performance.totalReturn).format("$0,0.00")
                      : 0
                    ).toFixed(2)}
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`badge ${
                        order.status === "open" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-body-secondary small">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, planOrders.length)} of{" "}
            {planOrders.length} orders
          </div>

          <nav>
            <ul className="pagination mb-0">
              {/* Previous */}
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>

              {/* Pages */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <li
                    key={page}
                    className={`page-item ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </li>
                ),
              )}

              {/* Next */}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PlanOrders;
