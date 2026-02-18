import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { MdOutlineCancel, MdCheckCircleOutline } from "react-icons/md";

const ConfigureInvesting = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between">
          <h5>Investing</h5>
          <button className="btn btn-primary">Edit</button>
        </div>
      </CardHeader>
      <CardBody className="d-flex flex-column gap-3 p-4">
        <Row>
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>experience</span>
            <h6>{user?.professionalInfo?.experience}</h6>
          </Col>
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>risk tolerance</span>
            <h6>Not Set</h6>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>objectives</span>
            <h6>not set</h6>
          </Col>
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>retirement time horizon</span>
            <h6>not set</h6>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>
              DRIP (dividend Reinvestment plan)
            </span>
            <span
              style={{ width: "100px", borderRadius: "5px" }}
              className={`${
                user?.settings?.trading?.isDripEnabled
                  ? "bg-success-subtle text-success"
                  : "bg-danger-subtle text-danger"
              } d-flex align-items-center justify-content-center p-1 fs-12`}
            >
              {user?.settings?.trading?.isDripEnabled ? (
                <span className="d-flex align-items-center gap-2">
                  <MdCheckCircleOutline />
                  Active
                </span>
              ) : (
                <span className="d-flex align-items-center gap-2">
                  <MdOutlineCancel />
                  Disabled
                </span>
              )}
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-1">
              <h6 className="text-capitalize">
                dividend Reinvestment plan (DRIP)
              </h6>
              <span style={{ color: "#878A99" }}>
                Automate your dividends to be automatically reinvested in your
                account.
              </span>
            </div>
            <span className="pr-2">
              {user?.settings?.trading?.isDripEnabled ? (
                <FaToggleOn size={26} />
              ) : (
                <FaToggleOff size={26} />
              )}
            </span>
          </Col>
        </Row>
        <h5 className="mt-3 text-decoration-underline">
          Individual Brokerage:
        </h5>
        <Row>
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>trading status</span>
            <span
              style={{ width: "100px", borderRadius: "5px" }}
              className={`${
                user?.accountStatus?.status === "active"
                  ? "bg-success-subtle text-success"
                  : "bg-danger-subtle text-danger"
              } d-flex align-items-center justify-content-center p-1 fs-12`}
            >
              {user?.accountStatus?.status ? (
                <span className="d-flex align-items-center gap-2">
                  <MdCheckCircleOutline />
                  Active
                </span>
              ) : (
                <span className="d-flex align-items-center gap-2">
                  <MdOutlineCancel />
                  Disabled
                </span>
              )}
            </span>
          </Col>
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>option trading</span>

            <span
              style={{ width: "100px", borderRadius: "5px" }}
              className={`${
                user?.settings?.trading?.isOptionsEnabled
                  ? "bg-success-subtle text-success"
                  : "bg-danger-subtle text-danger"
              } d-flex align-items-center justify-content-center p-1 fs-12`}
            >
              {user?.settings?.trading?.isOptionsEnabled ? (
                <span className="d-flex align-items-center gap-2">
                  <MdCheckCircleOutline />
                  Active
                </span>
              ) : (
                <span className="d-flex align-items-center gap-2">
                  <MdOutlineCancel />
                  Disabled
                </span>
              )}
            </span>
          </Col>
        </Row>

        <Row className="mb-2">
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>margin trading</span>
            <span
              style={{ width: "100px", borderRadius: "5px" }}
              className={`${
                user?.settings?.trading?.isDripEnabled
                  ? "bg-success-subtle text-success"
                  : "bg-danger-subtle text-danger"
              } d-flex align-items-center justify-content-center p-1 fs-12`}
            >
              {user?.settings?.trading?.isDripEnabled ? (
                <span className="d-flex align-items-center gap-2">
                  <MdCheckCircleOutline />
                  Active
                </span>
              ) : (
                <span className="d-flex align-items-center gap-2">
                  <MdOutlineCancel />
                  Disabled
                </span>
              )}
            </span>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-1">
              <h6 className="text-capitalize">margin trading</h6>
              <span style={{ color: "#878A99" }}>
                Enable margin trading for your account.
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
              <h6 className="text-capitalize">options trading</h6>
              <span style={{ color: "#878A99" }}>
                Enable options trading for your account.
              </span>
            </div>
            <span className="pr-2">
              {user?.settings?.trading?.isOptionsEnabled ? (
                <FaToggleOn size={26} />
              ) : (
                <FaToggleOff size={26} />
              )}
            </span>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ConfigureInvesting;
