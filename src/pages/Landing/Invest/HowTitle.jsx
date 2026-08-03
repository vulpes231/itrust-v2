import React from "react";
import { Container } from "reactstrap";
import { getSize } from "../../../constants";

const HowTitle = () => {
  return (
    <React.Fragment>
      <div className="section bg-light-subtle mt-5">
        <Container
          fluid
          className=""
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <h3
              style={{
                color: "#202020",
                fontSize: window.innerWidth >= 562 ? "44px" : "30px",
                maxWidth: window.innerWidth >= 562 ? "520px" : "90%",
                fontWeight: 900,
              }}
            >
              How to Invest
            </h3>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default HowTitle;
