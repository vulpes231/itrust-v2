import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { earn, exp, fund, gift, mul, reg, smart } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "../../../constants/variants";

// motion

const Multiple = () => {
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
                className="col-12 col-lg-6 pe-lg-5 bg-light rounded-4"
              >
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={mul}
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
                    Invest
                  </h3>
                  <span
                    className="fw-light"
                    style={{
                      color: "#202020",
                      fontSize: "44px",
                      lineHeight: 1,
                      fontStyle: "italic",
                      //   maxWidth: window.innerWidth > 562 ? "00px" : "100%",
                    }}
                  >
                    In multiple stocks more easily
                  </span>
                  <div className="mt-3 fs-16">
                    <p
                      style={{
                        color: "#6c757d",
                        lineHeight: 1.5,
                        maxWidth: window.innerWidth > 562 ? "400px" : "100%",
                      }}
                    >
                      Decide how much to invest, <br /> and we'll split your
                      deposit into multiple stocks and <br />
                      Companies you don’t know you know <br />
                      Companies you know you don’t know
                    </p>{" "}
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

export default Multiple;
