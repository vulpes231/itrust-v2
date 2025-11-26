import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { Col, Collapse, Row } from "reactstrap";
import withRouter from "../../components/Common/withRouter";

// Import Data
import navdata from "../LayoutMenuData";
//i18n
import { withTranslation } from "react-i18next";

const HorizontalLayout = (props) => {
  const [isMoreMenu, setIsMoreMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();
  const navData = navdata().props.children;

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

  // Update active menu when location changes
  useEffect(() => {
    const currentPath = location.pathname;
    setActiveMenu(currentPath);

    // Initialize menu activation
    const initMenu = () => {
      const ul = document.getElementById("navbar-nav");
      const items = ul.getElementsByTagName("a");
      let itemsArray = [...items];

      removeActivation(itemsArray);

      let matchingMenuItem = itemsArray.find((x) => {
        return x.getAttribute("href") === currentPath;
      });

      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };

    initMenu();
  }, [location.pathname, props.layoutType]);

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
            ".collapse"
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

  // Check if menu item is active
  const isMenuItemActive = (itemLink) => {
    return activeMenu === itemLink || activeMenu.startsWith(itemLink + "/");
  };

  return (
    <React.Fragment>
      {(menuItems || []).map((item, key) => {
        const isActive = isMenuItemActive(item.link);

        return (
          <React.Fragment key={key}>
            {/* Main Header */}
            {!item["isHeader"] ? (
              item.subItems ? (
                <li className="nav-item">
                  <Link
                    onClick={item.click}
                    className={`nav-link menu-link ${isActive ? "active" : ""}`}
                    to={item.link ? item.link : "/#"}
                    data-bs-toggle="collapse"
                  >
                    <i className={item.icon}></i>{" "}
                    <span data-key="t-apps">{props.t(item.label)}</span>
                    {isActive && <div className="active-indicator"></div>}
                  </Link>
                  <Collapse
                    className={
                      item.id === "baseUi" && item.subItems.length > 13
                        ? "menu-dropdown mega-dropdown-menu"
                        : "menu-dropdown"
                    }
                    isOpen={item.stateVariables}
                    id="sidebarApps"
                  >
                    {/* Subitems rendering remains the same */}
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
                                              item.subItems[key].link
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
                                              item.subItems[key].link
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
                              subItem.link
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
                                                  subChildItem.link
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
                                                          subChildItem.label
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
                                                          subChildItem.label
                                                        )}
                                                      </Link>
                                                      {/* Nested collapse remains the same */}
                                                    </li>
                                                  )}
                                                </React.Fragment>
                                              );
                                            }
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
                    to={item.link ? item.link : "/#"}
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
    </React.Fragment>
  );
};

HorizontalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(HorizontalLayout));
