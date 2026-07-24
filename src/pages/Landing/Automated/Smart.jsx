import React, { useState } from "react";

import { Col, Container, Row } from "reactstrap";
import { automated, hero2, smart } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "../../../constants/variants";

const Smart = () => {
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
            <motion.div
              className="col-12 col-lg-6"
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
                        fontSize: "44px",
                      }}
                    >
                      A smarter way to
                      <br className="d-none d-lg-block" /> discover and buy
                      stocks
                    </h3>

                    <p
                      className="mb-0 fs-16"
                      style={{
                        color: "#6c757d",
                        lineHeight: 1.8,
                        // fontSize: "1.1rem",
                      }}
                    >
                      We make sense of the market so you can make more strategic
                      stock choices, faster. Browse dozens of themes and
                      opportunities, dive into data and perspectives, and invest
                      with ease
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="col-12 col-lg-6 bg-info-subtle rounded-4 pe-lg-5">
              <div className="d-flex align-items-center justify-content-center">
                <motion.img
                  src={smart}
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
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Smart;
