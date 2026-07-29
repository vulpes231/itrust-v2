import React, { useState } from "react";

import { Col, Container, Row } from "reactstrap";
import { hero2 } from "../../assets";
import { getBodySize, getSize } from "../../constants";
import { motion } from "framer-motion";
import { imageVariant, textVariant } from "../../constants/variants";

const Client = () => {
  const items = [
    {
      id: 1,
      num: "01",
      title: "Choose how you want to invest",
      info: "Pick one of our diversified portfolios that interests you. They’re built by experts using low-cost exchange-traded funds.",
    },
    {
      id: 2,
      num: "02",
      title: "We put your money to work",
      info: "Automated trading, rebalancing, and dividend reinvestment, we put our technology behind every dollar you invest.",
    },
    {
      id: 3,
      num: "03",
      title: "Investing for you, Managed by us",
      info: "Everyone’s financial situation is different. Get personal recommendations based on what you want to accomplish, whether that’s retirement or simply building wealth.",
    },
  ];
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
          <div className="row mt-5 align-items-center">
            <div style={{ overflowX: "hidden" }}>
              <motion.div
                className="col-12 col-lg-6 order-1 order-lg-2"
                variants={textVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
              >
                <div className="ps-lg-5">
                  <h1 className="fw-bolder mb-5">A Smart Way to Invest</h1>

                  {items.map((it) => (
                    <div
                      key={it.id}
                      className="d-flex gap-1 pb-4 mb-4 border-bottom"
                    >
                      <div
                        className="fw-bold fs-20"
                        style={{
                          color: "#cfd7ff",
                          // fontSize: "2rem",
                          minWidth: "50px",
                        }}
                      >
                        {it.num}
                      </div>

                      <div>
                        <h3
                          className="fw-bold mb-3"
                          style={{
                            color: "#202020",
                            // fontSize: "2rem",
                          }}
                        >
                          {it.title}
                        </h3>

                        <p
                          className="mb-0"
                          style={{
                            color: "#6c757d",
                            lineHeight: 1.8,
                            // fontSize: "1.1rem",
                          }}
                        >
                          {it.info}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="col-12 col-lg-6 order-2 order-lg-1"
              variants={imageVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
            >
              <img src={hero2} alt="hero-img" className="img-fluid" />
            </motion.div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Client;
