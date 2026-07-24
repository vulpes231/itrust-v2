import React from "react";
import Navbar from "../navbar";
import Stock from "./Stock";
import Footer from "../footer";
import Hero from "./Hero";
import Tool from "./Tool";
import Explore from "./Explore";
import Diligence from "./Diligence";
import Multiple from "./Multiple";
import Takeaway from "./Takeaway";
import Foot from "./Foot";

const Stocks = () => {
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
        <Stock />
        <Hero />
        <Tool />
        <Explore />
        <Diligence />
        <Multiple />
        <Takeaway />
        <Foot />

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

export default Stocks;
