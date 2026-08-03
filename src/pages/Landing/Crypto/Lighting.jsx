import React, { useState } from "react";

import { Col, Container, Row } from "reactstrap";
import { automated, hero2, light, smart } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "../../../constants/variants";

const Lighting = () => {
  return (
    <React.Fragment>
      <div className="">
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="row mt-5 align-items-center g-4 g-lg-5 p-2 p-lg-0">
            <motion.div
              className="col-12 col-lg-6 order-2 order-lg-1 overflow-hidden"
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
            >
              <div className="ps-lg-5">
                <div className="d-flex gap-1">
                  <div>
                    <h3
                      className="fw-bold mb-3"
                      style={{
                        color: "#202020",
                        fontSize: window.innerWidth >= 562 ? "44px" : "24px",
                        maxWidth: window.innerWidth >= 562 ? "520px" : "100%",
                        fontWeight: 900,
                      }}
                    >
                      Lightning-Fast Crypto Trading
                    </h3>

                    <p
                      className="mb-0 fs-16"
                      style={{
                        color: "#6c757d",
                        lineHeight: 1.8,
                        // fontSize: "1.1rem",
                      }}
                    >
                      The Exchange supports USD, EUR, and GBP. Invest in
                      cryptocurrency slowly over time by scheduling buys daily,
                      weekly, or monthly.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="col-12 col-lg-6 order-1 order-lg-2 pe-lg-5">
              <div className="px-3">
                <div className="d-flex align-items-center justify-content-center bg-info-subtle rounded-4">
                  <motion.img
                    src={light}
                    alt="hero-img"
                    className="img-fluid"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: false,
                      amount: 0.3,
                    }}
                    style={{
                      maxWidth: window.innerWidth > 562 ? "450px" : "100%",
                      height: "350px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Lighting;
