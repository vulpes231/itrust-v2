import React, { useState, useEffect } from "react";
import { Collapse, Container, NavbarToggler, NavLink } from "reactstrap";
import Scrollspy from "react-scrollspy";
import { Link } from "react-router-dom";
import { logo } from "../../assets";

const Navbar = () => {
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const [navClass, setnavClass] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggle = () => setisOpenMenu(!isOpenMenu);
  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
    return () => window.removeEventListener("scroll", scrollNavigation, true);
  }, []);

  const [activeLink, setActiveLink] = useState();

  useEffect(() => {
    const activation = (event) => {
      const target = event.target.closest("a");
      if (target && target.getAttribute("href")?.startsWith("#")) {
        event.preventDefault();
        const targetId = target.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }

        target.classList.add("active");
        setActiveLink(target);
        if (activeLink && activeLink !== target) {
          activeLink.classList.remove("active");
        }
        setOpenSubmenu(null);
      }
    };

    const defaultLink = document.querySelector(".navbar li a.active");
    if (defaultLink) {
      defaultLink?.classList.add("active");
      setActiveLink(defaultLink);
    }

    const links = document.querySelectorAll(".navbar a");
    links.forEach((link) => {
      link.addEventListener("click", activation);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", activation);
      });
    };
  }, [activeLink]);

  const scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setnavClass("is-sticky");
    } else {
      setnavClass("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".nav-item")) {
        setOpenSubmenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <React.Fragment>
      <style>
        {`
          .nav-item {
            position: relative;
          }
          
          .submenu {
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            min-width: 200px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border-radius: 8px;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            padding: 0.5rem 0;
          }
          
          .nav-item:hover .submenu,
          .submenu.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          
          .submenu a {
            display: block;
            padding: 0.5rem 1.5rem;
            color: #333;
            text-decoration: none;
            transition: background 0.2s ease;
          }
          
          .submenu a:hover {
            background: #f5f5f5;
            color: #0d6efd;
          }
          
          .has-submenu {
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .has-submenu::after {
            content: "▼";
            font-size: 10px;
            transition: transform 0.3s ease;
          }
          
          .has-submenu.open::after {
            transform: rotate(180deg);
          }
          
          @media (max-width: 992px) {
            .submenu {
              position: static;
              box-shadow: none;
              padding-left: 1rem;
              opacity: 1;
              visibility: visible;
              transform: none;
              display: ${(props) => (openSubmenu ? "block" : "none")};
            }
            
            .nav-item:hover .submenu {
              display: ${(props) => (openSubmenu ? "block" : "none")};
            }
          }
        `}
      </style>

      <nav
        className={
          "navbar navbar-expand-lg navbar-landing fixed-top " + navClass
        }
        id="navbar"
      >
        <Container>
          <Link className="navbar-brand" to="/index">
            <img
              src={logo}
              className="card-logo card-logo-dark"
              alt="logo dark"
              height="30"
            />
            <img
              src={logo}
              className="card-logo card-logo-light"
              alt="logo light"
              height="30"
            />
          </Link>

          <NavbarToggler
            className="navbar-toggler py-0 fs-20 text-body"
            onClick={toggle}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="mdi mdi-menu"></i>
          </NavbarToggler>

          <Collapse
            isOpen={isOpenMenu}
            className="navbar-collapse"
            id="navbarSupportedContent"
          >
            <Scrollspy
              offset={-18}
              items={["hero", "investing", "cash", "learn", "stocks", "faq"]}
              currentClassName="active"
              className="navbar-nav mx-auto mt-2 mt-lg-0 d-flex align-items-center gap-4"
              id="navbar-example"
            >
              <li className="nav-item">
                <span
                  className={`nav-link fs-16 fw-regular has-submenu ${openSubmenu === "investing" ? "open" : ""}`}
                  onClick={() => toggleSubmenu("investing")}
                >
                  Investing
                </span>
                <div
                  className={`submenu fw-bold ${openSubmenu === "investing" ? "open" : ""}`}
                >
                  <a href="#automated-investing">Automated Investing</a>
                  <a href="#crypto-investing">Crypto Investing</a>
                  <a href="#bond-investing">Bond Investing</a>
                </div>
              </li>

              <li className="nav-item">
                <NavLink className="fs-16 fw-regular" href="#cash">
                  Cash
                </NavLink>
              </li>

              <li className="nav-item">
                <span
                  className={`nav-link fs-16 fw-regular has-submenu ${openSubmenu === "learn" ? "open" : ""}`}
                  onClick={() => toggleSubmenu("learn")}
                >
                  Learn
                </span>
                <div
                  className={`submenu fw-bold ${openSubmenu === "learn" ? "open" : ""}`}
                >
                  <a href="#how-to-invest">How to Invest</a>
                  <a href="#about">About</a>
                  <a href="#articles">Articles</a>
                </div>
              </li>

              <li className="nav-item">
                <NavLink className="fs-16 fw-regular" href="#stocks">
                  Stocks
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="fs-16 fw-regular" href="#faq">
                  F.A.Q
                </NavLink>
              </li>
            </Scrollspy>

            <div className="">
              <Link to="/login" className="btn btn-secondary fw-medium px-4">
                Sign In
              </Link>
            </div>
          </Collapse>
        </Container>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
