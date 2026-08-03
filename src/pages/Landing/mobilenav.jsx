import React, { useState, useRef, useEffect } from "react";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Logo from "./logo";

const MobileNav = ({ links, isOpen, logo, handleClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const menuRef = useRef(null);
  const toggleSubmenu = (id) => {
    setOpenSubmenu((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, handleClose]);
  return (
    <div
      ref={menuRef}
      className="d-lg-none position-fixed top-0 start-0 vh-100 bg-white p-4 shadow-xl"
      style={{
        width: "75%",
        zIndex: 2000,
        transition: "transform .35s ease-in-out",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        boxShadow: " 0 8px 20px rgba(0, 0, 0, 0.1",
      }}
    >
      <div className="d-flex flex-column gap-4 mt-2">
        <div className="d-flex align-items-center justify-content-between">
          <Logo logo={logo} />
          <span onClick={handleClose}>
            <MdClose size={20} />
          </span>
        </div>
        {links.map((link) => (
          <div key={link.id}>
            <div
              className="d-flex gap-2 align-items-center fw-semibold fs-16"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (link.submenus.length) {
                  toggleSubmenu(link.id);
                }
              }}
            >
              <NavLink
                to={link.path}
                // style={{ color: "#202020" }}
                className="text-decoration-none text-dark fw-bold flex-grow-1"
              >
                {link.label}
              </NavLink>

              {link.submenus.length > 0 && <MdArrowDropDown />}
            </div>

            {openSubmenu === link.id && (
              <div className="ps-3 mt-2 d-flex flex-column gap-2">
                {link.submenus.map((submenu) => (
                  <NavLink
                    key={submenu.id}
                    to={submenu.path}
                    className="text-decoration-none"
                    onClick={handleClose}
                    style={{ fontWeight: 900, color: "#333" }}
                  >
                    {submenu.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
