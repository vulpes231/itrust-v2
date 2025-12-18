import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";

const TrxCrumb = ({ title, handleMove }) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <button
              onClick={handleMove}
              className="mb-sm-0 btn d-flex align-items-center gap-2"
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#495057",
                textTransform: "uppercase",
              }}
            >
              <FaArrowLeft /> {title}
            </button>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TrxCrumb;
