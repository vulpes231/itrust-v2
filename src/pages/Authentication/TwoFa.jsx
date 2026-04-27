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
import { sendAuthCode } from "../../services/otp/requestOtp";
import { verifyEmail, verifyTwoFa } from "../../services/user/verification";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import { Loader } from "feather-icons-react";

const TwoFa = () => {
  document.title = "Aunthenticate Login - Itrust Investments";

  const [disableResend, setDisableResend] = useState(true);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  const sessionEmail = sessionStorage.getItem("email_registered");

  const resendMutation = useMutation({
    mutationFn: sendAuthCode,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setDisableResend(true);
    },
  });

  const verifyTwoFaMutation = useMutation({
    mutationFn: verifyTwoFa,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      sessionStorage.removeItem("email_registered");
      window.location.href = "/dashboard";
    },
  });

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

    // console.log("clicked", sessionEmail, code);

    if (!sessionEmail) {
      setError("Problem re-sending OTP. Try again later");
      sessionStorage.clear();
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }

    if (code.length !== 4) {
      setError("Enter the complete 4-digit OTP!");
      return;
    }

    verifyTwoFaMutation.mutate({ email: sessionEmail, code });
  };

  const handleCodeResend = (e) => {
    e.preventDefault();

    if (!sessionEmail) {
      setError("Problem re-sending OTP. Try again later");
      return;
    }

    resendMutation.mutate({ email: sessionEmail });
  };

  // useEffect(() => {
  //   if (verifyTwoFaMutation.isSuccess) {
  //     const tmt = setTimeout(() => {
  //       sessionStorage.setItem("accessToken", verifyTwoFaMutation.data.token);
  //       sessionStorage.setItem("user", verifyTwoFaMutation.data.user);
  //       window.location.href = "/dashboard";
  //     }, 3000);
  //   }
  // });

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
                  <p className="mt-3 fs-16 fw-semibold">Authenticate Login</p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mb-4">
                      <h4>Verify Your Login</h4>
                      <p>
                        Enter the 4-digit code sent to{" "}
                        <strong>{sessionEmail}</strong>
                      </p>
                    </div>

                    <form onSubmit={handleSubmit}>
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

                      <button
                        type="submit"
                        className="w-100 mt-3 btn btn-secondary"
                        disabled={verifyTwoFaMutation.isPending}
                      >
                        {verifyTwoFaMutation.isPending && <Spinner size="sm" />}{" "}
                        Submit
                      </button>
                    </form>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center d-flex align-items-center gap-2 justify-content-center">
                  <span
                    onClick={() => {
                      sessionStorage.clear();
                      window.location.href = "/login";
                    }}
                    className="text-decoration-underline text-secondary"
                  >
                    Go Back
                  </span>
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
      {verifyTwoFaMutation.isSuccess && (
        <SuccessToast
          successMsg={"Login Authenticated."}
          onClose={() => verifyTwoFaMutation.reset()}
        />
      )}
      {resendMutation.isPending && <Loader />}
    </div>
  );
};

export default TwoFa;
