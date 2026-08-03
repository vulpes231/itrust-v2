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
      icon: (
        <BiWorld
          className="text-danger"
          style={{
            fontSize: window.innerWidth > 562 ? "24px" : "18px",
          }}
        />
      ),
    },
    {
      id: "business",
      label: "Business",
      icon: (
        <FaWallet
          className="text-secondary"
          style={{
            fontSize: window.innerWidth > 562 ? "24px" : "18px",
          }}
        />
      ),
    },
    {
      id: "investing",
      label: "Investing",
      icon: (
        <HiMiniPresentationChartBar
          style={{
            fontSize: window.innerWidth > 562 ? "24px" : "18px",
          }}
        />
      ),
    },
    {
      id: "savings",
      label: "Savings",
      icon: (
        <FaMoneyBill1
          className="text-success"
          style={{
            fontSize: window.innerWidth > 562 ? "24px" : "18px",
          }}
        />
      ),
    },
    {
      id: "retirement",
      label: "Retirement",
      icon: (
        <BiSolidPlaneAlt
          className="text-danger"
          style={{
            fontSize: window.innerWidth > 562 ? "24px" : "18px",
          }}
        />
      ),
    },
    {
      id: "management",
      label: "Management",
      icon: (
        <HiChartBar
          className="text-danger"
          style={{
            fontSize: window.innerWidth > 562 ? "24px" : "18px",
          }}
        />
      ),
    },
    {
      id: "trend",
      label: "Trends",
      icon: (
        <PiFireSimpleFill
          className="text-danger"
          style={{
            fontSize: window.innerWidth > 562 ? "24px" : "18px",
          }}
        />
      ),
    },
    {
      id: "technology",
      label: "Technology",
      icon: (
        <RiComputerFill
          className="text-info"
          style={{
            fontSize: window.innerWidth > 562 ? "24px" : "18px",
          }}
        />
      ),
    },
    {
      id: "news",
      label: "News",
      icon: (
        <FaSheetPlastic
          className="text-info"
          style={{
            fontSize: window.innerWidth > 562 ? "24px" : "18px",
          }}
        />
      ),
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
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {tabs.map((tb) => (
                <div
                  key={tb.id}
                  onClick={() => setActiveTab(tb.id)}
                  className={`d-flex align-items-center gap-1 px-3 py-2 shadow-lg ${
                    activeTab === tb.id
                      ? "rounded-pill border border-secondary"
                      : "rounded-3"
                  }`}
                  style={{
                    minWidth: tb.id === 1 ? "flex-grow-1" : "",
                    cursor: "pointer",
                  }}
                >
                  <span>{tb.icon}</span>
                  <p style={{ fontWeight: 900 }} className="mb-0">
                    {tb.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ArticleBody;
