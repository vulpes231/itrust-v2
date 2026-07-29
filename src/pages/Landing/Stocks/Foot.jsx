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
          className="px-lg-4 py-5"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div
            className=" bg-secondary-subtle rounded-4 p-5 text-white"
            style={{
              backgroundImage: `url(${joinbg})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              // display: "inline-block",
              // padding: "10px 16px",
            }}
          >
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h2
                style={{
                  fontSize: window.innerWidth >= 560 ? "43px" : "30px",
                  fontWeight: "bolder",
                  lineHeight: "1",
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
                }}
                className="btn btn-secondary pt-2"
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
