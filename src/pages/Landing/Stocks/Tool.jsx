import React from "react";
import { Container } from "reactstrap";
import {
  stock,
  tool0,
  tool1,
  tool2,
  tool3,
  tool4,
  tool5,
  tool6,
  tool7,
  tool8,
  tool9,
  toollast,
} from "../../../assets";
import { getSize } from "../../../constants";

const Tool = () => {
  const cardItems = [
    {
      id: 1,
      label: "subscription model",
      info: "Companies that sell products or services under a subscription model.",
      count: "19 stocks",
      img: tool1,
    },
    {
      id: 2,
      label: "buybacks",
      info: "Profitable companies (return on equity of at least 20% in the past two years) that have undertaken significant buybacks (shares outstanding decreased by at least 10%).",
      count: "14 stocks",
      img: tool2,
    },
    {
      id: 3,
      label: "Transformative hardware tech",
      info: "Leading innovative hardware/production companies using or developing fast-growing technologies",
      count: "20 stocks",
      img: tool3,
    },
    {
      id: 4,
      label: "wide moats",
      info: "The 11 largest companies by market cap that have strong competitive advantage over competitors and over 20% of industry sales.",
      count: "11 stocks",
      img: tool4,
    },
    {
      id: 5,
      label: "semiconductor leaders",
      info: "These are 10 of the largest US companies by market cap in the semiconductor supply chain.",
      count: "10 stocks",
      img: tool5,
    },
    {
      id: 6,
      label: "transformative software tech",
      info: "Leading innovative software/service companies using or developing fast-growing technologies.",
      count: "15 stocks",
      img: tool6,
    },
    {
      id: 7,
      label: "dividend blue chip stocks",
      info: "It can pay to buy shares. These Dow 30 companies have a dividend yield of at least 3.00%.",
      count: "9 stocks",
      img: tool7,
    },
    {
      id: 8,
      label: "cloud computing",
      info: "These companies provide cloud computing infrastructure, the collection of hardware and software elements needed to enable cloud computing.",
      count: "8 stocks",
      img: tool8,
    },
    {
      id: 9,
      label: "lower volaitlity, lower risk",
      info: "These stocks have the lowest expected volatility, according to Wealthfront’s risk model.",
      count: "15 stocks",
      img: tool9,
    },
    {
      id: 10,
      label: "streaming",
      info: "Invest in some of the most popular streaming services and hardware producers in the US.",
      count: "6 stocks",
      img: tool0,
    },
    {
      id: 11,
      label: "rising interest rates",
      info: "Earn on other’s interest. These are some of the largest banks, brokerages, and insurers listed in the U.S.",
      count: "15 stocks",
      img: toollast,
    },
  ];
  return (
    <React.Fragment>
      <div>
        <Container
          fluid
          className="px-lg-4 py-5"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h3
              className="fw-bold mb-3"
              style={{
                color: "#202020",
                fontSize: "44px",
                lineHeight: "1",
              }}
            >
              An excellent tool{" "}
            </h3>
            <span
              style={{
                fontStyle: "italic",
                lineHeight: "1",
                fontSize: "35px",
              }}
            >
              For finding great stocks
            </span>
            <p
              className="mb-0 mt-3 fs-16 text-left text-lg-center"
              style={{
                // color: "#6c757d",
                lineHeight: 1.8,
                maxWidth: window.innerWidth > 562 ? "660px" : "100%",
              }}
            >
              Our stock collections are designed around investing themes and
              opportunities to help you make smarter investing decisions,
              faster. Choose one or multiple stocks from dozens of pre-built
              collections. Or get started by picking the stocks you already know
              and love.
            </p>
          </div>
          <div className="row g-4 mt-5 pt-3">
            {cardItems.map((item) => (
              <div key={item.id} className="col-12 col-lg-4 d-flex">
                <div
                  style={{ boxShadow: "0 6px 18px rgba(0, 0, 0, 0.18)" }}
                  className="bg-white rounded-4 p-3 h-100 w-100 d-flex flex-column"
                >
                  <div className="d-flex flex-column align-items-center gap-2 flex-grow-1">
                    <h4 className="fw-bold fs-16">{item.count}</h4>
                    <h3 className="text-capitalize fw-bold fs-16">
                      {item.label}
                    </h3>

                    <p
                      className="text-center text-dark flex-grow-1"
                      style={{ maxWidth: "300px" }}
                    >
                      {item.info}
                    </p>

                    <img
                      src={item.img}
                      alt=""
                      className="img-fluid mt-auto"
                      style={{
                        maxWidth: window.innerWidth > 562 ? "280px" : "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Tool;
