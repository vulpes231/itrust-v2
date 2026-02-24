import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Label, Row } from "reactstrap";
import { format } from "date-fns";
import EditPersonalInfo from "./Updates/EditPersonalInfo";
import EditEmploymentInfo from "./Updates/EditEmploymentInfo";
import { Link } from "react-router-dom";
import VerifyCard from "./VerifyCard";
import VerifyPending from "./VerifyPending";
import Verified from "./Verified";
import Finc from "./Finc";
import { FaRegEdit } from "react-icons/fa";

const PersonalInformation = ({ user }) => {
  const [editPersonalModal, setEditPersonalModal] = useState(false);
  const [editEmploymentModal, setEditEmploymentModal] = useState(false);

  return (
    <Col>
      <Card>
        <CardHeader>
          <div className="d-flex align-items-center justify-content-between">
            <h5>Personal Information</h5>
            <button
              type="button"
              onClick={() => setEditPersonalModal(true)}
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              <FaRegEdit /> Edit
            </button>
          </div>
        </CardHeader>
        <CardBody className="d-flex flex-column gap-3 p-4">
          <Row>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                first name
              </span>
              <h6>{capitalize(user?.name?.firstName)}</h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                last name
              </span>
              <h6>{capitalize(user?.name?.lastName)}</h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                username
              </span>
              <h6>{user?.credentials?.username}</h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                nationality
              </span>
              <h6>{capitalize(user?.locationDetails?.nationality?.name)}</h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                date of birth
              </span>
              <h6>
                {user
                  ? format(user?.personalDetails?.dob, "MMM dd, yyyy")
                  : null}
              </h6>
            </Col>
          </Row>
          {user?.identityVerification?.kycStatus === "not verified" ? (
            <VerifyCard />
          ) : user?.identityVerification?.kycStatus === "pending" ? (
            <VerifyPending />
          ) : user?.identityVerification?.kycStatus === "verified" ? (
            <Verified />
          ) : null}
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <div className="d-flex align-items-center justify-content-between">
            <h5>Employment &amp; Finances</h5>
            <button
              className="btn btn-primary d-flex align-items-center gap-2"
              type="button"
              onClick={() => setEditEmploymentModal(true)}
            >
              <FaRegEdit /> Edit
            </button>
          </div>
        </CardHeader>
        <CardBody className="d-flex flex-column gap-3 p-4">
          <Row>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                employment status
              </span>
              <h6>
                {capitalize(user?.professionalInfo?.employment) || "Not Set"}
              </h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                employer
              </span>
              <h6>
                {capitalize(
                  user?.professionalInfo?.employmentInfo?.employerName
                ) || "Not Set"}
              </h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                position
              </span>
              <h6>
                {" "}
                {capitalize(user?.professionalInfo?.employmentInfo?.position) ||
                  "Not Set"}
              </h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                experience
              </span>
              <h6>
                {user?.professionalInfo?.employmentInfo?.expYears
                  ? `${capitalize(
                      user?.professionalInfo?.employmentInfo?.expYears
                    )} Years`
                  : "Not Set"}
              </h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                annual income
              </span>
              <h6>
                {user?.professionalInfo?.employmentInfo?.annualIncome ||
                  "Not Set"}
              </h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                estimated net worth
              </span>
              <h6>
                {user?.professionalInfo?.employmentInfo?.estimatedNet ||
                  "Not Set"}
              </h6>
            </Col>
          </Row>
          <Finc />
        </CardBody>
      </Card>
      {editPersonalModal && (
        <EditPersonalInfo
          isOpen={editPersonalModal}
          handleToggle={() => setEditPersonalModal(false)}
          user={user}
        />
      )}
      {editEmploymentModal && (
        <EditEmploymentInfo
          isOpen={editEmploymentModal}
          handleToggle={() => setEditEmploymentModal(false)}
          user={user}
        />
      )}
    </Col>
  );
};

export default PersonalInformation;
