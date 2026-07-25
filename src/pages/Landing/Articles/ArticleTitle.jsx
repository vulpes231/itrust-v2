import React from "react";
import { Container } from "reactstrap";
import { getSize } from "../../../constants";

const ArticleTitle = () => {
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
            <h3 style={{ fontWeight: "bolder", fontSize: "40px" }}>Articles</h3>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ArticleTitle;
