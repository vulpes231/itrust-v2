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
            <motion.div
              className="col-12 col-lg-6 overflow-hidden"
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
                  <div className="d-flex flex-column align-items-center justify-content-center align-items-lg-start justify-content-lg-start">
                    <div className="d-flex flex-column align-items-center align-items-lg-start justify-content-center">
                      <h3
                        className="fw-bold mb-3 text-center text-lg-start"
                        style={{
                          color: "#202020",
                          fontSize: window.innerWidth >= 562 ? "44px" : "30px",
                          maxWidth: window.innerWidth >= 992 ? "520px" : "70%",
                          fontWeight: 900,
                        }}
                      >
                        Earn 4.5% APY on your cash
                      </h3>
                      <span
                        style={{
                          fontStyle: "italic",
                          lineHeight: "1",
                          fontSize: window.innerWidth >= 562 ? "32px" : "26px",
                        }}
                        className="text-center text-lg-left"
                      >
                        right until you need it.{" "}
                      </span>
                    </div>

                    <p
                      className="mb-0 mt-3 text-center text-lg-start"
                      style={{
                        color: "#6c757d",
                        lineHeight: 1.5,
                        fontSize: window.innerWidth >= 562 ? "20px" : "18px",
                        fontWeight: 400,
                      }}
                    >
                      Earn an industry-leading APY through partner banks with
                      free same day. Everyday withdrawals
                    </p>
                    <div className="d-flex flex-column gap-1 text-muted fw-bold mt-3 px-4 px-lg-0">
                      <span className="d-flex align-items-center gap-2">
                        <MdOutlineCancel size={20} />
                        <small className="fs-15">Zero account fees</small>
                      </span>
                      <span className="d-flex align-items-center gap-2">
                        <HiOutlineBanknotes size={20} />
                        <small className="fs-15">
                          No minimum or maximum balance to earn 4.50% APY
                        </small>
                      </span>
                      <span className="d-flex align-items-center gap-2">
                        <BsBank size={20} />
                        <small className="fs-15">
                          Up to $8M in FDIC insurance
                        </small>
                      </span>
                    </div>
                    <div>
                      <Link
                        style={{
                          height: window.innerWidth > 562 ? "49px" : "45px",
                          width: window.innerWidth > 562 ? "170px" : "128px",
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
