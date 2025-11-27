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

  const buysellWidgets = [
    {
      id: 1,
      title: "Total Buy",
      counter: formatCurrency(tradeAnalytics?.totalBuys) || 0,
      // decimal: "10",
      icon: "ri-shopping-bag-line",
      iconClass: "danger",
    },
    {
      id: 2,
      title: "Total Sell",
      counter: formatCurrency(tradeAnalytics?.totalSells) || 0,
      // decimal: "00",
      icon: "ri-funds-line",
      iconClass: "info",
    },
    {
      id: 3,
      title: "Today's Buy",
      counter: formatCurrency(tradeAnalytics?.totalBuysToday) || 0,
      // decimal: "85",
      icon: "ri-arrow-left-down-fill",
      iconClass: "warning",
    },
    {
      id: 4,
      title: "Today's Sell",
      counter: formatCurrency(tradeAnalytics?.totalSellsToday) || 0,
      // decimal: "35" totalSellsToday,
      icon: "ri-arrow-right-up-fill",
      iconClass: "success",
    },
  ];

  // console.log(tradeAnalytics);
  return (
    <React.Fragment>
      {buysellWidgets.map((item, key) => (
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
                    {/* <small className="text-muted fs-14">.{item.decimal}k</small> */}
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
