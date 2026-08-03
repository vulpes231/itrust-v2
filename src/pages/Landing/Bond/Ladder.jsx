import React, { useState } from "react";

import { Col, Container, Row } from "reactstrap";
import { automated, hero2 } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "../../../constants/variants";

const Ladder = () => {
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
          <div className="row mt-5 align-items-center g-3 g-lg-5 p-2 p-lg-0">
            <div className="col-12 col-lg-6 pe-lg-5">
              <div className="px-3">
                <div className="d-flex align-items-center justify-content-center bg-light rounded-4">
                  <motion.img
                    src={automated}
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
                      maxWidth: window.innerWidth > 562 ? "500px" : "100%",
                      height: "350px",
                    }}
                  />
                </div>
              </div>
            </div>
            <motion.div
              className="col-12 col-lg-6 overflow-hidden"
              variants={slideRight}
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
                      className="mb-3 mt-2 mt-lg-0"
                      style={{
                        color: "#202020",
                        fontSize: window.innerWidth >= 562 ? "44px" : "24px",
                        maxWidth: window.innerWidth >= 562 ? "520px" : "100%",
                        fontWeight: 900,
                      }}
                    >
                      Using a ladder of Treasuries, maintain a high yield. (And
                      avoid paying state income taxes.)
                    </h3>

                    <p
                      className="mb-0 fs-16"
                      style={{
                        color: "#6c757d",
                        lineHeight: 1.8,
                        // fontSize: "1.1rem",
                        maxWidth: window.innerWidth > 562 ? "450px" : "100%",
                      }}
                    >
                      Safety, security and compliance. Adapting to legal
                      verification and complying with federal regulations
                      guarantees the lifetime safety of your assets and funds.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="row mt-5 align-items-center p-2 p-lg-0">
            <motion.div
              className="col-12 col-lg-6 overflow-hidden"
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
            >
              <div className="ps-lg-5">
                <div className="d-flex gap-1 pb-4 mb-4">
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
                      Keep your savings up.
                    </h3>
                    <span
                      className="fw-light"
                      style={{
                        color: "#202020",
                        fontSize: window.innerWidth >= 562 ? "39px" : "26px",
                        lineHeight: 1,
                        fontStyle: "italic",
                      }}
                    >
                      Even if interest rates drop.
                    </span>

                    <p
                      className="mb-0 fs-16"
                      style={{
                        color: "#6c757d",
                        lineHeight: 1.8,
                        // fontSize: "1.1rem",
                      }}
                    >
                      Although the federal funds rate is expected to decline*
                      regularly over the next two years, you can still lock in
                      current rates by investing in a ladder of Treasuries
                      today. By holding multiple Treasuries of different
                      maturities, you’ll earn a steady yield for your chosen
                      duration.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-12 col-lg-6 overflow-hidden"
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
            >
              <div className="ps-lg-5">
                <div className="d-flex gap-1 pb-4 mb-4">
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
                      To build your own bond ladder, you’ll need patience and
                      plenty of research.
                    </h3>
                    <span
                      className="fw-light"
                      style={{
                        color: "#202020",
                        fontSize: window.innerWidth >= 562 ? "39px" : "26px",
                        lineHeight: 1,
                        fontStyle: "italic",
                      }}
                    >
                      Or just use our service.
                    </span>

                    <p
                      className="mb-0 fs-16"
                      style={{
                        color: "#6c757d",
                        lineHeight: 1.8,
                        // fontSize: "1.1rem",
                      }}
                    >
                      Choose how long you want to invest (from three months to
                      six years) and we’ll show you your estimated average
                      yield. We’ll compare hundreds of Treasuries to prioritize
                      high coupon payments and liquidity, and keep your ladder
                      balanced as your rungs mature.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Ladder;
