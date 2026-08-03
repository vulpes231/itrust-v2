import React from "react";
import { getBodySize } from "../../../constants";
import { Container } from "reactstrap";

const Aboutus = () => {
  return (
    <React.Fragment>
      <section className="section">
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="d-flex flex-column gap-3 align-items-center justify-content-center mt-5">
            <h3
              style={{
                color: "#202020",
                maxWidth: window.innerWidth >= 992 ? "520px" : "70%",
                fontSize: window.innerWidth >= 562 ? "46px" : "28px",
                fontWeight: 900,
              }}
            >
              About Us{" "}
            </h3>
            <p
              style={{
                maxWidth: window.innerWidth > 562 ? "55%" : "100%",
                fontSize: window.innerWidth >= 562 ? "24px" : "18px",
                fontWeight: window.innerWidth >= 562 ? 300 : 400,
                color: "#20202099",
              }}
              className="text-center"
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
