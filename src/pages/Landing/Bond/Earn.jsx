import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { earn, fund, gift, reg, smart } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "../../../constants/variants";

// motion

const Earn = () => {
  return (
    <React.Fragment>
      <section className="section bg-light-subtle mt-5 " id="plans">
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
              <div className="col-12 col-lg-6 pe-lg-5">
                <div className="mb-5">
                  <h3
                    className="fw-bold mb-3"
                    style={{
                      color: "#202020",
                      fontSize: "2rem",
                    }}
                  >
                    Earn more on your extra cash with zero state taxes.
                  </h3>
                  <p
                    style={{
                      color: "#6c757d",
                      lineHeight: 1.8,
                      // fontSize: "1.1rem",
                    }}
                    className="fs-16"
                  >
                    A ladder of US Treasuries can help you earn more — and keep
                    more — than most savings accounts and some CDs. Since
                    Treasuries are exempt from state and local income taxes, you
                    can take home more interest on money you may be saving for
                    future expenses. Just choose how long you want to invest,
                    when you want your funds back — and we’ll handle the rest.
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-6 pe-lg-5">
                <motion.img
                  src={earn}
                  alt="hero-img"
                  className="img-fluid"
                  variants={slideRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: false,
                    amount: 0.3,
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Earn;
