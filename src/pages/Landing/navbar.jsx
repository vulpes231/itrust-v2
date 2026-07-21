import React, { useState, useEffect, useRef } from "react";
import { Collapse, Container, NavbarToggler, NavLink } from "reactstrap";
import Scrollspy from "react-scrollspy";
import { Link, useLocation } from "react-router-dom";
import { logo } from "../../assets";
import { MdArrowDropDown, MdClose, MdMenu } from "react-icons/md";
import MobileNav from "./mobilenav";
import Logo from "./logo";
import { getSize } from "../../constants";

const Navbar = () => {
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
          path: "#automated-investing",
        },
        { id: "crypto", label: "Crypto Investing", path: "#crypto-investing" },
        { id: "bond", label: "Bond Investing", path: "#bond-investing" },
      ],
    },
    {
      id: "cash",
      label: "Cash",
      path: "#cash",
      submenus: [],
    },
    {
      id: "learn",
      label: "Learn",
      path: "",
      submenus: [
        { id: "automated", label: "How to Invest", path: "#how-to-invest" },
        { id: "crypto", label: "About Us", path: "#about-us" },
        { id: "bond", label: "Articles", path: "#articles" },
      ],
    },
    {
      id: "stocks",
      label: "Stocks",
      path: "#stocks",
      submenus: [],
    },
    {
      id: "faq",
      label: "F.A.Q",
      path: "#faq",
      submenus: [],
    },
  ];

  const returnNull = () => {
    return;
  };

  const location = useLocation();

  useEffect(() => {
    setOpenSubmenu(null);
    // setMobileMenu(false);
  }, [location.hash]);

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

  return (
    <React.Fragment>
      <header
        className={`bg-white position-fixed top-0 w-100 px-4 py-3 py-lg-4 ${navClass}`}
        id="navbar"
        style={{ zIndex: 1500 }}
      >
        <nav
          className="d-flex align-items-center justify-content-between"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <Logo logo={logo} />
          <div className="d-none d-lg-flex align-items-center gap-5">
            {navlinks.map((link) => (
              <div
                key={link.id}
                className="position-relative"
                onMouseEnter={() => {
                  if (isDesktop() && link.submenus.length) {
                    setOpenSubmenu(link.id);
                  }
                }}
                // onMouseLeave={() => {
                //   if (isDesktop()) {
                //     setOpenSubmenu(null);
                //   }
                // }}
              >
                <NavLink
                  href={`#${link.path}`}
                  className="fw-normal fs-16 d-flex align-items-center px-lg-2"
                  onClick={(e) => {
                    if (link.submenus.length) {
                      if (!isDesktop()) {
                        e.preventDefault();
                        toggleSubmenu(link.id);
                      }
                    }
                  }}
                >
                  {link.label}
                  {link.submenus.length > 0 && <MdArrowDropDown />}
                </NavLink>

                {openSubmenu === link.id && link.submenus.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "120%",
                      left: 0,
                      minWidth: "180px",
                      boxShadow: "0 8px 20px rgba(0,0,0,.1)",
                      zIndex: 1000,
                    }}
                    ref={subRef}
                    className="bg-white rounded p-2 d-flex flex-column gap-2"
                  >
                    {link.submenus.map((submenu) => (
                      <Link
                        key={submenu.id}
                        to={submenu.path}
                        className="text-decoration-none px-2 py-1 fw-bolder"
                        onClick={() => setOpenSubmenu(null)}
                        style={{ color: "#333" }}
                      >
                        {submenu.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="d-flex align-items-center gap-4 gap-lg-5">
            <span className="d-block">
              <Link
                style={{
                  width: isDesktop() ? "115px" : "85px",
                  // backgroundColor: isDesktop() ? "green" : "red",
                }}
                className="btn btn-secondary fw-bold p-1 p-lg-2"
                to={"/login"}
              >
                Sign In
              </Link>
            </span>
            <span
              className="d-block d-lg-none"
              onClick={mobileMenu ? undefined : openMenu}
            >
              <MdMenu size={22} />
            </span>
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

        <MobileNav
          links={navlinks}
          isOpen={mobileMenu}
          logo={logo}
          handleClose={closeMenu}
        />
      </header>
    </React.Fragment>
  );
};

export default Navbar;
