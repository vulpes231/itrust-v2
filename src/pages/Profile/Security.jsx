import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Label,
  Spinner,
} from "reactstrap";
import EditPassword from "./Updates/EditPassword";

import { formatDistanceToNow } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { updateTwoFactor } from "../../services/user/user";
import SuccessToast from "../../components/Common/SuccessToast";
import ErrorToast from "../../components/Common/ErrorToast";

const Security = ({ user }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [error, setError] = useState("");

  const twoFactorMutation = useMutation({
    mutationFn: updateTwoFactor,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    twoFactorMutation.mutate();
  };

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(tmt);
    }
  }, [error]);
  return (
    <Card>
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between">
          <h5>Security</h5>
        </div>
      </CardHeader>
      <CardBody className="d-flex flex-column gap-4 p-4">
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-1">
              <h6 className="text-capitalize">Reset Password</h6>
              <span style={{ color: "#878A99" }}>
                {user?.credentials?.passUpdatedAt
                  ? `Last changed ${formatDistanceToNow(
                      new Date(user.credentials.passUpdatedAt),
                      { addSuffix: true },
                    )}`
                  : null}
              </span>
            </div>
            <div className="pr-2">
              {!showPasswordForm && (
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(true)}
                  className="btn btn-primary"
                >
                  Reset Password
                </button>
              )}
            </div>
          </Col>
        </Row>
        {showPasswordForm && (
          <EditPassword onClose={() => setShowPasswordForm(false)} />
        )}
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-1">
              <h6 className="text-capitalize">Two factor authentication</h6>
              <span style={{ color: "#878A99" }}>
                Two-factor authentication is an enhanced security measure. Once
                enabled, you'll be required to <br /> enter a code from your
                email whenever you login.
              </span>
            </div>
            <div className="pr-2">
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary d-flex align-items-center"
                disabled={twoFactorMutation.isPending}
              >
                {twoFactorMutation.isPending && <Spinner size={"sm"} />}
                {user?.accountStatus?.twoFaActivated
                  ? "Disable"
                  : "Enable"}{" "}
                Two-Factor Authentication
              </button>
            </div>
          </Col>
        </Row>
      </CardBody>
      {twoFactorMutation.isSuccess && (
        <SuccessToast
          successMsg={"2FA Updated."}
          onClose={() => twoFactorMutation.reset()}
        />
      )}
      {error && <ErrorToast errorMsg={error} onClose={() => setError("")} />}
    </Card>
  );
};

export default Security;
