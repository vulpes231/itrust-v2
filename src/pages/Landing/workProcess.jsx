import React from "react";
import { Col, Container, Row } from "reactstrap";
import { getBodySize } from "../../constants";
import { motion } from "framer-motion";
import { inny, joinbg } from "../../assets";

motion;

const WorkProcess = () => {
  return (
    <React.Fragment>
      <section className="section">
        <Container
          fluid
          className="px-lg-4 py-5"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div
            className="row rounded-4 p-5"
            style={{
              backgroundImage: `url(${joinbg})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              // display: "inline-block",
              // padding: "10px 16px",
            }}
          >
            <div className="col-12 col-lg-6">
              <h2
                style={{
                  maxWidth: window.innerWidth >= 560 ? "400px" : "100%",
                  fontSize: window.innerWidth >= 560 ? "43px" : "30px",
                  fontWeight: 700, // instead of "bolder"
                  lineHeight: 1.2,
                }}
                className="text-white"
              >
                Join a new generation of investors
              </h2>
              <button
                style={{
                  width: "155px",
                  height: "46px",
                }}
                className="btn bg-white pt-2 fw-bold"
              >
                Get Started
              </button>
            </div>
            <div className="col-12 col-lg-6 rounded-4 pe-lg-5 ">
              <div className="d-none d-lg-flex justify-content-end">
                <img
                  src={inny}
                  alt="hero-img"
                  className="img-fluid bg-white rounded-1"
                  width={"150px"}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default WorkProcess;
