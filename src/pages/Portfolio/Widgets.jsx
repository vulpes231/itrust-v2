import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Card, CardBody } from "reactstrap";
import { getWalletAnalytics } from "../../services/user/wallet";
import { formatCurrency } from "../../constants";

const Widgets = () => {
  const { data: walleyAnalytics, isLoading: analyticsLoading } = useQuery({
    queryFn: getWalletAnalytics,
    queryKey: ["walletAnalytics"],
  });

  //   console.log(walleyAnalytics);
  return (
    <React.Fragment>
      <Card>
        <CardBody className="bg-warning-subtle">
          <div className="d-flex">
            <div className="flex-grow-1">
              <h5 className="fs-14 mb-3">My Portfolio</h5>
              <h2>
                {formatCurrency(walleyAnalytics?.totalBalance || 0)}
                {/* $61,91,967<small className="text-muted fs-15">.29</small> */}
              </h2>
              <p className="text-muted mb-0">
                {/* $25,10,974{" "} */}
                <small className="badge bg-success-subtle text-success">
                  <i className="ri-arrow-right-up-line fs-13 align-bottom"></i>
                  {walleyAnalytics?.dailyProfitPercent || 0}%
                </small>
              </p>
            </div>
            <div className="flex-shrink-0">
              <i className="mdi mdi-wallet-outline text-primary h1"></i>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <div className="d-flex">
            <div className="flex-grow-1">
              <h5 className="fs-14 mb-3">Today's Profit</h5>
              <h2>
                {formatCurrency(walleyAnalytics?.dailyProfit || 0)}
                {/* $2,74,365<small className="text-muted fs-15">.84</small> */}
              </h2>
              <p className="text-muted mb-0">
                {/* $9,10,564{" "} */}
                <small className="badge bg-success-subtle text-success">
                  <i className="ri-arrow-right-up-line fs-13 align-bottom"></i>
                  {walleyAnalytics?.dailyProfitPercent || 0}%
                </small>
              </p>
            </div>
            <div className="flex-shrink-0">
              <i className="ri-hand-coin-line text-primary h1"></i>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <div className="d-flex">
            <div className="flex-grow-1">
              <h5 className="fs-14 mb-3">Overall Profit</h5>
              <h2>
                {formatCurrency(walleyAnalytics?.totalProfit)}
                {/* $32,67,120<small className="text-muted fs-15">.42</small> */}
              </h2>
              <p className="text-muted mb-0">
                {/* $18,22,730{" "} */}
                <small className="badge bg-success-subtle text-success">
                  <i className="ri-arrow-right-up-line fs-13 align-bottom"></i>
                  {walleyAnalytics?.totalProfitPercent || 0}%
                </small>
              </p>
            </div>
            <div className="flex-shrink-0">
              <i className="ri-line-chart-line text-primary h1"></i>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Widgets;
