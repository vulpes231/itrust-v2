import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import Earn from "./Earn";
import Bill from "./Bill";
import Diversify from "./Diversify";
import CashFeatures from "./CashFeatures";
import Frequents from "./Frequents";

const CashPage = () => {
  document.title = "Welcome - Itrustinvestment Cash";

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
        <Earn />
        <Bill />
        <Diversify />
        <CashFeatures />
        <Frequents />

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

export default CashPage;
