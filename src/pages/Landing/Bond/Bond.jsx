import React from "react";
import { getBodySize } from "../../../constants";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

const Bond = () => {
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
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h2
              className="fw-bolder mb-3 mt-4 lg-mt-0 text-center"
              style={{
                color: "#202020",
                fontSize: "44px",
                maxWidth: window.innerWidth >= 992 ? "520px" : "100%",
              }}
            >
              What should you do with your money?
            </h2>
            <p
              className="mb-0 text-center fs-18"
              style={{
                color: "#6c757d",
                lineHeight: 1.8,
                maxWidth: window.innerWidth >= 992 ? "520px" : "100%",
              }}
            >
              We have the accounts that make it easy to decide. From growing
              your savings to building long-term wealth, you can be invested
              with your preferred balance of risk and return.
            </p>

            <Link
              style={{
                width: window.innerWidth > 562 ? "140px" : "89px",
                height: window.innerWidth > 562 ? "44px" : "48px",
              }}
              className="btn btn-secondary fw-bold p-1 p-lg-2 d-flex align-items-center justify-content-center mt-4"
            >
              Get Started
            </Link>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Bond;
