import React from "react";
import { getBodySize } from "../../../constants";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

const Crypto = () => {
  return (
    <React.Fragment>
      <section className="section" id="contact">
        <Container
          fluid
          className="px-lg-4 pt-4"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h2
              className="mb-3 mt-4 lg-mt-0"
              style={{
                color: "#202020",
                fontSize: window.innerWidth >= 562 ? "52px" : "28px",
                maxWidth: window.innerWidth >= 992 ? "520px" : "100%",
                fontWeight: 900,
              }}
            >
              Crypto Investing
            </h2>
            <p
              className="mb-0 text-center fs-18"
              style={{
                color: "#6c757d",
                lineHeight: 1.8,
                maxWidth: window.innerWidth >= 992 ? "520px" : "100%",
              }}
            >
              Buy and sell Bitcoin, Ethereum, Dogecoin, and other
              cryptocurrencies 24/7 and commission-free with Itrust Crypto.
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

export default Crypto;
