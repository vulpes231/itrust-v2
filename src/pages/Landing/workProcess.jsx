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
          // className="px-5 px-lg-4 py-5"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
            padding: window.innerWidth >= 562 ? "0px" : "0px 30px",
          }}
        >
          <div
            className="row rounded-4 p-3 p-lg-5"
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
                  maxWidth: window.innerWidth >= 562 ? "420px" : "100%",
                  fontSize: window.innerWidth >= 562 ? "40px" : "24px",
                  fontWeight: 800,
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
                className="btn bg-white mt-3 fw-bold"
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
