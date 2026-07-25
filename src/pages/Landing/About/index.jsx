import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import Aboutus from "./Aboutus";
import Safety from "./Safety";
import Radical from "./Radical";
import Principle from "./Principle";
import Tile from "./Tile";

const About = () => {
  document.title = "About Us - ItrustInvestment";

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
        <Aboutus />

        <Safety />
        <Radical />
        <Principle />
        <Tile />
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

export default About;
