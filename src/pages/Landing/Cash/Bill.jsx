import React, { useState } from "react";

import { Col, Container, Row } from "reactstrap";
import { automated, bill, cashier, hero2 } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "../../../constants/variants";
import { MdOutlineCancel } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Bill = () => {
  return (
    <React.Fragment>
      <div className="section">
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="row mt-5 align-items-center g-3 g-lg-5 p-2 p-lg-0">
            <div className="col-12 col-lg-6 order-2 order-lg-1 bg-light p-5 rounded-4 pe-lg-5">
              <motion.img
                src={bill}
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
              className="col-12 col-lg-6 order-1 order-lg-2 "
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
                      className="fw-bold mb-3"
                      style={{
                        color: "#202020",
                        fontSize: window.innerWidth >= 562 ? "44px" : "30px",
                        maxWidth: window.innerWidth >= 562 ? "520px" : "80%",
                        fontWeight: 900,
                      }}
                    >
                      Optimize your cash today.
                    </h3>
                    <p
                      style={{
                        fontStyle: "italic",
                        lineHeight: "1",
                        fontSize: window.innerWidth >= 562 ? "35px" : "26px",
                        maxWidth: window.innerWidth >= 562 ? "520px" : "70%",
                      }}
                    >
                      Start saving for tomorrow.
                    </p>

                    <p
                      className="mb-0 mt-3 fs-16"
                      style={{
                        color: "#6c757d",
                        lineHeight: 1.8,
                        // fontSize: "1.1rem",
                      }}
                    >
                      Set money aside for what matters to you. Create multiple
                      savings goals and use our automated tools to help you
                      achieve them.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Bill;
