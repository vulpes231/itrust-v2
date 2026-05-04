import React from "react";
import { Card, Col } from "reactstrap";
import { avatar1 } from "../../assets";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const UserInfo = ({ user }) => {
  const isProfileComplete = user?.accountStatus?.isProfileComplete;
  const isEmailVerified = user?.accountStatus?.emailVerified;
  const isAddressVerified = user?.contactInfo?.status === "approved";
  const isAccountVerified =
    user?.identityVerification?.kycStatus === "approved";

  const steps = [
    { label: "Personal Information", done: isProfileComplete },
    { label: "Email Verification", done: isEmailVerified },
    { label: "Address Verification", done: isAddressVerified },
    { label: "KYC Verification", done: isAccountVerified },
  ];

  const completedSteps = steps.filter((step) => step.done).length;
  const progress = completedSteps * 25;

  const getColor = () => {
    if (progress <= 25) return "#ff4d4f";
    if (progress <= 50) return "#faad14";
    if (progress <= 75) return "#1890ff";
    return "#52c41a";
  };

  return (
    <Card className="p-4 d-flex flex-column gap-3">
      <Col className="d-flex flex-column align-items-center gap-2">
        <img src={avatar1} alt="user" width={50} className="rounded-circle" />
        <span className="d-flex flex-column align-items-center justify-content-center">
          <h4 className="lh-sm text-capitalize">
            {user?.personalInfo?.firstName} {user?.personalInfo?.lastName}{" "}
            {user?.identityVerification?.kycStatus === "approved" && (
              <span>
                <RiVerifiedBadgeFill style={{ color: "#387CF8" }} size={16} />
              </span>
            )}
          </h4>
          <span style={{ color: "#878A99" }} className="fw-light">
            @{user?.personalInfo?.username}
          </span>
        </span>
      </Col>
      <Col className="d-flex flex-column gap-3">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="m-0 " style={{ whiteSpace: "nowrap" }}>
            Complete Your Profile
          </h6>
          <small style={{ color: "#878A99", whiteSpace: "nowrap" }}>
            {progress}%
          </small>
        </div>

        {/* Progress Bar */}
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
              backgroundColor: "#F17171",
              width: `${progress}%`,
              height: "3px",
              transition: "all 0.5s ease-in-out",
            }}
          />
        </div>
      </Col>
    </Card>
  );
};

export default UserInfo;
