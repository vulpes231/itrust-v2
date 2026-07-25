import React from "react";
import { getBodySize } from "../../../constants";
import { Container } from "reactstrap";
import { about, pri, rad } from "../../../assets";
import { motion } from "framer-motion";
import { slideLeft, slideRight } from "../../../constants/variants";

const Principle = () => {
  // motion
  return (
    <React.Fragment>
      <div className="">
        <Container
          fluid
          className="px-lg-4 py-5"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="row">
            <motion.div
              className="col-12 col-lg-6 "
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
            >
              <p className="text-uppercase fw-bold text-secondary">
                – First-Principles Thinking
              </p>
              <h3
                className="fw-bold mb-3"
                style={{
                  color: "black",
                  fontSize: "32px",
                  maxWidth: window.innerWidth > 562 ? "450px" : "100%",
                }}
              >
                We make bold bets and challenge the status quo
              </h3>
              <p
                className="fs-16 text-dark"
                style={{ maxWidth: window.innerWidth > 562 ? "450px" : "100%" }}
              >
                Our foundation is in art, science, and pure mathematics, and we
                have a deep appreciation for the scientific process. We develop
                hypotheses and design experiments to test them. We reduce
                complex problems to their constituent bits.
              </p>
            </motion.div>
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className="col-12 col-lg-6"
            >
              <img
                src={pri}
                alt=""
                loading="lazy"
                className="img-fluid"
                style={{ maxWidth: window.innerWidth > 562 ? "390px" : "100%" }}
              />
            </motion.div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Principle;
