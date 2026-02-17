import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Row } from "reactstrap";
import { getAccessToken } from "../constants";
import { getUserInfo } from "../services/user/user";

const VerifyAccountNotify = () => {
  const token = getAccessToken();

  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

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
        <Link
          style={{
            textDecoration: "underline",
            color: "inherit",
            fontWeight: "500",
          }}
          to={"/verifyaccount"}
        >
          Verify your account
        </Link>
      </Alert>
      <Alert
        color="warning"
        isOpen={user?.identityVerification?.kycStatus === "pending"}
        // toggle={onDismiss}
        style={{ display: "flex", gap: "2px" }}
      >
        Verification request submitted and awaiting review.
      </Alert>
    </Row>
  );
};

export default VerifyAccountNotify;
