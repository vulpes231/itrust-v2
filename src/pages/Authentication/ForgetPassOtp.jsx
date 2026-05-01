import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, CardBody, Spinner, Alert } from "reactstrap";
import {
  confirmResetCode,
  sendResetCode,
} from "../../services/resetAccountPass";

const ForgetPassOtp = ({ handleStep }) => {
  const [disableResend, setDisableResend] = useState(true);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  const confirmPasswordResetCode = useMutation({
    mutationFn: confirmResetCode,
    onError: (err) => setError(err.message),
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.token);
      setTimeout(() => {
        handleStep(3);
      }, 2000);
    },
  });

  const resendPasswordResetCode = useMutation({
    mutationFn: sendResetCode,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setDisableResend(true);
    },
  });

  const sessionEmail = sessionStorage.getItem("email_registered");

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`digit${index + 2}-input`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`digit${index}-input`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 4) {
      setError("Enter the complete 4-digit OTP!");
      return;
    }

    // console.log(code);

    confirmPasswordResetCode.mutate({ code, email: sessionEmail });
  };

  const handleCodeResend = (e) => {
    e.preventDefault();

    if (!sessionEmail) {
      setError("Problem re-sending OTP. Try again later");
      return;
    }

    console.log(sessionEmail);

    resendPasswordResetCode.mutate({ email: sessionEmail });
  };

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(t);
    }
  }, [error]);

  useEffect(() => {
    if (resendPasswordResetCode.isSuccess) {
      const t = setTimeout(() => resendPasswordResetCode.reset(), 1000);
      return () => clearTimeout(t);
    }
  }, [error]);

  useEffect(() => {
    if (disableResend) {
      const t = setTimeout(() => setDisableResend(false), 120000);
      return () => clearTimeout(t);
    }
  }, [disableResend]);
  return (
    <Col>
      <Card className="mt-4">
        <CardBody className="p-4">
          <div className="text-center mb-4">
            <h4>Confirm Reset Code</h4>
            <p>
              Enter the 4-digit code sent to <strong>{sessionEmail}</strong>
            </p>
          </div>

          {confirmPasswordResetCode.isSuccess && (
            <Alert color="success">Email Confirmed.</Alert>
          )}
          {resendPasswordResetCode.isSuccess && (
            <Alert color="success">Code resent.</Alert>
          )}

          <Row>
            {otp.map((digit, index) => (
              <Col key={index} className="col-3">
                <input
                  id={`digit${index + 1}-input`}
                  type="text"
                  value={digit}
                  maxLength="1"
                  className="form-control text-center"
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              </Col>
            ))}
          </Row>

          {error && <p className="text-danger text-center mt-2">{error}</p>}

          <Button
            onClick={handleSubmit}
            className="w-100 mt-3"
            disabled={confirmPasswordResetCode.isPending}
          >
            {confirmPasswordResetCode.isPending && <Spinner size="sm" />}{" "}
            Confirm Code
          </Button>
        </CardBody>
      </Card>

      <div className="mt-4 text-center">
        <button
          disabled={disableResend || resendPasswordResetCode.isPending}
          onClick={handleCodeResend}
          className="btn btn-secondary"
        >
          {resendPasswordResetCode.isPending ? "Sending..." : "Resend Code"}
        </button>
      </div>
    </Col>
  );
};

export default ForgetPassOtp;
