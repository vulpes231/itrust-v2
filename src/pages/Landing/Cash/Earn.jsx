import React, { useState } from "react";

import { Col, Container, Row } from "reactstrap";
import { automated, cashier, hero2 } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight } from "../../../constants/variants";
import { MdOutlineCancel } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Earn = () => {
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
            <div className="overflow-hiden">
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
                        className="fw-bold mb-3 text-center text-lg-left"
                        style={{
                          color: "#202020",
                          fontSize: "44px",
                          lineHeight: "1",
                        }}
                      >
                        Earn 4.5% APY on your cash
                      </h3>
                      <span
                        style={{
                          fontStyle: "italic",
                          lineHeight: "1",
                          fontSize: "35px",
                        }}
                        className="text-center text-lg-left"
                      >
                        right until you need it.{" "}
                      </span>

                      <p
                        className="mb-0 mt-3 fs-16"
                        style={{
                          color: "#6c757d",
                          lineHeight: 1.8,
                          // fontSize: "1.1rem",
                        }}
                      >
                        Earn an industry-leading APY through partner banks with
                        free same day. Everyday withdrawals
                      </p>
                      <div className="d-flex flex-column gap-1 text-muted fw-bold mt-3">
                        <span className="d-flex align-items-center gap-2">
                          <MdOutlineCancel />
                          <small>Zero account fees</small>
                        </span>
                        <span className="d-flex align-items-center gap-2">
                          <HiOutlineBanknotes />
                          <small>
                            No minimum or maximum balance to earn 4.50% APY
                          </small>
                        </span>
                        <span className="d-flex align-items-center gap-2">
                          <BsBank />
                          <small>Up to $8M in FDIC insurance</small>
                        </span>
                      </div>
                      <div>
                        <Link
                          style={{
                            width: window.innerWidth > 562 ? "120px" : "89px",
                            height: window.innerWidth > 562 ? "44px" : "48px",
                          }}
                          className="btn btn-secondary fw-bold p-1 p-lg-2 d-flex align-items-center justify-content-center mt-4"
                          to="/register"
                        >
                          Get Started
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="col-12 col-lg-6 pe-lg-5">
              <motion.img
                src={cashier}
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

export default Earn;
