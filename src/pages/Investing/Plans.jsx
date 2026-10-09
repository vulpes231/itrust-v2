import React, { useEffect, useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import AllPlans from "./AllPlans";
import ActivePlans from "./ActivePlans";
import ClosedPlans from "./ClosedPlans";
import { useQuery } from "@tanstack/react-query";
import { getAutoPlans } from "../../services/user/invest";
import { getUserInfo } from "../../services/user/user";

const tabs = [
  {
    id: "active",
    label: "Active Plans",
  },
  {
    id: "plans",
    label: "All Plans",
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

const Plans = ({ status = "all", risk = "all", currency }) => {
  const [activeTab, setActiveTab] = useState("active");

  const { data: plans = [] } = useQuery({
    queryKey: ["autoplans"],
    queryFn: getAutoPlans,
  });

  const { data: user, isSuccess: isUserLoaded } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  const userActivePlans = user?.activePlans || [];

  const userOpenPlans = userActivePlans.filter(
    (plan) => plan?.status === "active",
  );

  const userClosedPlans = userActivePlans.filter(
    (plan) => plan?.status === "closed",
  );

  const userActivePlanLength = userOpenPlans.length;
  const userClosedPlanLength = userClosedPlans.length;

  // console.log(userActivePlans);

  const tabsToShow = tabs.filter((tab) => {
    if (tab.id === "active") {
      return userActivePlanLength > 0;
    }

    if (tab.id === "closed") {
      return userClosedPlanLength > 0;
    }

    return true;
  });

  useEffect(() => {
    if (!isUserLoaded) return;

    let defaultTab = "plans";

    if (userOpenPlans.length > 0) {
      defaultTab = "active";
    }

    const savedTab = sessionStorage.getItem("investTab");

    // If there are active plans, always default to Active Plans
    if (userOpenPlans.length > 0) {
      setActiveTab("active");
      sessionStorage.setItem("investTab", "active");
      return;
    }

    // Otherwise use saved tab if it is still valid
    const isValidSavedTab = tabsToShow.some((tab) => tab.id === savedTab);

    if (isValidSavedTab) {
      setActiveTab(savedTab);
    } else {
      setActiveTab(defaultTab);
      sessionStorage.setItem("investTab", defaultTab);
    }
  }, [isUserLoaded, userOpenPlans.length]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    sessionStorage.setItem("investTab", tabId);
  };

  const getFilteredPlans = (status) => {
    if (status === "all") return userActivePlans;
    if (status === "active") return userOpenPlans;
    if (status === "closed") return userClosedPlans;

    return [];
  };

  const filteredPlans = getFilteredPlans(status);

  const getFilteredByRiskPlans = () => {
    if (!plans || plans.length === 0) return [];

    if (risk === "all") return plans;

    return plans.filter((plan) => plan?.planType === risk);
  };

  const filteredByRiskPlans = getFilteredByRiskPlans();

  return (
    <React.Fragment>
      <div className="d-flex align-items-center gap-2">
        {tabsToShow.map((tb) => (
          <button
            type="button"
            key={tb.id}
            className={`btn ${
              activeTab === tb.id
                ? "bg-primary-subtle text-primary"
                : "btn-light"
            }`}
            onClick={() => handleTabChange(tb.id)}
          >
            {tb.label}
          </button>
        ))}
      </div>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="plans">
          <AllPlans
            style={style}
            plans={filteredByRiskPlans}
            currency={currency}
          />
        </TabPane>

        <TabPane tabId="active">
          <ActivePlans
            style={style}
            plans={userOpenPlans}
            currency={currency}
          />
        </TabPane>

        <TabPane tabId="closed">
          <ClosedPlans
            style={style}
            plans={userClosedPlans}
            currency={currency}
          />
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};

export default Plans;
