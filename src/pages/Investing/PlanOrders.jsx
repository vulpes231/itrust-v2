import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserTrades } from "../../services/user/trade";
import { getAccessToken } from "../../constants";
import numeral from "numeral";

const PlanOrders = ({ planId, planName }) => {
  const tk = getAccessToken();
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", planId],
    queryFn: getUserTrades,
    enabled: !!tk,
  });

  const planOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    return orders.filter((ord) => ord.planId === planId);
  }, [orders, planId]);

  // console.log(planOrders);

  const renderTableRows = useMemo(() => {
    if (!planOrders.length) {
      return (
        <tr>
          <td colSpan="10" className="text-center">
            No orders found for this plan
          </td>
        </tr>
      );
    }

    return planOrders.map((order) => (
      <tr key={order._id} className="text-capitalize">
        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
        <td>
          <span
            className={`badge text-capitalize ${
              order.orderType === "buy" ? "text-success" : "text-danger"
            }`}
          >
            {order.orderType}
          </span>
        </td>
        <td>
          <div className="d-flex align-items-center gap-2">
            <span className="rounded-circle bg-light">
              <img
                src={order.asset.img}
                alt="asset"
                width={30}
                height={30}
                className="rounded-circle"
              />
            </span>
            <div>
              <strong>{order.asset?.symbol}</strong>
              <br />
              <small className="text-muted">{order.asset?.name}</small>
            </div>
          </div>
        </td>
        <td>{planName || "N/A"}</td>
        <td>${order.execution?.amount?.toFixed(2) || "0.00"}</td>
        <td>{order.execution?.quantity?.toFixed(6) || "0"}</td>
        <td>{numeral(order?.performance?.currentValue).format("$0,0.00")}</td>
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
          {order.performance?.totalReturnPercent?.toFixed(2) || "0"}%)
        </td>
        <td>${(order.extra || 0).toFixed(2)}</td>
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
    ));
  }, [planOrders]);

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
        <tbody>{renderTableRows}</tbody>
      </table>
    </div>
  );
};

export default PlanOrders;
