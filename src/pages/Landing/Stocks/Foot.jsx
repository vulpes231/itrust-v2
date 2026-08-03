import React from "react";
import { Col, Container, Row } from "reactstrap";

import { motion } from "framer-motion";

import { getSize } from "../../../constants";
import { gift, inny, joinbg } from "../../../assets";

const Foot = () => {
  return (
    <React.Fragment>
      <section className="section">
        <Container
          fluid
          className="p-4"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div
            className="bg-secondary-subtle rounded-4 p-5 text-white"
            style={{
              backgroundImage: `url(${joinbg})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="d-flex flex-column align-items-center justify-content-center gap-3">
              <h2
                style={{
                  color: "#202020",
                  fontSize: window.innerWidth >= 562 ? "36px" : "26px",
                  maxWidth: window.innerWidth >= 562 ? "520px" : "100%",
                  fontWeight: 900,
                  lineHeight: 1,
                }}
                className="text-white"
              >
                Takeaway
              </h2>
              <p className="text-center fs-16">
                Stock markets are complex, but they’re all based upon one simple
                concept... From New York to Hong Kong, every stock market helps
                connect buyers and sellers, <br /> who trade under an agreed
                upon set of rules.
              </p>
              <button
                style={{
                  width: "155px",
                  height: "46px",
                  fontWeight: 700,
                }}
                className="btn btn-light pt-2"
              >
                Get Started
              </button>
            </div>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Foot;
