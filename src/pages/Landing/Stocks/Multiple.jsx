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
      <section className="section bg-light-subtle " id="plans">
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div>
            <div className="row align-items-center g-4 g-lg-5 p-2 p-lg-0">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
                className="col-12 col-lg-6 pe-lg-5 "
              >
                <div className="px-4">
                  <div className="d-flex align-items-center justify-content-center bg-secondary-subtle rounded-4">
                    <img
                      src={mul}
                      alt="hero-img"
                      className="img-fluid"
                      style={{
                        maxWidth: window.innerWidth > 562 ? "400px" : "100%",
                        height: "350px",
                        backgroundSize: "fit",
                      }}
                    />
                  </div>
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
                <div className="">
                  <h3
                    style={{
                      color: "#202020",
                      fontSize: window.innerWidth >= 562 ? "48px" : "28px",
                      maxWidth: window.innerWidth >= 562 ? "520px" : "100%",
                      fontWeight: 900,
                      lineHeight: 1,
                    }}
                  >
                    Invest
                  </h3>
                  <p
                    style={{
                      fontSize: window.innerWidth >= 562 ? "32px" : "22px",
                      maxWidth: window.innerWidth >= 562 ? "520px" : "90%",
                      fontWeight: 300,
                      fontStyle: "italic",
                      lineHeight: 1,
                    }}
                  >
                    In multiple stocks more easily
                  </p>
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
