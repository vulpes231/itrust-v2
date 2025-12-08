import React from "react";
import CountUp from "react-countup";
import { Card, CardBody, Col } from "reactstrap";
// import { buysellWidgets } from "../../common/data";
import { useQuery } from "@tanstack/react-query";
import { getTradeAnalytics } from "../../services/user/trade";
import { formatCurrency } from "../../constants";

const Widgets = () => {
  const { data: tradeAnalytics, isLoading: tradeAnalyticsLoading } = useQuery({
    queryKey: ["tradeAnalytics"],
    queryFn: getTradeAnalytics,
  });

  const buysellWidgets = tradeAnalytics && [
    {
      id: 1,
      title: "Total Buy",
      counter: tradeAnalytics.totalBuys.toFixed(2).split(".")[0],
      decimal: tradeAnalytics.totalBuys.toFixed(2).split(".")[1],
      icon: "ri-shopping-bag-line",
      iconClass: "danger",
    },
    {
      id: 2,
      title: "Total Sell",
      counter: tradeAnalytics.totalSells.toFixed(2).split(".")[0] || 0,
      decimal: tradeAnalytics.totalSells.toFixed(2).split(".")[1],
      icon: "ri-funds-line",
      iconClass: "info",
    },
    {
      id: 3,
      title: "Today's Buy",
      counter: tradeAnalytics.totalBuysToday.toFixed(2).split(".")[0] || 0,
      decimal: tradeAnalytics.totalBuysToday.toFixed(2).split(".")[1],
      icon: "ri-arrow-left-down-fill",
      iconClass: "warning",
    },
    {
      id: 4,
      title: "Today's Sell",
      counter: tradeAnalytics.totalSellsToday.toFixed(2).split(".")[0] || 0,
      decimal: tradeAnalytics.totalSellsToday.toFixed(2).split(".")[1],
      icon: "ri-arrow-right-up-fill",
      iconClass: "success",
    },
  ];

  // console.log(tradeAnalytics);
  return (
    <React.Fragment>
      {buysellWidgets &&
        buysellWidgets.length > 0 &&
        buysellWidgets.map((item, key) => (
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
