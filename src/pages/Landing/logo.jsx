import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ logo }) => {
  return (
    <Link className="navbar-brand" to="/">
      <img
        src={logo}
        className="card-logo card-logo-dark"
        alt="logo dark"
        style={{ height: window.innerWidth >= 768 ? "30px" : "20px" }}
      />
      <img
        src={logo}
        className="card-logo card-logo-light"
        alt="logo light"
        style={{ height: window.innerWidth >= 768 ? "30px" : "20px" }}
      />
    </Link>
  );
};

export default Logo;
