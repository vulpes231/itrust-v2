import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
  Spinner,
} from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import * as Yup from "yup";
import { useFormik } from "formik";
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";
import { logo } from "../../assets";

import { useMutation } from "@tanstack/react-query";
import {
  confirmResetCode,
  sendResetCode,
} from "../../services/resetAccountPass";
import ForgetPassOtp from "./ForgetPassOtp";
import ChangePass from "./ChangePass";

const ForgetPasswordPage = (props) => {
  document.title = "Reset Password | Itrust Investments";

  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const sendPasswordResetCode = useMutation({
    mutationFn: sendResetCode,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        handleStep(2);
      }, 2000);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),

    onSubmit: (values) => {
      sessionStorage.setItem("email_registered", values.email);
      sendPasswordResetCode.mutate(values);
    },
  });

  function handleStep(newStep) {
    setStep(newStep);
  }

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  return (
    <ParticlesAuth>
      <div className="auth-page-content">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <Link to="/" className="d-inline-block auth-logo">
                    <img src={logo} alt="" height="30" width="120" />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>

          {step === 1 && (
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Forgot Password?</h5>
                      <p className="text-muted">Reset password with itrust</p>

                      <lord-icon
                        src="https://cdn.lordicon.com/rhvddzym.json"
                        trigger="loop"
                        colors="primary:#0ab39c"
                        className="avatar-xl"
                        style={{ width: "120px", height: "120px" }}
                      ></lord-icon>
                    </div>

                    {sendPasswordResetCode.isSuccess && (
                      <Alert color="success">Code Sent.</Alert>
                    )}

                    {!sendPasswordResetCode.isSuccess ||
                      (!error && (
                        <Alert
                          className="border-0 alert-warning text-center mb-2 mx-2"
                          role="alert"
                        >
                          Enter your registered email and instructions will be
                          sent to you!
                        </Alert>
                      ))}
                    <div className="p-2">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <div className="mb-4">
                          <Label className="form-label">Email</Label>
                          <Input
                            name="email"
                            autoComplete="off"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.email}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="text-center mt-4">
                          <button
                            className="btn btn-secondary w-100 d-flex align-items-center gap-2 justify-content-center"
                            type="submit"
                            disabled={sendPasswordResetCode.isPending}
                          >
                            {sendPasswordResetCode.isPending && (
                              <Spinner size={"sm"} />
                            )}
                            Send Reset Code
                          </button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Wait, I remember my password...{" "}
                    <Link
                      to="/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Click here{" "}
                    </Link>{" "}
                  </p>
                </div>
              </Col>
            </Row>
          )}
          {step === 2 && (
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <ForgetPassOtp handleStep={handleStep} />
              </Col>
            </Row>
          )}
          {step === 3 && (
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <ChangePass handleStep={handleStep} />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
