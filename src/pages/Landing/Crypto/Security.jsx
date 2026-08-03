import React, { useState } from "react";

import { Col, Container, Row } from "reactstrap";
import { automated, hero2, sec } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "../../../constants/variants";

const Security = () => {
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
          <div className="row mt-5 align-items-center gx-3 gx-lg-5 p-2 p-lg-0">
            <div className="col-12 col-lg-6 pe-lg-5">
              <div className="px-3">
                <div className="d-flex align-items-center justify-content-center bg-secondary rounded-4">
                  <motion.img
                    src={sec}
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
            <motion.div
              className="col-12 col-lg-6 mt-4 mt-lg-0 overflow-hidden"
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
                      style={{
                        color: "#202020",
                        fontSize: window.innerWidth >= 562 ? "44px" : "24px",
                        maxWidth: window.innerWidth >= 562 ? "520px" : "100%",
                        fontWeight: 900,
                      }}
                    >
                      Security From Day One
                    </h3>

                    <p
                      className="mb-0 fs-16"
                      style={{
                        color: "#6c757d",
                        lineHeight: 1.8,
                        // fontSize: "1.1rem",
                      }}
                    >
                      Safety, security and compliance. Buy and sell popular
                      digital currencies, keep track of them in the one place
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          {/* <Row></Row> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Security;
