import React from "react";
import { getBodySize } from "../../../constants";
import { Container } from "reactstrap";
import { about, rad } from "../../../assets";
import { motion } from "framer-motion";
import { slideLeft, slideRight } from "../../../constants/variants";

const Radical = () => {
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
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className="col-12 col-lg-6"
            >
              <img
                src={rad}
                alt=""
                loading="lazy"
                className="img-fluid"
                style={{ maxWidth: window.innerWidth > 562 ? "390px" : "100%" }}
              />
            </motion.div>
            <motion.div
              className="col-12 col-lg-6 "
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
            >
              <p className="text-uppercase fw-bold text-secondary">
                – Radical Customer Focus
              </p>
              <h3
                className="fw-bold mb-3"
                style={{
                  color: "black",
                  fontSize: "32px",
                  maxWidth: window.innerWidth > 562 ? "450px" : "100%",
                }}
              >
                We exist to make our customers happy
              </h3>
              <p
                className="fs-16 text-dark"
                style={{ maxWidth: window.innerWidth > 562 ? "450px" : "100%" }}
              >
                From the early days of Itrust, we have prioritized getting
                direct customer feedback on what we were building. Talking to
                our customers forms the kernel of the product development
                process we have today. We listen with empathy, ask questions,
                and critically evaluate our work by how valuable our customers
                find it.
              </p>
              <p
                className="fs-16 text-dark"
                style={{ maxWidth: window.innerWidth > 562 ? "450px" : "100%" }}
              >
                We never stop asking how we can make our product better, and we
                never settle for ‘good enough’. We listen to our colleagues, and
                we start from a place of believing they are capable and
                well-intentioned
              </p>
              <p
                className="fs-16 text-dark"
                style={{ maxWidth: window.innerWidth > 562 ? "450px" : "100%" }}
              >
                We delight our customers and take pride in our work. Otherwise,
                why even be here?
              </p>
            </motion.div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Radical;
