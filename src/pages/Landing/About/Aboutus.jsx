import React from "react";
import { getBodySize } from "../../../constants";
import { Container } from "reactstrap";

const Aboutus = () => {
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
          <div className="d-flex flex-column gap-3 align-items-center justify-content-center mt-5">
            <h3
              style={{
                color: "black",
                fontSize: "44px",
                maxWidth: window.innerWidth > 562 ? "450px" : "100%",
              }}
            >
              About Us{" "}
            </h3>
            <p
              style={{ maxWidth: window.innerWidth > 562 ? "450px" : "100%" }}
              className="fs-18 text-center"
            >
              We’re on a mission to democratize finance for all. At Itrust, our
              values are in service of our customers. We strive to uphold our
              values every day.
            </p>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Aboutus;
