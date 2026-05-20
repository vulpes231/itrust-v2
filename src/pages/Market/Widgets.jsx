import React from "react";
import CountUp from "react-countup";
import { Card, CardBody, Col } from "reactstrap";
import { LuCircleDollarSign } from "react-icons/lu";

const Widgets = ({ analytics, walletData, count }) => {
  const totalInv =
    walletData &&
    walletData?.default?.totalInvested + walletData.default?.totalProfitLoss;
  const marketWidgets = analytics && [
    {
      id: 1,
      title: "Assets Owned",
      counter: count,
      // decimal: 0,
      icon: "ri-shopping-bag-line",
      iconClass: "danger",
    },
    {
      id: 2,
      title: "Total Investments",
      counter: totalInv ? totalInv.toFixed(2).split(".")[0] : 0,
      decimal: totalInv ? totalInv.toFixed(2).split(".")[1] : 0,
      icon: "ri-funds-line",
      iconClass: "info",
    },
    {
      id: 3,
      title: "Today's P&L",
      counter: analytics.totalProfit.toFixed(2).split(".")[0] || 0,
      decimal: analytics.totalProfit.toFixed(2).split(".")[1],
      icon: "ri-arrow-right-up-fill",
      iconClass: "success",
    },
    {
      id: 4,
      title: "Available to Invest",
      counter: analytics.availableBalance.toFixed(2).split(".")[0] || 0,
      decimal: analytics.availableBalance.toFixed(2).split(".")[1],
      icon: <LuCircleDollarSign />,
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
                      {item.id !== 1 && "$"}
                      <span className="counter-value">
                        <CountUp
                          start={0}
                          end={item?.counter || 0}
                          duration={3}
                        />
                      </span>
                      <small className="text-muted fs-14">
                        {item.id !== 1 && "."}
                        {item.decimal}
                        {/* {item.decimal && "k"} */}
                      </small>
                    </h2>
                  </div>
                  <div className="flex-shrink-0 avatar-sm">
                    <div
                      className={`avatar-title fs-22 rounded bg-${item.iconClass}-subtle text-${item.iconClass}`}
                    >
                      {item.id === 4 ? (
                        <span>{item.icon}</span>
                      ) : (
                        <i className={item.icon}></i>
                      )}
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
