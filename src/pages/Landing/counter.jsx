import React from "react";
import { Col, Container, Row } from "reactstrap";
import CountUp from "react-countup";
import { getBodySize } from "../../constants";
import { port } from "../../assets";
import { motion } from "framer-motion";
import { fadeUp, slideRight } from "../../constants/variants";

const Counter = () => {
  return (
    <React.Fragment>
      <section className="py-5 position-relative">
        <Container
          fluid
          className="px-lg-4 py-5"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="row mt-5 align-items-center gx-3 gx-lg-5">
            <div className="col-12 col-lg-6 bg-light rounded-4 pe-lg-5">
              <motion.img
                src={port}
                alt="hero-img"
                className="img-fluid"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
              />
            </div>

            <motion.div
              className="col-12 col-lg-6"
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
                      className="fw-bold mb-3 mt-4 lg-mt-0"
                      style={{
                        color: "#202020",
                        fontSize: "2rem",
                      }}
                    >
                      Looking for more? Put a team of advisors in your corner
                      with Premium.
                    </h3>

                    <p
                      className="mb-0"
                      style={{
                        color: "#6c757d",
                        lineHeight: 1.8,
                        // fontSize: "1.1rem",
                      }}
                    >
                      Get on-demand support and a tailored plan from our team of
                      financial advisors. No matter your goals or situation,
                      they’ll offer guidance so you can take every step with
                      confidence.
                    </p>
                    <div className="d-flex flex-column gap-2">
                      <small
                        style={{ fontStyle: "italic" }}
                        className="text-muted font-lighter pt-3"
                      >
                        Minimum balance required
                      </small>
                      <button
                        style={{ width: "155px", height: "40px" }}
                        className="btn btn-secondary"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Counter;
