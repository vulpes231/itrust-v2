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
          <div className="d-flex align-items center justify-content-center position-relative">
            <img
              src={stock}
              className="img-fluid"
              alt=""
              style={{
                maxWidth: window.innerWidth >= 562 ? "450px" : "100%",
                height: "auto",
              }}
            />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Hero;
