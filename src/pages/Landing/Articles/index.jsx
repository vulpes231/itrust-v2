import React, { useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import ArticleTitle from "./ArticleTitle";
import ArticleBody from "./ArticleBody";
import ArticleList from "./ArticleList";

const Articles = () => {
  document.title = "Articles - ItrustInvestment";

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

  const [activeTab, setActiveTab] = useState("all");

  return (
    <React.Fragment>
      <div className="layout-wrapper landing">
        <Navbar />
        <ArticleTitle />
        <ArticleBody activeTab={activeTab} setActiveTab={setActiveTab} />
        <ArticleList activeTab={activeTab} />

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

export default Articles;
