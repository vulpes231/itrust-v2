import React, { useState, useEffect, useRef } from "react";
import { Collapse, Container, NavbarToggler, NavLink } from "reactstrap";
import Scrollspy from "react-scrollspy";
import { Link, useLocation } from "react-router-dom";
import { logo } from "../../assets";
import { MdArrowDropDown, MdClose, MdMenu } from "react-icons/md";
import { getSize } from "../../constants";
import MobileAuth from "./MobileAuth";
import Logo from "../Landing/logo";

const AuthNav = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [navClass, setnavClass] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const subRef = useRef();

  const openMenu = (e) => {
    e.stopPropagation();
    setMobileMenu(true);
  };

  const closeMenu = () => {
    setMobileMenu(false);
  };

  const isDesktop = () => window.innerWidth >= 992;

  const toggleSubmenu = (id) => {
    if (!isDesktop()) {
      setOpenSubmenu((prev) => (prev === id ? null : id));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
    return () => window.removeEventListener("scroll", scrollNavigation, true);
  }, []);

  const [activeLink, setActiveLink] = useState();

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

  const returnNull = () => {
    return;
  };

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
        className={`bg-white position-fixed top-0 px-4 py-3 py-lg-4 ${navClass}`}
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
          <Logo logo={logo} />

          <div className="d-flex align-items-center gap-4 gap-lg-5">
            <span className="d-block">
              <Link
                style={{
                  width: isDesktop() ? "125px" : "85px",
                  height: isDesktop() ? "48px" : "44px",
                  // backgroundColor: isDesktop() ? "green" : "red",
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
            {/* <span
              className="d-block d-lg-none"
              onClick={mobileMenu ? undefined : openMenu}
            >
              <MdMenu size={22} />
            </span> */}
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
