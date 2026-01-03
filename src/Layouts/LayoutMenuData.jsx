import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedinUser } from "../helpers/apiHelper";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../services/user/user";
import { getAccessToken } from "../constants";

const Navdata = () => {
  const token = getAccessToken();

  const { data: user } = useQuery({
    queryFn: getUserInfo,
    queryKey: ["user"],
    enabled: !!token,
  });

  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isMarket, setIsMarket] = useState(false);
  const [isSavings, setIsSavings] = useState(false);
  const [isPortFolio, setIsPortfolio] = useState(false);
  const [isWallet, setIsWallet] = useState(false);
  const [isInvesting, setIsInvesting] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Market") {
      setIsMarket(false);
    }
    if (iscurrentState !== "Savings") {
      setIsSavings(false);
    }
    if (iscurrentState !== "Investing") {
      setIsInvesting(false);
    }
    if (iscurrentState !== "Portfolio") {
      setIsPortfolio(false);
    }
    if (iscurrentState !== "Cash") {
      setIsWallet(false);
    }

    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
  }, [history, iscurrentState, isDashboard]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "ri-dashboard-2-line",
      link: "/dashboard",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: "ri-briefcase-line",
      link: "/portfolio",
      stateVariables: isPortFolio,
      click: function (e) {
        e.preventDefault();
        setIsPortfolio(!isPortFolio);
        setIscurrentState("Portfolio");
        updateIconSidebar(e);
      },
    },
    {
      id: "cash",
      label: "Cash",
      icon: "ri-wallet-2-line",
      link: "/cash",
      stateVariables: isWallet,
      click: function (e) {
        e.preventDefault();
        setIsWallet(!isWallet);
        setIscurrentState("Cash");
        updateIconSidebar(e);
      },
    },
    {
      id: "market",
      label: "Market",
      icon: "ri-funds-line",
      link: "/trade",
      click: function (e) {
        e.preventDefault();
        setIsMarket(!isMarket);
        setIscurrentState("Market");
        updateIconSidebar(e);
      },
      stateVariables: isMarket,
    },
    {
      id: "savings",
      label: "Savings & Retirements",
      icon: "ri-hand-coin-line",
      link: "/savings",
      click: function (e) {
        e.preventDefault();
        setIsSavings(!isSavings);
        setIscurrentState("Savings");
        updateIconSidebar(e);
      },
      stateVariables: isSavings,
    },
    {
      id: "investing",
      label: "Automated Investing",
      icon: "ri-folder-shield-2-line",
      link: "/automated-investing",
      click: function (e) {
        e.preventDefault();
        setIsInvesting(!isInvesting);
        setIscurrentState("Investing");
        updateIconSidebar(e);
      },
      stateVariables: isInvesting,
    },
    {
      label: "Pages",
      isHeader: true,
    },
  ];

  // useEffect(() => {
  //   if (user) console.log(user);
  // });
  return (
    <React.Fragment>
      {user && user?.accountStatus?.isProfileComplete ? menuItems : []}
    </React.Fragment>
  );
};
export default Navdata;
