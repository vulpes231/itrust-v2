import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle, Form } from "reactstrap";
import SearchOption from "../components/Common/SearchOption";
import NotificationDropdown from "../components/Common/NotificationDropdown";
import ProfileDropdown from "../components/Common/ProfileDropdown";
import LightDark from "../components/Common/LightDark";

import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { changeSidebarVisibility } from "../features/layouts/thunk";
import { logo } from "../assets";
import { getAccessToken } from "../constants";

const Header = ({ onChangeLayoutMode, layoutModeType, headerClass }) => {
  const dispatch = useDispatch();
  const token = getAccessToken();

  const selectDashboardData = createSelector(
    (state) => state.Layout,
    (sidebarVisibilitytype) => sidebarVisibilitytype.sidebarVisibilitytype
  );

  const sidebarVisibilitytype = useSelector(selectDashboardData);

  const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth;
    dispatch(changeSidebarVisibility("show"));

    if (windowSize > 767)
      document.querySelector(".hamburger-icon").classList.toggle("open");

    //For collapse horizontal menu
    if (document.documentElement.getAttribute("data-layout") === "horizontal") {
      document.body.classList.contains("menu")
        ? document.body.classList.remove("menu")
        : document.body.classList.add("menu");
    }

    //For collapse vertical and semibox menu
    if (
      sidebarVisibilitytype === "show" &&
      (document.documentElement.getAttribute("data-layout") === "vertical" ||
        document.documentElement.getAttribute("data-layout") === "semibox")
    ) {
      if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "sm"
          ? document.documentElement.setAttribute("data-sidebar-size", "")
          : document.documentElement.setAttribute("data-sidebar-size", "sm");
      } else if (windowSize > 1025) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "lg"
          ? document.documentElement.setAttribute("data-sidebar-size", "sm")
          : document.documentElement.setAttribute("data-sidebar-size", "lg");
      } else if (windowSize <= 767) {
        document.body.classList.add("vertical-sidebar-enable");
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
    }

    //Two column menu
    if (document.documentElement.getAttribute("data-layout") === "twocolumn") {
      document.body.classList.contains("twocolumn-panel")
        ? document.body.classList.remove("twocolumn-panel")
        : document.body.classList.add("twocolumn-panel");
    }
  };

  return (
    <React.Fragment>
      <header id="page-topbar" className={headerClass}>
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box horizontal-logo">
                <Link
                  to={token ? "/dashboard" : "/"}
                  className="logo logo-dark"
                >
                  <span className="logo-sm">
                    <img src={logo} alt="" style={{ width: "100px" }} />
                  </span>
                  <span className="logo-lg">
                    <img src={logo} alt="" style={{ width: "100px" }} />
                  </span>
                </Link>

                <Link
                  to={token ? "/dashboard" : "/"}
                  className="logo logo-light"
                >
                  <span className="logo-sm">
                    <img src={logo} alt="" style={{ width: "100px" }} />
                  </span>
                  <span className="logo-lg">
                    <img src={logo} alt="" style={{ width: "100px" }} />
                  </span>
                </Link>
              </div>

              <button
                onClick={toogleMenuBtn}
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>

              {/* <SearchOption /> */}
            </div>

            <div className="d-flex align-items-center">
              <LightDark
                layoutMode={layoutModeType}
                onChangeLayoutMode={onChangeLayoutMode}
              />

              <NotificationDropdown />

              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
