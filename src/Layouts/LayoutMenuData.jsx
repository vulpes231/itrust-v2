import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isMarket, setIsMarket] = useState(false);
  const [isSavings, setIsSavings] = useState(false);
  const [isWallet, setIsWallet] = useState(false);

  //Calender
  const [isTrade, setIsTrade] = useState(false);
  const [isHistory, setIsHistory] = useState(false);

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
      //   subItems: [
      //     {
      //       id: "crypto",
      //       label: "Crypto",
      //       link: "#",
      //       parentId: "dashboard",
      //     },
      //   ],
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: "ri-dashboard-2-line",
      link: "/wallet",
      stateVariables: isWallet,
      click: function (e) {
        e.preventDefault();
        setIsWallet(!isWallet);
        setIscurrentState("Wallet");
        updateIconSidebar(e);
      },
      //   subItems: [
      //     {
      //       id: "crypto",
      //       label: "Crypto",
      //       link: "#",
      //       parentId: "dashboard",
      //     },
      //   ],
    },
    {
      id: "market",
      label: "Market",
      icon: "ri-apps-2-line",
      link: "/trade",
      click: function (e) {
        e.preventDefault();
        setIsMarket(!isMarket);
        setIscurrentState("Market");
        updateIconSidebar(e);
      },
      stateVariables: isMarket,
      //   subItems: [
      //     {
      //       id: "trade",
      //       label: "Trade",
      //       link: "/trade",
      //       parentId: "market",
      //       isChildItem: true,
      //       click: function (e) {
      //         e.preventDefault();
      //         setIsTrade(!isTrade);
      //       },
      //       stateVariables: isTrade,
      //       //   childItems: [
      //       //     {
      //       //       id: 1,
      //       //       label: "Main Calender",
      //       //       link: "#",
      //       //       parentId: "market",
      //       //     },
      //       //     {
      //       //       id: 2,
      //       //       label: "Month Grid",
      //       //       link: "#",
      //       //       parentId: "market",
      //       //     },
      //       //   ],
      //     },
      //   ],
    },
    {
      id: "savings",
      label: "Savings",
      icon: "ri-briefcase-2-line",
      link: "/savings",
      click: function (e) {
        e.preventDefault();
        setIsSavings(!isSavings);
        setIscurrentState("Savings");
        updateIconSidebar(e);
      },
      stateVariables: isSavings,
      //   subItems: [
      //     {
      //       id: "history",
      //       label: "History",
      //       link: "#",
      //       parentId: "savings",
      //       isChildItem: true,
      //       click: function (e) {
      //         e.preventDefault();
      //         setIsHistory(!isHistory);
      //       },
      //       stateVariables: isHistory,
      //       childItems: [
      //         {
      //           id: 1,
      //           label: "Main Calender",
      //           link: "#",
      //           parentId: "savings",
      //         },
      //         {
      //           id: 2,
      //           label: "Month Grid",
      //           link: "#",
      //           parentId: "savings",
      //         },
      //       ],
      //     },
      //   ],
    },
    {
      label: "Pages",
      isHeader: true,
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
