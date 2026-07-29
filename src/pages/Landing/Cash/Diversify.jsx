import React, { useState } from "react";

import { Col, Container, Row } from "reactstrap";
import { automated, bill, cashier, hero2, indy } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "../../../constants/variants";
import { MdOutlineCancel } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Diversify = () => {
  return (
    <React.Fragment>
      <div className="section">
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="row mt-5 align-items-center gx-3 gx-lg-5">
            <div className="overflow-hideen">
              <motion.div
                className="col-12 col-lg-6"
                variants={slideLeft}
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
                          fontSize: "2rem",
                          lineHeight: "1",
                        }}
                      >
                        Automated Diversified Index
                      </h3>

                      <p
                        className="mb-0 mt-3 fs-16"
                        style={{
                          color: "#6c757d",
                          lineHeight: 1.8,
                          // fontSize: "1.1rem",
                        }}
                      >
                        Cash Reserve lets you earn interest even during volatile
                        times. FDIC insurance covers your money up to $2 million
                        ($4 million for joint accounts) at our program banks,
                        meaning you won’t have to sacrifice security for growth.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div
              style={{ backgroundColor: "burlywood" }}
              className="col-12 col-lg-6 rounded-4 pe-lg-5"
            >
              <motion.img
                src={indy}
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
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Diversify;
