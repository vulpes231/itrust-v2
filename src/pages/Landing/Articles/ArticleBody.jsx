import React, { useState } from "react";
import { Container } from "reactstrap";
import { getSize } from "../../../constants";
import { BiWorld } from "react-icons/bi";
import { FaWallet } from "react-icons/fa6";
import { HiMiniPresentationChartBar } from "react-icons/hi2";
import { FaMoneyBill1 } from "react-icons/fa6";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { HiChartBar } from "react-icons/hi";
import { PiFireSimpleFill } from "react-icons/pi";
import { RiComputerFill } from "react-icons/ri";
import { FaSheetPlastic } from "react-icons/fa6";

const ArticleBody = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: "all",
      label: "All Articles",
      icon: <BiWorld className="text-danger" />,
    },
    {
      id: "business",
      label: "Business",
      icon: <FaWallet className="text-secondary" />,
    },
    {
      id: "investing",
      label: "Investing",
      icon: <HiMiniPresentationChartBar />,
    },
    {
      id: "savings",
      label: "Savings",
      icon: <FaMoneyBill1 className="text-success" />,
    },
    {
      id: "retirement",
      label: "Retirement",
      icon: <BiSolidPlaneAlt className="text-danger" />,
    },
    {
      id: "management",
      label: "Management",
      icon: <HiChartBar className="text-danger" />,
    },
    {
      id: "trend",
      label: "Trends",
      icon: <PiFireSimpleFill className="text-danger" />,
    },
    {
      id: "technology",
      label: "Technology",
      icon: <RiComputerFill className="text-info" />,
    },
    {
      id: "news",
      label: "News",
      icon: <FaSheetPlastic className="text-info" />,
    },
  ];
  return (
    <React.Fragment>
      <div className="section">
        <Container
          fluid
          className=""
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3
              style={{
                fontWeight: "bolder",
                fontSize: "32px",
                maxWidth: window.innerWidth > 562 ? "560px" : "100%",
              }}
              className="text-center"
            >
              Learn from our diverse collection of blogs and articles
            </h3>
            <p
              className="text-dark fs-16 text-center"
              style={{ maxWidth: window.innerWidth > 562 ? "560px" : "100%" }}
            >
              What you need to know about investing and saving and retirement
              planning from the get-go.{" "}
            </p>
            <p style={{ fontWeight: "bold" }}>EXPLORE TRENDING TOPICS</p>
            <div className="row g-3 justify-content-center">
              {tabs.map((tb) => {
                return (
                  <span
                    onClick={() => setActiveTab(tb.id)}
                    key={tb.id}
                    className="col-12 col-lg-2"
                  >
                    <span
                      //   style={{ width: window.innerWidth > 562 ? "180px" : "" }}
                      className={`d-flex align-items-center justify-content-center gap-1 shadow-lg px-2 py-3 ${activeTab === tb.id ? "rounded-pill border border-secondary" : ""}`}
                    >
                      <span className="fs-18">{tb.icon}</span>
                      <span style={{ fontWeight: "bolder" }}>{tb.label}</span>
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ArticleBody;
