import React from "react";
import { getBodySize, getSize } from "../../../constants";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import { stockbg } from "../../../assets";

const Stock = () => {
  return (
    <React.Fragment>
      <section
        className="section"
        id="contact"
        style={{
          backgroundImage: window.innerWidth > 562 ? `url(${stockbg})` : "",
        }}
      >
        <Container
          fluid
          className="px-lg-4 py-5"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h2
              className="mb-3 mt-4 lg-mt-0 text-center text-center text-lg-left"
              style={{
                color: "#202020",
                fontSize: window.innerWidth >= 562 ? "52px" : "28px",
                maxWidth: window.innerWidth >= 562 ? "520px" : "100%",
                fontWeight: 900,
              }}
            >
              Smart stock Investing
            </h2>
            <p
              className="mb-0 text-center fs-18"
              style={{
                // color: "#6c757d",
                lineHeight: 1.8,
                maxWidth: window.innerWidth >= 992 ? "520px" : "100%",
              }}
            >
              Invest in individual stocks. Skip the endless hours of research to
              find companies not on your radar and see stocks in a whole new
              light — with fractional shares and no commissions
            </p>

            <Link
              style={{
                height: window.innerWidth > 562 ? "49px" : "45px",
                width: window.innerWidth > 562 ? "170px" : "128px",
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

export default Stock;
