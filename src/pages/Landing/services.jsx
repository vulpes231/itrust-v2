import React, { useState } from "react";

import { Col, Container, Row } from "reactstrap";
import { automated, hero2 } from "../../assets";
import { getBodySize, getSize } from "../../constants";

const Services = () => {
  return (
    <React.Fragment>
      <div className="">
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="row mt-5 align-items-center gx-3 gx-lg-5">
            <div className="col-12 col-lg-6">
              <div className="ps-lg-5">
                <div className="d-flex gap-1 pb-4 mb-4">
                  <div>
                    <h3
                      className="fw-bold mb-3"
                      style={{
                        color: "#202020",
                        fontSize: "2rem",
                      }}
                    >
                      Automated, diversified{" "}
                      <br className="d-none d-lg-block" /> index investing.
                    </h3>

                    <p
                      className="mb-0"
                      style={{
                        color: "#6c757d",
                        lineHeight: 1.8,
                        // fontSize: "1.1rem",
                      }}
                    >
                      Come bears or bulls, our expert-built portfolios help you
                      stay diversified for your goals. Limit your risk, minimize
                      your taxes, and maximize your returns — all with built-in
                      automated easy-ness
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 bg-warning-subtle rounded-xl pe-lg-5">
              <img src={automated} alt="hero-img" className="img-fluid" />
            </div>
          </div>
          {/* <Row></Row> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Services;
