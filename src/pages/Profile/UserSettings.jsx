import React, { useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
import DeleteAccount from "./Updates/DeleteAccount";

const UserSettings = ({ user }) => {
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  return (
    <Card>
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between">
          <h5>Settings</h5>
          <button className="btn btn-primary">Edit</button>
        </div>
      </CardHeader>
      <CardBody className="d-flex flex-column gap-4 p-4">
        <h5 className="mt-3 text-decoration-underline">Notifications:</h5>
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-1">
              <h6 className="text-capitalize">email notifications</h6>
              <span style={{ color: "#878A99" }}>
                Enable email alerts to receive notifications across various
                transactions
              </span>
            </div>
            <span className="pr-2">
              <FaToggleOff size={26} />
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-1">
              <h6 className="text-capitalize">price alerts</h6>
              <span style={{ color: "#878A99" }}>
                Get price alert across various assets
              </span>
            </div>
            <span className="pr-2">
              <FaToggleOff size={26} />
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-1">
              <h6 className="text-capitalize">purchase notifications</h6>
              <span style={{ color: "#878A99" }}>
                Get real-time purchase alerts to track your order.
              </span>
            </div>
            <span className="pr-2">
              <FaToggleOff size={26} />
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-1">
              <h6 className="text-capitalize">device login alerts</h6>
              <span style={{ color: "#878A99" }}>
                To prevent unauthorised access, turn on “Device Login Alerts”
              </span>
            </div>
            <span className="pr-2">
              <FaToggleOff size={26} />
            </span>
          </Col>
        </Row>

        <Col className="mb-5">
          <Row>
            <Col className="d-flex align-items-center justify-content-between">
              <h6 className="mt-3 text-decoration-underline">
                Delete This Account:
              </h6>
              <div className="pr-2">
                {!showDeleteForm && (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => setShowDeleteForm(true)}
                  >
                    Delete Account
                  </button>
                )}
              </div>
            </Col>
          </Row>
          <Col>
            {" "}
            <span style={{ color: "#878A99" }}>
              Before closing your account, you must liquidate all positions,
              withdraw all funds, and settle any outstanding transactions.
              Account closure may have tax implications. Enter password to
              submit a request to close your account, You will get notification
              on the status of your request.
            </span>
          </Col>
          {showDeleteForm && (
            <DeleteAccount onClose={() => setShowDeleteForm(false)} />
          )}
        </Col>
      </CardBody>
    </Card>
  );
};

export default UserSettings;
