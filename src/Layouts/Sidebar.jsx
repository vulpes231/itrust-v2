import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import VerticalLayout from "./VerticalLayouts/index";
import TwoColumnLayout from "./TwoColumnLayout";
import { Container } from "reactstrap";
import HorizontalLayout from "./HorizontalLayout";
import { logo } from "../assets";

const Sidebar = ({ layoutType }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const closeSidebar = () => {
      document.body.classList.remove("vertical-sidebar-enable");
      document.documentElement.setAttribute("data-sidebar-size", "lg");

      const hamburger = document.querySelector(".hamburger-icon");
      if (hamburger) hamburger.classList.remove("open");
    };

    const overlay = document.querySelector(".vertical-overlay");

    if (overlay) {
      overlay.addEventListener("click", closeSidebar);
      // Also add touch support for mobile
      overlay.addEventListener("touchstart", closeSidebar);
    }

    return () => {
      if (overlay) {
        overlay.removeEventListener("click", closeSidebar);
        overlay.removeEventListener("touchstart", closeSidebar);
      }
    };
  }, []);

  const toggleSmHover = () => {
    const current = document.documentElement.getAttribute("data-sidebar-size");
    if (current === "sm-hover") {
      document.documentElement.setAttribute(
        "data-sidebar-size",
        "sm-hover-active",
      );
    } else {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
    }
  };

  //   useEffect(() => {
  //     console.log("=== SIDEBAR DEBUG ===");
  //     console.log("layoutType:", layoutType);
  //     console.log("Is Horizontal?", layoutType === "horizontal");
  //     console.log(
  //       "Body has vertical-sidebar-enable?",
  //       document.body.classList.contains("vertical-sidebar-enable"),
  //     );
  //   }, [layoutType]);

  return (
    <React.Fragment>
      <div ref={sidebarRef} className="app-menu navbar-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logo} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logo} alt="" height="17" />
            </span>
          </Link>
          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logo} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logo} alt="" height="17" />
            </span>
          </Link>

          <button
            onClick={toggleSmHover}
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>

        {layoutType === "horizontal" ? (
          <div id="scrollbar">
            <Container fluid>
              <div id="two-column-menu"></div>
              <ul className="navbar-nav" id="navbar-nav">
                <HorizontalLayout />
              </ul>
            </Container>
          </div>
        ) : layoutType === "twocolumn" ? (
          <React.Fragment>
            <TwoColumnLayout layoutType={layoutType} />
            <div className="sidebar-background"></div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <SimpleBar id="scrollbar" className="h-100">
              <Container fluid>
                <div id="two-column-menu"></div>
                <ul className="navbar-nav" id="navbar-nav">
                  <VerticalLayout layoutType={layoutType} />
                </ul>
              </Container>
            </SimpleBar>
            <div className="sidebar-background"></div>
          </React.Fragment>
        )}
      </div>

      {/* Overlay - This is key for outside clicks */}
      <div className="vertical-overlay"></div>
    </React.Fragment>
  );
};

export default Sidebar;
