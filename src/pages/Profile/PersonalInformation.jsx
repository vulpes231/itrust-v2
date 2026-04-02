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
import SuccessToast from "../../components/Common/SuccessToast";

const PersonalInformation = ({ user }) => {
  const [editPersonalModal, setEditPersonalModal] = useState(false);
  const [editEmploymentModal, setEditEmploymentModal] = useState(false);

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const tmt = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [showToast]);

  useEffect(() => {
    const shouldShow = sessionStorage.getItem("showPersonalToast");

    if (shouldShow) {
      setShowToast(true);
      sessionStorage.removeItem("showPersonalToast");
    }
  }, []);

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
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span className="" style={{ color: "#878A99" }}>
                first name
              </span>
              <h6>{user?.personalInfo?.firstName || "-"}</h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span className="" style={{ color: "#878A99" }}>
                last name
              </span>
              <h6>{user?.personalInfo?.lastName || "-"}</h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                username
              </span>
              <h6>{user?.personalInfo?.username || "-"}</h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>nationality</span>
              <h6>{user?.personalInfo?.nationality?.name || "-"}</h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>date of birth</span>
              <h6>
                {user && user.personalInfo && user.personalInfo.dob
                  ? format(user.personalInfo.dob, "MMM dd, yyyy")
                  : "-"}
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
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>employment status</span>
              <h6>{user?.employmentInfo?.status || "-"}</h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>employer</span>
              <h6>{user?.employmentInfo?.employerName || "-"}</h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>position</span>
              <h6> {user?.employmentInfo?.position || "-"}</h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>experience</span>
              <h6>
                {user?.employmentInfo?.expYears
                  ? `${user?.employmentInfo?.expYears} Years`
                  : "-"}
              </h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>annual income</span>
              <h6>{user?.employmentInfo?.annualIncome || "-"}</h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>estimated net worth</span>
              <h6>{user?.employmentInfo?.estimatedNet || "-"}</h6>
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
      {showToast && (
        <SuccessToast
          successMsg={"Personal Information Updated"}
          isOpen={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
    </Col>
  );
};

export default PersonalInformation;
