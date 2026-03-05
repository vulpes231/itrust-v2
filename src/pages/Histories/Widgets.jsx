import numeral from "numeral";
import React from "react";
import CountUp from "react-countup";
import { Card, CardBody, Col, Row } from "reactstrap";

const Widgets = ({ analytics, tradeInfo }) => {
  const historyWidgets = analytics && [
    {
      id: 1,
      title: "Total Deposited",
      counter: analytics.totalDeposit,
      icon: "ri-arrow-up-fill",
      iconClass: "danger",
    },
    {
      id: 2,
      title: "Total Withdrawn",
      counter: analytics.totalWithdrawal,
      icon: "ri-arrow-down-fill",
      iconClass: "info",
    },
    {
      id: 3,
      title: "Total Trades",
      counter: tradeInfo?.length,
      icon: "ri-funds-line",
      iconClass: "warning",
    },
    {
      id: 4,
      title: "Active Trades",
      counter: tradeInfo?.activeTradesLength,
      icon: "ri-funds-line",
      iconClass: "success",
    },
  ];

  return (
    <React.Fragment>
      <Row>
        {historyWidgets.map((item, idx) => {
          const isCurrency =
            item.title === "Total Deposited" ||
            item.title === "Total Withdrawn";

          let whole, kobo;

          if (isCurrency) {
            [whole, kobo] = numeral(item.counter || 0)
              .format("0,0.00")
              .split(".");
          } else {
            whole = numeral(item.counter || 0).format("0,0");
          }

          return (
            <Col md={3} key={idx}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-start gap-3">
                    <div className="flex-shrink-0 avatar-sm">
                      <div
                        className={`avatar-title fs-22 rounded-circle bg-secondary-subtle text-secondary`}
                      >
                        <i className={item.icon}></i>
                      </div>
                    </div>

                    <div className="flex-grow-1">
                      <h6 className="text-muted mb-3 text-uppercase">
                        {item.title}
                      </h6>

                      <h2 className="mb-0">
                        {isCurrency && "$"}

                        <span className="counter-value">
                          <CountUp
                            start={0}
                            end={Number(whole.replace(/,/g, ""))}
                            duration={3}
                          />
                        </span>

                        {isCurrency && (
                          <small className="text-muted fs-14">.{kobo}k</small>
                        )}
                      </h2>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

export default Widgets;
