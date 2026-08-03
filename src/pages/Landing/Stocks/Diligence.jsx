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
          <div className="row mt-5 align-items-center g-4 g-lg-5 p-2 p-lg-0">
            <motion.div
              className="col-12 col-lg-6 order-2 order-lg-1"
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
            >
              <div className="ps-lg-5">
                <div className="d-flex gap-1">
                  <div>
                    <h3
                      style={{
                        color: "#202020",
                        fontSize: window.innerWidth >= 562 ? "48px" : "28px",
                        maxWidth: window.innerWidth >= 562 ? "520px" : "100%",
                        fontWeight: 900,
                        lineHeight: 1,
                      }}
                    >
                      Due Diligence
                    </h3>
                    <p
                      style={{
                        fontSize: window.innerWidth >= 562 ? "32px" : "22px",
                        maxWidth: window.innerWidth >= 562 ? "520px" : "90%",
                        fontWeight: 300,
                        fontStyle: "italic",
                        lineHeight: 1,
                      }}
                    >
                      Done for You
                    </p>

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
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className="col-12 col-lg-6 order-1 order-lg-2 pe-lg-5 "
            >
              <div className="px-3">
                <div
                  style={{ background: "brown" }}
                  className="d-flex align-items-center justify-content-center rounded-4"
                >
                  <img
                    src={dil}
                    alt="hero-img"
                    className="img-fluid"
                    style={{
                      maxWidth: window.innerWidth > 562 ? "400px" : "100%",
                      height: "350px",
                      backgroundSize: "fit",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Diligence;
