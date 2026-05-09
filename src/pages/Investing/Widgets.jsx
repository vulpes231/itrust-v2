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

const Widgets = () => {
  const tk = getAccessToken();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: !!tk,
  });

  const { data: wallets } = useQuery({
    queryKey: ["wallets"],
    queryFn: getUserWallets,
    enabled: !!tk,
  });

  const { data: walletData } = useQuery({
    queryKey: ["walletData"],
    queryFn: getWalletInvestData,
    enabled: !!tk,
  });

  const investAccount =
    wallets &&
    wallets.length > 0 &&
    wallets.find((wallet) => wallet.slug === "auto");

  // console.log(walletData);

  const userPlans = user && user.activePlans;

  function convertToWidgetsData() {
    if (!investAccount || !walletData) return [];

    const totalAutoBalance =
      investAccount.totalBalance + walletData["auto"].totalProfitLoss;

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
        counter: investAccount.dailyProfit,
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
        counter: walletData[investAccount.slug].totalInvested,
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
        return "#DFF5FA";
      case 2:
        return "#E8F3EA";
      case 3:
        return "#E8F3EA";
      case 4:
        return "#FDEAEA";
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
        return "#F17171";
      case 5:
        return "#29BADB";
      case 6:
        return "#F17171";
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
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 ms-3">
                      <p
                        className="fw-semibold fs-14 text-muted mb-2"
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
                        {/* <i className={getIcon(item.id)}></i> */}
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
