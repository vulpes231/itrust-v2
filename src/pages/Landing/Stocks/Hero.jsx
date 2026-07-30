import React from "react";
import { Container } from "reactstrap";
import { stock } from "../../../assets";
import { getSize } from "../../../constants";

const Hero = () => {
  return (
    <React.Fragment>
      <div>
        <Container
          fluid
          className="px-lg-4 py-5"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="d-flex flex-column flex-lg-row align-items center justify-content-center position-relative">
            <div
              style={{
                position: "absolute",
                top: window.innerWidth >= 562 ? "130px" : 0,
                left: window.innerWidth >= 562 ? "200px" : "",
              }}
            >
              <div className="text-center d-flex flex-column align-items-center justify-content-center">
                <p
                  style={{
                    lineHeight: 0.5,
                    fontWeight: 200,
                    fontStyle: "italic",
                  }}
                >
                  Find stocks you know and stocks you don't...
                </p>
                <h4 style={{ maxWidth: "220px" }}>
                  Discover stocks through investing themes & opportunities
                </h4>
              </div>
            </div>
            <img
              src={stock}
              className="img-fluid"
              alt=""
              style={{
                maxWidth: window.innerWidth >= 562 ? "550px" : "100%",
                height: "auto",
              }}
            />
            <div
              style={{
                position: window.innerWidth > 562 ? "absolute" : "initial",
                bottom: 0,
                right: window.innerWidth >= 562 ? "200px" : "",
              }}
            >
              <div className="text-center">
                <p
                  style={{
                    lineHeight: 0.5,
                    fontWeight: 200,
                    fontStyle: "italic",
                  }}
                >
                  see our latest perspectives...
                </p>
                <h4 style={{ lineHeight: 1 }}>
                  Dive in with our built-in data
                </h4>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Hero;
