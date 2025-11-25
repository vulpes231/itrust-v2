import React, { useEffect } from "react";
import CountUp from "react-countup";
import { Card, CardBody, Col } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { getWalletAnalytics } from "../../services/user/wallet";
import Loader from "../../components/Common/Loader";

const Widgets = () => {
  const { data: walletAnalytics, isLoading: getAnalyticsLoading } = useQuery({
    queryFn: getWalletAnalytics,
    queryKey: ["walletAnalytics"],
  });

  const getIcon = (id) => {
    switch (id) {
      case 1:
        return "ri-money-dollar-circle-fill";
      case 2:
        return "ri-arrow-up-circle-fill";
      case 3:
        return "ri-arrow-down-circle-fill";
      default:
        return null;
    }
  };

  function convertToCryptoWidgets(financialData) {
    if (!financialData) return [];

    return [
      {
        id: 1,
        label: "Total invested",
        counter: financialData?.totalInvested || 0,
        percentage: financialData?.totalProfitPercent || 0,
        decimal: "2",
        prefix: "$",
        separator: ",",
      },
      {
        id: 2,
        label: "Total change",
        counter: financialData?.totalProfit || 0,
        percentage: financialData?.totalProfitPercent || 0,
        decimal: "2",
        prefix: "$",
        separator: ",",
      },
      {
        id: 3,
        label: "Daily change",
        counter: financialData?.dailyProfit || 0,
        percentage: financialData?.dailyProfitPercent || 0,
        decimal: "2",
        prefix: "$",
        separator: ",",
      },
    ];
  }

  const cryptoWidgets = convertToCryptoWidgets(walletAnalytics);

  // useEffect(() => {
  //   if (cryptoWidgets) {
  //     console.log(cryptoWidgets);
  //   }
  // }, [cryptoWidgets]);

  if (getAnalyticsLoading) {
    return <Loader />;
  }

  if (!cryptoWidgets || cryptoWidgets.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      {cryptoWidgets &&
        cryptoWidgets.length > 0 &&
        cryptoWidgets.map((item, key) => (
          <Col lg={4} md={6} key={key}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-light text-primary rounded-circle fs-3">
                      <i className={getIcon(item.id)}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-bold fs-13 text-muted mb-1">
                      {item.label}
                    </p>
                    <h4 className=" mb-0">
                      <CountUp
                        start={0}
                        end={item.counter}
                        decimals={item.decimal}
                        separator={item.separator}
                        prefix={item.prefix}
                        duration={3}
                      />
                    </h4>
                  </div>
                  <div className="flex-shrink-0 align-self-end">
                    <span
                      className={`badge ${
                        item.percentage >= 0 ? "bg-success" : "bg-danger"
                      }-subtle ${
                        item.percentage >= 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      <i
                        className={
                          "align-middle me-1 " +
                          `${
                            item.percentage >= 0
                              ? "ri-arrow-up-s-fill"
                              : "ri-arrow-down-s-fill"
                          }`
                        }
                      ></i>
                      {item.percentage} %<span></span>
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
    </React.Fragment>
  );
};

export default Widgets;
