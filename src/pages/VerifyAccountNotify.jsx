import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Row } from "reactstrap";
import { getAccessToken } from "../constants";
import { getUserInfo } from "../services/user/user";
import KYCVerification from "./Kyc/KYCVerification";

const VerifyAccountNotify = () => {
  const token = getAccessToken();

  const [showKYCModal, setShowKYCModal] = useState(false);

  const { data: user } = useQuery({
    queryFn: getUserInfo,
    queryKey: ["user"],
    enabled: !!token,
  });
  return (
    <Row style={{ padding: "0 10px" }}>
      <Alert
        color="danger"
        isOpen={user?.identityVerification?.kycStatus === "not verified"}
        // toggle={onDismiss}
        style={{ display: "flex", gap: "4px" }}
      >
        To start trading, complete your profile verification and access multiple
        accounts and tools to help you manage your money.
        <button
          onClick={() => setShowKYCModal(true)}
          style={{
            textDecoration: "underline",
            color: "inherit",
            fontWeight: "500",
            backgroundColor: "transparent",
            border: "none",
          }}
          // to={"/verifyaccount"}
        >
          Verify your account
        </button>
      </Alert>
      <Alert
        color="warning"
        isOpen={user?.identityVerification?.kycStatus === "pending"}
        // toggle={onDismiss}
        style={{ display: "flex", gap: "2px" }}
      >
        Verification request submitted and awaiting review.
      </Alert>
      {showKYCModal && (
        <KYCVerification
          isKycVerification={showKYCModal}
          setIsKycVerification={setShowKYCModal}
        />
      )}
    </Row>
  );
};

export default VerifyAccountNotify;
