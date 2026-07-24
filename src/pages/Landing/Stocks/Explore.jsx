import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { earn, exp, fund, gift, reg, smart } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "../../../constants/variants";

// motion

const Explore = () => {
  return (
    <React.Fragment>
      <section className="section bg-secondary-subtle mt-5 " id="plans">
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.3,
            }}
          >
            <div className="row mt-5 align-items-center gx-3 gx-lg-5">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
                className="col-12 col-lg-6 pe-lg-5 bg-secondary rounded-4"
              >
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={exp}
                    alt="hero-img"
                    className="img-fluid"
                    style={{
                      maxWidth: window.innerWidth > 562 ? "400px" : "100%",
                      height: "auto",
                      backgroundSize: "fit",
                    }}
                  />
                </div>
              </motion.div>
              <motion.div
                variants={slideRight}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
                className="col-12 col-lg-6 pe-lg-5"
              >
                <div className="mb-5">
                  <h3
                    className="fw-bold mb-3"
                    style={{
                      color: "#202020",
                      fontSize: "44px",
                      lineHeight: 1,
                    }}
                  >
                    See more stocks
                  </h3>
                  <span
                    className="fw-light"
                    style={{
                      color: "#202020",
                      fontSize: "44px",
                      lineHeight: 1,
                      fontStyle: "italic",
                    }}
                  >
                    Beyond the obvious
                  </span>
                  <div className="mt-3 fs-16">
                    <p
                      style={{
                        color: "#6c757d",
                        lineHeight: 0.7,
                      }}
                    >
                      {" "}
                      Companies you know you
                    </p>{" "}
                    <p
                      style={{
                        color: "#6c757d",
                        lineHeight: 0.7,
                      }}
                    >
                      know Companies you don’t know you know
                    </p>{" "}
                    <p
                      style={{
                        color: "#6c757d",
                        lineHeight: 0.7,
                      }}
                    >
                      {" "}
                      Companies you know you don’t know
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Explore;
