import React, { useEffect, useState } from "react";
import { Card, Col, Row, TabContent, TabPane } from "reactstrap";
import AllPlans from "./AllPlans";
import ActivePlans from "./ActivePlans";
import ClosedPlans from "./ClosedPlans";
import { useQuery } from "@tanstack/react-query";
import { getAutoPlans } from "../../services/user/invest";
import { getUserInfo } from "../../services/user/user";
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

  const { data: plans } = useQuery({
    queryKey: ["autoplans"],
    queryFn: getAutoPlans,
  });
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  const activePlans = user && user.activePlans;

  const closedPlans =
    activePlans &&
    activePlans.length > 0 &&
    activePlans.filter((plan) => plan.status === "closed");

  const activePlanLength = activePlans?.length;
  const closedPlanLength = closedPlans?.length;

  const activeAll = tabs.filter((tb) => tb.id !== "closed");
  const all = tabs.filter((tb) => tb.id === "plans");

  const tabsToshow =
    activePlanLength > 0 && closedPlanLength > 0
      ? tabs
      : activePlanLength > 0 && closedPlanLength === 0
      ? activeAll
      : all;

  return (
    <React.Fragment>
      <div className="d-flex align-items-center gap-2">
        {tabsToshow.map((tb) => {
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
          <AllPlans style={style} plans={plans || []} />
        </TabPane>
        <TabPane tabId="active">
          <ActivePlans style={style} plans={activePlans || []} />
        </TabPane>
        <TabPane tabId="closed">
          <ClosedPlans style={style} plans={closedPlans || []} />
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};

export default Plans;
