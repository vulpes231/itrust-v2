import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";

const AssetManager = ({ activeTab, handleChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Card className="p-0 ">
      <CardHeader>
        <Col className="d-flex align-items-center justify-content-between">
          <h4 className="">Search</h4>
          <span className="d-flex align-items-center gap-2">
            <button
              type="button"
              onClick={() => handleChange("asset")}
              className={`btn text-capitalize ${
                activeTab === "asset"
                  ? "btn-secondary"
                  : "bg-secondary-subtle text-secondary"
              }`}
            >
              assets
            </button>
            <button
              type="button"
              onClick={() => handleChange("trade")}
              className={`btn text-capitalize ${
                activeTab === "trade"
                  ? "btn-secondary"
                  : "bg-secondary-subtle text-secondary"
              }`}
            >
              trade now
            </button>
          </span>
        </Col>
      </CardHeader>
      <CardBody>
        <Col>
          <Input type="text" placeholder="Search Asset..." />
        </Col>
      </CardBody>
    </Card>
  );
};

export default AssetManager;
