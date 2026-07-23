import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import Crypto from "./Crypto";
import Create from "./Create";
import Lighting from "./Lighting";
import Security from "./Security";
import How from "./How";
import WorkProcess from "../workProcess";

const CryptoInvesting = () => {
  document.title = "Welcome - ItrustInvestment";

  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    const element = document.getElementById("back-to-top");
    if (element) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  };

  const toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <React.Fragment>
      <div className="layout-wrapper landing">
        <Navbar />
        <Crypto />
        <Create />
        <Lighting />
        <Security />
        <How />
        <WorkProcess />

        <Footer />
        <button
          onClick={() => toTop()}
          className="btn btn-danger btn-icon landing-back-top"
          id="back-to-top"
        >
          <i className="ri-arrow-up-line"></i>
        </button>
      </div>
    </React.Fragment>
  );
};

export default CryptoInvesting;
