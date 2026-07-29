import React from "react";
import { getBodySize } from "../../../constants";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

const Automated = () => {
  return (
    <React.Fragment>
      <section className="section" id="contact">
        <Container
          fluid
          className="px-lg-4 py-5"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center bg-white">
            <h2
              className="fw-bolder mb-3 mt-4 lg-mt-0 text-center"
              style={{
                color: "#202020",
                fontSize: "44px",
              }}
            >
              Automate Your Trading
            </h2>
            <p
              className="mb-0 text-center fs-18"
              style={{
                color: "#6c757d",
                lineHeight: 1.8,
                maxWidth: window.innerWidth >= 992 ? "520px" : "100%",
              }}
            >
              The Automated Investing Account is designed to make time-tested
              investing strategies accessible to everyone. Invest in AI-curated,
              professionally managed portfolios built with low-cost index funds
              and proven strategies to help deliver steady long-term growth,
              even in volatile markets.
            </p>

            <Link
              style={{
                width: window.innerWidth > 562 ? "140px" : "89px",
                height: window.innerWidth > 562 ? "44px" : "48px",
              }}
              className="btn btn-secondary fw-bold p-1 p-lg-2 d-flex align-items-center justify-content-center mt-5"
            >
              Get Started
            </Link>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Automated;
