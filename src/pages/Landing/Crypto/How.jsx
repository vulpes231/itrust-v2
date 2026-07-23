import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { fund, gift, reg } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp } from "../../../constants/variants";

// motion

const How = () => {
  const steps = [
    {
      id: 1,
      title: "Crypto made convenient",
      info: "Investing in crypto ETFs lets you tap the market without the hassle of direct ownership or trading.",
      img: reg,
    },
    {
      id: 2,
      title: "Automated rebalancing",
      info: "We automatically adjust your portfolio based on your account balance and market movements to help manage risk.",
      img: fund,
    },
    {
      id: 3,
      title: "Diverse Investing",
      info: "Crypto can provide diversification as part of your larger investing strategy at Itrust Investment.",
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
                    Why Invest in crypto with us?
                  </h3>
                  <p className="text-muted mb-4">
                    Get easy exposure to the two largest and widely traded
                    cryptocurrencies, Bitcoin and Ethereum, with the convenience
                    and familiarity of exchange-traded funds (ETFs).
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

export default How;
