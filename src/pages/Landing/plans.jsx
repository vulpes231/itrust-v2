import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { fund, gift, reg } from "../../assets";
import { getBodySize, getSize } from "../../constants";
import { motion } from "framer-motion";
import { fadeUp } from "../../constants/variants";

// motion

const Plans = () => {
  const steps = [
    {
      id: 1,
      title: "Sign Up",
      info: "Create an account to get started with us, submit verifiable informations for swift verification.",
      img: reg,
    },
    {
      id: 2,
      title: "Fund",
      info: "Choose you preferred payment method such as bank transfer or cryptocurrency to add cash to your account",
      img: fund,
    },
    {
      id: 3,
      title: "Buy Stocks/Crypto",
      info: "Choose you preferred payment method such as bank transfer or cryptocurrency to add cash to your account.",
      img: gift,
    },
  ];
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
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.3,
            }}
          >
            <Row className="justify-content-center">
              <Col lg={8}>
                <div className="text-center mb-5">
                  <h3 className="mb-3 fw-bold">
                    Get Started in Just Few Minutes
                  </h3>
                  <p className="text-muted mb-4">
                    Has a variety of features that make it the best place to
                    start trading
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.3,
            }}
          >
            <Row className="gy-4">
              {steps.map((st) => {
                return (
                  <Col key={st.id} lg={4}>
                    <Card className="mb-0 p-4 rounded-4 d-flex flex-column align-items-center justify-content-center">
                      <img src={st.img} alt="" width={150} />
                      <h3
                        className="fw-bolder mb-3 fs-18"
                        style={{
                          color: "#202020",
                          // fontSize: "2rem",
                        }}
                      >
                        {st.title}
                      </h3>
                      <p
                        className="mb-0 text-center fs-15"
                        style={{
                          color: "#6c757d",
                          lineHeight: 1.8,
                          // fontSize: "1.1rem",
                        }}
                      >
                        {st.info}
                      </p>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </motion.div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Plans;
