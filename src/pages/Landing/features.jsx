import React, { useState } from "react";

import { Col, Container, Row } from "reactstrap";
import { automated, hero2, treasure } from "../../assets";
import { getBodySize, getSize } from "../../constants";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "../../constants/variants";
// motion

const Features = () => {
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
          <div className="row mt-5 align-items-center gx-3 gx-lg-5">
            <div className="col-12 col-lg-6 bg-light rounded-4 pe-lg-5">
              <motion.img
                src={treasure}
                alt="hero-img"
                className="img-fluid"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
              />
            </div>
            <div style={{ overflowX: "hidden" }}>
              <motion.div
                className="col-12 col-lg-6"
                variants={slideRight}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
              >
                <div className="ps-lg-5">
                  <div className="d-flex gap-1 pb-4 mb-4 mt-4 mt-lg-0">
                    <div>
                      <h3
                        className="fw-bold mb-3"
                        style={{
                          color: "#202020",
                          fontSize: "2rem",
                        }}
                      >
                        Using a ladder of Treasuries, maintain a high yield.
                        (And avoid paying state income taxes.)
                      </h3>

                      <p
                        className="mb-0"
                        style={{
                          color: "#6c757d",
                          lineHeight: 1.8,
                          // fontSize: "1.1rem",
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
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Features;
