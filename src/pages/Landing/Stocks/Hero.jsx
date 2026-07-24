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
          <div>
            <img src={stock} className="img-fluid" alt="" />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Hero;
