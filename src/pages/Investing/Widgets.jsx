import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/user/user";

const Widgets = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  const userPlans = user && user.activePlans;
  const getIcon = (id) => {
    switch (id) {
      case 1:
        return "ri-money-dollar-circle-fill";
      case 2:
        return "ri-arrow-right-up-fill";
      case 3:
        return "ri-flashlight-fill";
      case 4:
        return "ri-arrow-right-up-fill";
      case 5:
        return "ri-flashlight-fill";
      case 6:
        return "ri-hand-coin-fill";
      default:
        return null;
    }
  };

  const getColorBgColor = (id) => {
    switch (id) {
      case 1:
        return "#DFF5FA";
      case 2:
        return "#E8F3EA";
      case 3:
        return "#E8F3EA";
      case 4:
        return "#E8F3EA";
      case 5:
        return "#DFF5FA";
      case 6:
        return "#FDEAEA";
      default:
        return null;
    }
  };

  const getIconColor = (id) => {
    switch (id) {
      case 1:
        return "#29BADB";
      case 2:
        return "#67B173";
      case 3:
        return "#67B173";
      case 4:
        return "#67B173";
      case 5:
        return "#29BADB";
      case 6:
        return "#F17171";
      default:
        return null;
    }
  };

  function convertToWidgetsData() {
    // if (!investData) return [];

    return [
      {
        id: 1,
        label: "Auto Investing Balance",
        counter: 1000 || 0,
        decimal: "2",
        prefix: "$",
        separator: ",",
      },
      {
        id: 2,
        label: "Today's P&L",
        counter: 40 || 0,
        decimal: "2",
        prefix: "$",
        separator: ",",
      },
      {
        id: 3,
        label: "Active Plans",
        counter: userPlans?.length || 0,
      },
      {
        id: 4,
        label: "Amount Invested",
        counter: 200 || 0,
        decimal: "2",
        prefix: "$",
        separator: ",",
      },
      // {
      //   id: 5,
      //   label: "Cost Basis",
      //   counter: 354,
      // },
      // {
      //   id: 6,
      //   label: "Funded ICOs",
      //   counter: 2762,
      // },
    ];
  }

  const widgetsData = convertToWidgetsData();
  return (
    <React.Fragment>
      <Row>
        {widgetsData &&
          widgetsData.length > 0 &&
          widgetsData.map((item, key) => (
            <Col lg={3} md={6} key={key}>
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 ms-3">
                      <p
                        className="text-uppercase fw-bold fs-13 text-muted mb-1"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {item.label}
                      </p>
                      <h4 className=" mb-0">
                        <CountUp
                          start={0}
                          end={item.counter}
                          decimals={item?.decimal}
                          separator={item?.separator}
                          prefix={item?.prefix}
                          duration={3}
                        />
                      </h4>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span
                        style={{
                          color: getIconColor(item.id),
                          backgroundColor: getColorBgColor(item.id),
                        }}
                        className="avatar-title fs-3"
                      >
                        <i className={getIcon(item.id)}></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
      </Row>
    </React.Fragment>
  );
};

export default Widgets;
