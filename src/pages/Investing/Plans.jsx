import React, { useState } from "react";
import { Card, Col, Row, TabContent, TabPane } from "reactstrap";
import { cash } from "../../assets";
import { formatCurrency } from "../../constants";
import { capitalize } from "lodash";
import AllPlans from "./AllPlans";
import ActivePlans from "./ActivePlans";
import ClosedPlans from "./ClosedPlans";

const tabs = [
  {
    id: "plans",
    label: "All Plans",
  },
  {
    id: "active",
    label: "Active Plans",
  },
  {
    id: "closed",
    label: "Closed Plans",
  },
];

const plans = [
  {
    id: "plans",
    label: "Dividend Yield Gun",
    info: "Dividend Stocks and ETF's with Active Returns",
    min: 15000,
    winRate: "100",
    dailyReturn: "1.45",
    duration: "6 Months",
    aum: 172.3,
    risk: "conservative",
    img: "",
    expectedReturn: "48.08",
    status: "active",
  },
  {
    id: "title",
    label: "Dividend Yield Gun",
    info: "Dividend Stocks and ETF's with Active Returns",
    min: 15000,
    winRate: "100",
    dailyReturn: "1.45",
    duration: "6 Months",
    aum: 172.3,
    risk: "moderate",
    img: "",
    expectedReturn: "48.08",
    status: "closed",
  },
  {
    id: "total",
    label: "Dividend Yield Gun",
    info: "Dividend Stocks and ETF's with Active Returns",
    min: 15000,
    winRate: "100",
    dailyReturn: "1.45",
    duration: "6 Months",
    aum: 172.3,
    risk: "aggressive",
    img: "",
    expectedReturn: "48.08",
    status: "active",
  },
];

const style = {
  bold: "fs-16 fw-bold",
  medium: "fs-15 fw-semibold",
  large: "fs-32 fw-semibold",
  slim: "fs-14 fw-regular",
  dark: "#495057",
  light: "#878A99",
  green: "#67B173",
};

const Plans = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activePlans = plans.filter((plan) => plan.status === "active");
  const closedPlans = plans.filter((plan) => plan.status === "closed");
  return (
    <React.Fragment>
      <div className="d-flex align-items-center gap-2">
        {tabs.map((tb) => {
          return (
            <button
              className={`btn ${
                activeTab === tb.id
                  ? "bg-primary-subtle text-primary"
                  : "btn-light"
              }`}
              onClick={() => setActiveTab(tb.id)}
              key={tb.id}
            >
              {tb.label}
            </button>
          );
        })}
      </div>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="plans">
          <AllPlans style={style} plans={plans} />
        </TabPane>
        <TabPane tabId="active">
          <ActivePlans style={style} plans={activePlans} />
        </TabPane>
        <TabPane tabId="closed">
          <ClosedPlans style={style} plans={closedPlans} />
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};

export default Plans;
