import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/user/user";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { TbCircleArrowUpRight } from "react-icons/tb";
import { PiArrowUpRightFill } from "react-icons/pi";
import { IoFlashSharp } from "react-icons/io5";
import {
  getUserWallets,
  getWalletInvestData,
} from "../../services/user/wallet";
import { getAccessToken } from "../../constants";

const Widgets = ({ wallets, user, walletData }) => {
  const tk = getAccessToken();

  const investAccount =
    wallets &&
    wallets.length > 0 &&
    wallets.find((wallet) => wallet.slug === "auto");

  const userPlans = (user && user.activePlans) || [];

  const activePlans = userPlans.filter((plan) => plan.status === "active");

  const totalInvested = activePlans.reduce(
    (sum, plan) => sum + (plan.balance?.total || 0),
    0,
  );

  // console.log(walletData, "widgets");

  function convertToWidgetsData() {
    if (!investAccount || !walletData) return [];

    const totalAutoBalance =
      investAccount?.balance?.total + walletData["auto"].totalProfitLoss;

    return [
      {
        id: 1,
        label: "Auto Investing Balance",
        counter: totalAutoBalance,
        decimal: "2",
        prefix: "$",
        separator: ",",
        icon: <TbCircleArrowUpRight />,
      },
      {
        id: 2,
        label: "Today's P&L",
        counter: walletData?.["auto"]?.totalProfitLoss,
        decimal: "2",
        prefix: "$",
        separator: ",",
        icon: <PiArrowUpRightFill />,
      },
      {
        id: 3,
        label: "Active Plans",
        counter: userPlans?.length || 0,
        icon: <IoFlashSharp />,
      },
      {
        id: 4,
        label: "Amount Invested",
        counter: totalInvested,
        decimal: "2",
        prefix: "$",
        separator: ",",
        icon: <BiSolidBadgeDollar />,
      },
    ];
  }

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
        return "bg-info-subtle";
      case 2:
        return "bg-success-subtle";
      case 3:
        return "bg-success-subtle";
      case 4:
        return "bg-danger-subtle";

      default:
        return null;
    }
  };

  const getIconColor = (id) => {
    switch (id) {
      case 1:
        return "text-info";
      case 2:
        return "text-success";
      case 3:
        return "text-success";
      case 4:
        return "text-danger";

      default:
        return null;
    }
  };

  const widgetsData = convertToWidgetsData();
  return (
    <React.Fragment>
      <Row>
        {widgetsData &&
          widgetsData.length > 0 &&
          widgetsData.map((item, key) => (
            <Col lg={3} md={6} key={key}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 ms-3">
                      <p
                        className="fw-semibold fs-14 text-muted mb-3"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {item.label}
                      </p>
                      <h2 className="counter-value">
                        <CountUp
                          start={0}
                          end={item.counter}
                          decimals={item?.decimal}
                          separator={item?.separator}
                          prefix={item?.prefix}
                          duration={3}
                        />
                      </h2>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span
                        className={`avatar-title fs-22 rounded ${getIconColor(item.id)} ${getColorBgColor(item.id)}`}
                      >
                        {item.icon}
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
