import React from "react";
import CountUp from "react-countup";
import { Card, CardBody, Col } from "reactstrap";

const Widgets = ({ analytics }) => {
  const marketWidgets = analytics && [
    {
      id: 1,
      title: "Total Investments",
      counter: analytics.totalInvested.toFixed(2).split(".")[0],
      decimal: analytics.totalInvested.toFixed(2).split(".")[1],
      icon: "ri-shopping-bag-line",
      iconClass: "danger",
    },
    {
      id: 2,
      title: "Total P&L",
      counter: analytics.totalProfit.toFixed(2).split(".")[0] || 0,
      decimal: analytics.totalProfit.toFixed(2).split(".")[1],
      icon: "ri-funds-line",
      iconClass: "info",
    },
    {
      id: 3,
      title: "Cost Basis (Amount Invested)",
      counter: analytics.totalInvested.toFixed(2).split(".")[0] || 0,
      decimal: analytics.totalInvested.toFixed(2).split(".")[1],
      icon: "ri-arrow-left-down-fill",
      iconClass: "warning",
    },
    {
      id: 4,
      title: "Available to Invest",
      counter: analytics.availableBalance.toFixed(2).split(".")[0] || 0,
      decimal: analytics.availableBalance.toFixed(2).split(".")[1],
      icon: "ri-arrow-right-up-fill",
      iconClass: "success",
    },
  ];

  // console.log(analytics);
  return (
    <React.Fragment>
      {marketWidgets &&
        marketWidgets.length > 0 &&
        marketWidgets.map((item, key) => (
          <Col xl={3} sm={6} key={key}>
            <Card className="card-animate">
              <CardBody>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <h6 className="text-muted mb-3">{item.title}</h6>
                    <h2 className="mb-0">
                      $
                      <span className="counter-value">
                        <CountUp start={0} end={item.counter} duration={3} />
                      </span>
                      <small className="text-muted fs-14">
                        .{item.decimal}k
                      </small>
                    </h2>
                  </div>
                  <div className="flex-shrink-0 avatar-sm">
                    <div
                      className={`avatar-title fs-22 rounded bg-${item.iconClass}-subtle text-${item.iconClass}`}
                    >
                      <i className={item.icon}></i>
                    </div>
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
