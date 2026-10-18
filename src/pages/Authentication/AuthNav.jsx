import React, { useState, useEffect, useRef } from "react";

import { Link, useLocation } from "react-router-dom";
import { darklogo, logo } from "../../assets";
import { getSize } from "../../constants";
import MobileAuth from "./MobileAuth";
import Logo from "../Landing/logo";
import LightDark from "../../components/Common/LightDark";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { changeLayoutMode } from "../../features/layouts/thunk";

const AuthNav = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [navClass, setnavClass] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const dispatch = useDispatch();
  const selectLayoutState = (state) => state.Layout;

  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutModeType: layout.layoutModeType,
    }),
  );
  // Inside your component
  const { layoutModeType } = useSelector(selectLayoutProperties);

  /*
    layout settings
    */
  useEffect(() => {
    if (layoutModeType) {
      window.dispatchEvent(new Event("resize"));

      dispatch(changeLayoutMode(layoutModeType));
    }
  }, [layoutModeType, dispatch]);
  /*
    call dark/light mode
    */
  const onChangeLayoutMode = (value) => {
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
    }
  };

  const subRef = useRef();

  const closeMenu = () => {
    setMobileMenu(false);
  };

  const isDesktop = () => window.innerWidth >= 992;

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
    return () => window.removeEventListener("scroll", scrollNavigation, true);
  }, []);

  const scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setnavClass("is-sticky");
    } else {
      setnavClass("");
    }
  };

  const navlinks = [
    {
      id: "investing",
      label: "Investing",
      path: "",
      submenus: [
        {
          id: "automated",
          label: "Automated Investing",
          path: "/automated",
        },
        { id: "crypto", label: "Crypto Investing", path: "/crypto" },
        { id: "bond", label: "Bond Investing", path: "/bond" },
      ],
    },
    {
      id: "cash",
      label: "Cash",
      path: "/cash-page",
      submenus: [],
    },
    {
      id: "learn",
      label: "Learn",
      path: "",
      submenus: [
        { id: "how", label: "How to Invest", path: "/how-to-invest" },
        { id: "about", label: "About Us", path: "/about-us" },
        { id: "articles", label: "Articles", path: "/articles" },
      ],
    },
    {
      id: "stocks",
      label: "Stocks",
      path: "/stocks",
      submenus: [],
    },
    {
      id: "faq",
      label: "F.A.Q",
      path: "/faq",
      submenus: [],
    },
  ];

  const location = useLocation();

  useEffect(() => {
    setOpenSubmenu(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (subRef.current && !subRef.current.contains(e.target)) {
        setOpenSubmenu(null);
      }
    };

    if (openSubmenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openSubmenu]);

  //   console.log(location.pathname);
  return (
    <React.Fragment>
      <header
        className={`position-fixed top-0 px-4 py-3 py-lg-4 ${navClass}`}
        id="navbar"
        style={{ zIndex: 1500, width: "100vw" }}
      >
        <nav
          className="d-flex align-items-center justify-content-between"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <Logo logo={layoutModeType === "light" ? logo : darklogo} />

          <div className="d-flex gap-2">
            <LightDark
              layoutMode={layoutModeType}
              onChangeLayoutMode={onChangeLayoutMode}
            />

            <div className="d-flex align-items-center gap-4 gap-lg-5">
              <span className="d-block">
                <Link
                  style={{
                    width: isDesktop() ? "125px" : "85px",
                    height: isDesktop() ? "48px" : "44px",
                  }}
                  className="btn btn-secondary fw-bold p-1 p-lg-2 d-flex align-items-center justify-content-center"
                  to={
                    location.pathname.includes("/login")
                      ? "/register"
                      : location.pathname.includes("/register")
                        ? "/login"
                        : location.pathname.includes("/forgot-password")
                          ? "/login"
                          : "#"
                  }
                >
                  {" "}
                  {location.pathname.includes("/login")
                    ? "Sign Up"
                    : location.pathname.includes("/register")
                      ? "Sign In"
                      : location.pathname.includes("/forgot-password")
                        ? "Sign In"
                        : ""}
                </Link>
              </span>
            </div>
          </div>
        </nav>

        {mobileMenu && (
          <div
            className="position-fixed top-0 start-0 vw-100 vh-100"
            style={{
              background: "rgba(0,0,0,.3)",
              zIndex: 1999,
            }}
            onClick={closeMenu}
          />
        )}

        <MobileAuth
          links={navlinks}
          isOpen={mobileMenu}
          logo={logo}
          handleClose={closeMenu}
        />
      </header>
    </React.Fragment>
  );
};

export default AuthNav;
