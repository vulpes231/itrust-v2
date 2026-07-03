import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Col, Collapse, Row } from "reactstrap";
import withRouter from "../../Components/Common/withRouter";
import navdata from "../LayoutMenuData";
import { withTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { allowedRoutesIfNotVerified, getAccessToken } from "../../constants";
import { getUserInfo } from "../../services/user/user";
import ErrorToast from "../../components/Common/ErrorToast";

const HorizontalLayout = (props) => {
  const [isMoreMenu, setIsMoreMenu] = useState(false);
  const [openMenus, setOpenMenus] = useState(new Set());
  const location = useLocation();
  const navigate = useNavigate();
  const navData = navdata().props.children;
  const token = getAccessToken();
  const { data: user } = useQuery({
    queryFn: getUserInfo,
    queryKey: ["user"],
    enabled: !!token,
  });

  const menuRef = useRef(null);

  const isKycApproved = user?.identityVerification?.kycStatus === "approved";
  const [error, setError] = useState("");
  const kycStatus = user?.identityVerification?.kycStatus;

  const closeMobileSidebar = useCallback(() => {
    document.body.classList.remove("vertical-sidebar-enable");
    document.documentElement.setAttribute("data-sidebar-size", "lg");

    const hamburgerIcon = document.querySelector(".hamburger-icon");
    if (hamburgerIcon) hamburgerIcon.classList.remove("open");
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenus(new Set());
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const toggleMenu = (id, e) => {
    e.preventDefault();
    const newOpenMenus = new Set(openMenus);
    if (newOpenMenus.has(id)) {
      newOpenMenus.delete(id);
    } else {
      newOpenMenus.clear();
      newOpenMenus.add(id);
    }
    setOpenMenus(newOpenMenus);
  };

  let menuItems = [];
  let splitMenuItems = [];
  let menuSplitContainer = 6;

  navData.forEach(function (value, key) {
    if (value["isHeader"]) {
      menuSplitContainer++;
    }
    if (key >= menuSplitContainer) {
      let val = value;
      val.childItems = value.subItems;
      val.isChildItem = value.subItems ? true : false;
      delete val.subItems;
      splitMenuItems.push(val);
    } else {
      menuItems.push(value);
    }
  });

  function activateParentDropdown(item) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      parentCollapseDiv.classList.add("show");
      const parentElement = parentCollapseDiv.parentElement.children[0];
      parentElement.classList.add("active");
      parentElement.setAttribute("aria-expanded", "true");

      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement
          .closest(".collapse")
          .classList.add("show");
        var parentElementDiv =
          parentCollapseDiv.parentElement.closest(
            ".collapse",
          ).previousElementSibling;

        if (parentElementDiv) {
          if (parentElementDiv.closest(".collapse")) {
            parentElementDiv.closest(".collapse").classList.add("show");
          }
          parentElementDiv.classList.add("active");

          var parentElementSibling =
            parentElementDiv.parentElement.parentElement.parentElement
              .previousElementSibling;
          if (parentElementSibling) {
            parentElementSibling.classList.add("active");
          }
        }
      }
    }
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains("active"));

    actiItems.forEach((item) => {
      if (item.classList.contains("menu-link")) {
        item.setAttribute("aria-expanded", false);
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      if (item.classList.contains("nav-link")) {
        item.setAttribute("aria-expanded", false);
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      item.classList.remove("active");
    });
  };

  const isMenuItemActive = (itemLink) => {
    if (!itemLink) return false;
    const currentPath = location.pathname;
    return currentPath === itemLink || currentPath.startsWith(itemLink + "/");
  };

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
        window.location.href = "/dashboard";
      }, 2000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  return (
    <React.Fragment>
      <ul className="navbar-nav" ref={menuRef}>
        {(menuItems || []).map((item, key) => {
          const isActive = isMenuItemActive(item.link);
          const isOpen = openMenus.has(item.id || item.label);

          return (
            <React.Fragment key={key}>
              {/* Main Header */}
              {!item["isHeader"] ? (
                item.subItems ? (
                  <li className="nav-item">
                    <Link
                      to="#"
                      className={`nav-link menu-link dropdown-toggle ${isActive ? "active" : ""}`}
                      onClick={(e) => toggleMenu(item.id || item.label, e)}
                      aria-expanded={isOpen}
                    >
                      <i className={item.icon}></i>{" "}
                      <span>{props.t(item.label)}</span>
                      {isActive && <div className="active-indicator"></div>}
                    </Link>
                    <Collapse
                      className={
                        item.id === "baseUi" && item.subItems.length > 13
                          ? "menu-dropdown mega-dropdown-menu"
                          : "menu-dropdown"
                      }
                      isOpen={isOpen}
                      id="sidebarApps"
                    >
                      {item.id === "baseUi" && item.subItems.length > 13 ? (
                        <React.Fragment>
                          <Row>
                            {item.subItems &&
                              (item.subItems || []).map((subItem, key) => (
                                <React.Fragment key={key}>
                                  {key % 2 === 0 ? (
                                    <Col lg={4}>
                                      <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                          <Link
                                            to={item.subItems[key].link}
                                            className={`nav-link ${
                                              isMenuItemActive(
                                                item.subItems[key].link,
                                              )
                                                ? "active"
                                                : ""
                                            }`}
                                          >
                                            {item.subItems[key].label}
                                          </Link>
                                        </li>
                                      </ul>
                                    </Col>
                                  ) : (
                                    <Col lg={4}>
                                      <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                          <Link
                                            to={item.subItems[key].link}
                                            className={`nav-link ${
                                              isMenuItemActive(
                                                item.subItems[key].link,
                                              )
                                                ? "active"
                                                : ""
                                            }`}
                                          >
                                            {item.subItems[key].label}
                                          </Link>
                                        </li>
                                      </ul>
                                    </Col>
                                  )}
                                </React.Fragment>
                              ))}
                          </Row>
                        </React.Fragment>
                      ) : (
                        <ul className="nav nav-sm flex-column test">
                          {item.subItems &&
                            (item.subItems || []).map((subItem, key) => {
                              const isSubItemActive = isMenuItemActive(
                                subItem.link,
                              );
                              return (
                                <React.Fragment key={key}>
                                  {!subItem.isChildItem ? (
                                    <li className="nav-item">
                                      <Link
                                        to={subItem.link ? subItem.link : "/#"}
                                        className={`nav-link ${
                                          isSubItemActive ? "active" : ""
                                        }`}
                                      >
                                        {props.t(subItem.label)}
                                      </Link>
                                    </li>
                                  ) : (
                                    <li className="nav-item">
                                      <Link
                                        onClick={subItem.click}
                                        className={`nav-link ${
                                          isSubItemActive ? "active" : ""
                                        }`}
                                        to="/#"
                                        data-bs-toggle="collapse"
                                      >
                                        {" "}
                                        {props.t(subItem.label)}
                                      </Link>
                                      <Collapse
                                        className="menu-dropdown"
                                        isOpen={subItem.stateVariables}
                                        id="sidebarEcommerce"
                                      >
                                        <ul className="nav nav-sm flex-column">
                                          {/* child subItems */}
                                          {subItem.childItems &&
                                            (subItem.childItems || []).map(
                                              (subChildItem, key) => {
                                                const isChildItemActive =
                                                  isMenuItemActive(
                                                    subChildItem.link,
                                                  );
                                                return (
                                                  <React.Fragment key={key}>
                                                    {!subChildItem.isChildItem ? (
                                                      <li className="nav-item">
                                                        <Link
                                                          to={
                                                            subChildItem.link
                                                              ? subChildItem.link
                                                              : "/#"
                                                          }
                                                          className={`nav-link ${
                                                            isChildItemActive
                                                              ? "active"
                                                              : ""
                                                          }`}
                                                        >
                                                          {props.t(
                                                            subChildItem.label,
                                                          )}
                                                        </Link>
                                                      </li>
                                                    ) : (
                                                      <li className="nav-item">
                                                        <Link
                                                          onClick={
                                                            subChildItem.click
                                                          }
                                                          className={`nav-link ${
                                                            isChildItemActive
                                                              ? "active"
                                                              : ""
                                                          }`}
                                                          to="/#"
                                                          data-bs-toggle="collapse"
                                                        >
                                                          {" "}
                                                          {props.t(
                                                            subChildItem.label,
                                                          )}
                                                        </Link>
                                                        {/* Nested collapse remains the same */}
                                                      </li>
                                                    )}
                                                  </React.Fragment>
                                                );
                                              },
                                            )}
                                        </ul>
                                      </Collapse>
                                    </li>
                                  )}
                                </React.Fragment>
                              );
                            })}
                        </ul>
                      )}
                    </Collapse>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      className={`nav-link menu-link ${isActive ? "active" : ""}`}
                      onClick={(e) => {
                        console.log("link clicked");
                        e.preventDefault();

                        if (
                          !allowedRoutesIfNotVerified.includes(item.link) &&
                          !isKycApproved
                        ) {
                          setError("Profile Verification Required!");
                          return;
                        }
                        closeMobileSidebar();

                        navigate(item.link);

                        item.click?.(e);
                      }}
                    >
                      <i className={item.icon}></i>{" "}
                      <span>{props.t(item.label)}</span>
                      {isActive && <div className="active-indicator"></div>}
                    </Link>
                  </li>
                )
              ) : (
                <li className="menu-title">
                  <span data-key="t-menu">{props.t(item.label)}</span>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>

      {error && <ErrorToast errorMsg={error} onClose={() => setError("")} />}
    </React.Fragment>
  );
};

HorizontalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(HorizontalLayout));
