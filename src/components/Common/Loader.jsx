import React from "react";
import { Spinner } from "reactstrap";

const Loader = () => {
  return (
    <React.Fragment>
      <div className="d-flex align-items-center justify-content-center mx-2 mt-2 position-absolute w-100 h-100">
        <Spinner color="primary" size={"md"}></Spinner>
      </div>
    </React.Fragment>
  );
};

export default Loader;
