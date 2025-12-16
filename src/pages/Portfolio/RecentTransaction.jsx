import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserTrades } from "../../services/user/trade";
import { formatCurrency, getAccessToken } from "../../constants";
import { format } from "date-fns";
const RecentTransaction = () => {
  const queryData = { limit: 6 };
  const token = getAccessToken();

  const { data: trades, isLoading: getUserTradeLoading } = useQuery({
    queryFn: getUserTrades,
    queryKey: ["userTrades"],
    enabled: !!token,
  });
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <h5 className="card-title mb-0">Recent Transaction</h5>
        </CardHeader>
        <CardBody>
          {trades &&
            trades.length > 0 &&
            trades.map((trade) => {
              return (
                <div key={trade._id} className="d-flex mb-3">
                  <div className="flex-shrink-0">
                    <img src={trade.asset.img} alt="" className="avatar-xxs" />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">{`${trade.asset.name} (${trade.asset.symbol})`}</h6>
                    <p className="text-muted mb-0">
                      {format(trade.createdAt, "MMM dd, yyyy")}
                    </p>
                  </div>
                  <div>
                    <h6
                      className={`${
                        trade.orderType === "buy"
                          ? "text-success"
                          : "text-danger"
                      } mb-0`}
                    >
                      {trade.orderType === "buy" ? "+" : "-"}{" "}
                      {formatCurrency(trade.execution.amount)}
                    </h6>
                  </div>
                </div>
              );
            })}

          <div>
            <Link to="#" className="btn btn-soft-info w-100">
              View All Transactions{" "}
              <i className="ri-arrow-right-line align-bottom"></i>
            </Link>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default RecentTransaction;
