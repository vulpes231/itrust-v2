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
      <section className="section bg-light " id="plans">
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div>
            <div className="row mt-2 align-items-center g-3 g-lg-5">
              <div className="col-12 col-lg-6 order-2 order-lg-1 pe-lg-5">
                <div className="">
                  <h3
                    className="fw-bold mb-3"
                    style={{
                      color: "#202020",
                      fontSize: window.innerWidth >= 562 ? "44px" : "24px",
                      maxWidth: window.innerWidth >= 562 ? "520px" : "100%",
                      fontWeight: 900,
                    }}
                  >
                    Earn more on your extra cash with zero state taxes.
                  </h3>
                  <p
                    style={{
                      color: "#6c757d",
                      lineHeight: 1.8,
                      // fontSize: "1.1rem",
                      maxWidth: window.innerWidth > 562 ? "450px" : "100%",
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
              <div className="col-12 col-lg-6 pe-lg-5 order-1 order-lg-2">
                <div className="overflow-hidden">
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
                    style={{
                      maxWidth: window.innerWidth > 562 ? "500px" : "100%",
                      height: "auto",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Earn;
