import React from "react";
import { Col, Container, Row } from "reactstrap";
import { getBodySize } from "../../constants";
import { motion } from "framer-motion";
import { inny } from "../../assets";

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
          <div className="row bg-secondary-subtle rounded-4 p-5">
            <div className="col-12 col-lg-6">
              <h2
                style={{
                  fontSize: window.innerWidth >= 560 ? "43px" : "30px",
                  fontWeight: "bolder",
                  lineHeight: "1",
                }}
              >
                Join a new generation of investors
              </h2>
              <button
                style={{
                  width: "155px",
                  height: "46px",
                }}
                className="btn btn-secondary pt-2"
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
