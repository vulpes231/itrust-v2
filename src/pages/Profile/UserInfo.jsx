import React from "react";
import { Card, Col } from "reactstrap";
import { avatar1 } from "../../assets";

const UserInfo = () => {
  return (
    <Card className="p-4 d-flex flex-column gap-3">
      <Col className="d-flex flex-column align-items-center gap-2">
        <img src={avatar1} alt="user" width={50} className="rounded-circle" />
        <span className="d-flex flex-column align-items-center justify-content-center">
          <h4 className="lh-sm">Anna Adama</h4>
          <span className="fw-light">@anneadama</span>
        </span>
      </Col>
      <Col className="d-flex flex-column gap-3">
        <h6>Complete Your Profile</h6>
        <div
          style={{
            backgroundColor: "whitesmoke",
            width: "100%",
            height: "7px",
            padding: "2px",
          }}
          className="rounded"
        >
          <div
            style={{
              backgroundColor: "red",
              width: "40%",
              height: "3px",
            }}
          />
        </div>
      </Col>
    </Card>
  );
};

export default UserInfo;
