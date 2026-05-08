import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, CardBody, Spinner, Alert } from "reactstrap";
import {
  confirmResetCode,
  sendResetCode,
} from "../../services/resetAccountPass";
import { logo } from "../../assets";
import { Link } from "react-router-dom";

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
          <div className="text-center mt-2 d-flex flex-column gap-4 align-items-center justify-content-center">
            <div>
              <Link to="/" className="d-inline-block auth-logo">
                <img src={logo} alt="" height="36" width={"112"} />
              </Link>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h5 className="text-primary">Confirm Reset Password Code</h5>
              <p className="text-muted">
                {" "}
                Enter the 4-digit code sent to <strong>{sessionEmail}</strong>
              </p>
            </div>
          </div>

          {confirmPasswordResetCode.isSuccess && (
            <Alert color="success">Email Confirmed.</Alert>
          )}
          {resendPasswordResetCode.isSuccess && (
            <Alert color="success">Code resent.</Alert>
          )}

          <Row className="mt-4">
            {otp.map((digit, index) => (
              <Col key={index} className="col-3">
                <input
                  id={`digit${index + 1}-input`}
                  type="text"
                  value={digit}
                  maxLength="1"
                  className="form-control text-center border-0 bg-light"
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
            Confirm
          </Button>
        </CardBody>
      </Card>

      <div className="mt-4 text-center d-flex align-items-center justify-content-center">
        <span>Didn't receive a code?</span>{" "}
        <button
          disabled={disableResend || resendPasswordResetCode.isPending}
          onClick={handleCodeResend}
          className="btn text-secondary"
          style={{
            background: "transparent",
            border: "none",
            textDecoration: "underline",
          }}
        >
          {resendPasswordResetCode.isPending ? "Sending..." : "Resend Code"}
        </button>
      </div>
    </Col>
  );
};

export default ForgetPassOtp;
