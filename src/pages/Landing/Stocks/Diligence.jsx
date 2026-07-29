import React, { useState } from "react";

import { Col, Container, Row } from "reactstrap";
import { automated, bill, cashier, dil, hero2, indy } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "../../../constants/variants";
import { MdOutlineCancel } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Diligence = () => {
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
            <div className="overflow-hidden">
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
                          fontSize: "44px",
                          lineHeight: 1,
                        }}
                      >
                        Due Diligence
                      </h3>
                      <span
                        className="fw-light"
                        style={{
                          color: "#202020",
                          fontSize: "44px",
                          lineHeight: 1,
                          fontStyle: "italic",
                        }}
                      >
                        Done for You
                      </span>

                      <p
                        className="mb-0 mt-3 fs-16"
                        style={{
                          color: "#6c757d",
                          lineHeight: 1.8,
                          maxWidth: window.innerWidth > 562 ? "370px" : "100%",
                        }}
                      >
                        1,500+ stocks selected by our research team Learn more
                        about each stock in a collection Spend less time
                        micromanaging your investments
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              style={{ background: "brown" }}
              className="col-12 col-lg-6 pe-lg-5 rounded-4"
            >
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={dil}
                  alt="hero-img"
                  className="img-fluid"
                  style={{
                    maxWidth: window.innerWidth > 562 ? "370px" : "100%",
                    height: "auto",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Diligence;
