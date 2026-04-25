import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Button,
  Spinner,
} from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { logo } from "../../assets";

import { useMutation } from "@tanstack/react-query";
import { sendEmailVerificationCode } from "../../services/otp/requestOtp";
import { verifyEmail } from "../../services/user/verification";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import { Loader } from "feather-icons-react";

const VerifyEmail = () => {
  document.title = "Verify Your Email - Itrust Investments";

  const [disableResend, setDisableResend] = useState(true);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  const sessionEmail = sessionStorage.getItem("email_registered");
  const savedUser = JSON.parse(sessionStorage.getItem("user"));

  const accountStatus = savedUser?.accountStatus;

  const resendMutation = useMutation({
    mutationFn: sendEmailVerificationCode,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setDisableResend(true);
    },
  });

  const verifyMutation = useMutation({
    mutationFn: verifyEmail,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      window.location.href = accountStatus?.isPersonalComplete
        ? "/dashboard"
        : "/contact";
    },
  });

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
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
      setError("Enter the complete 6-digit OTP!");
      return;
    }

    console.log(code);

    verifyMutation.mutate({ code });
  };

  const handleCodeResend = (e) => {
    e.preventDefault();

    if (!sessionEmail) {
      setError("Problem re-sending OTP. Try again later");
      return;
    }

    console.log(sessionEmail);

    resendMutation.mutate({ email: sessionEmail });
  };

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(""), 3000);
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
    <div className="auth-page-wrapper">
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <Link to="/dashboard" className="auth-logo">
                    <img src={logo} alt="" height="20" />
                  </Link>
                  <p className="mt-3 fs-16 fw-semibold">
                    Verify Your Email Address
                  </p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mb-4">
                      <h4>Verify Your Email</h4>
                      <p>
                        Enter the 4-digit code sent to{" "}
                        <strong>{sessionEmail}</strong>
                      </p>
                    </div>

                    <Row>
                      {otp.map((digit, index) => (
                        <Col key={index} className="col-3">
                          <input
                            id={`digit${index + 1}-input`}
                            type="text"
                            value={digit}
                            maxLength="1"
                            className="form-control text-center"
                            onChange={(e) =>
                              handleChange(e.target.value, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                          />
                        </Col>
                      ))}
                    </Row>

                    {error && (
                      <p className="text-danger text-center mt-2">{error}</p>
                    )}

                    <Button
                      onClick={handleSubmit}
                      className="w-100 mt-3"
                      disabled={verifyMutation.isPending}
                    >
                      {verifyMutation.isPending && <Spinner size="sm" />}{" "}
                      Confirm Email
                    </Button>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center">
                  <button
                    disabled={disableResend || resendMutation.isPending}
                    onClick={handleCodeResend}
                    className="btn btn-secondary"
                  >
                    {resendMutation.isPending ? "Sending..." : "Resend Code"}
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
      {error && <ErrorToast errorMsg={error} onClose={() => setError("")} />}
      {verifyMutation.isSuccess && (
        <SuccessToast
          successMsg={"Email Verified"}
          onClose={() => verifyMutation.reset()}
        />
      )}
      {resendMutation.isPending && <Loader />}
    </div>
  );
};

export default VerifyEmail;
