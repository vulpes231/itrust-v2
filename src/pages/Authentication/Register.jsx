import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../assets";

import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/auth/register";
import SuccessToast from "../../components/Common/SuccessToast";
import ErrorToast from "../../components/Common/ErrorToast";

const Register = () => {
  const history = useNavigate();
  const [error, setError] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShoww] = useState(false);

  const mutation = useMutation({
    mutationFn: registerUser,
    onError: (err) => {
      // console.log(err);
      setError(err.message);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      firstname: Yup.string().required("Please Enter Your FirstName"),
      lastname: Yup.string().required("Please Enter Your LastName"),
      password: Yup.string().required("Please Enter Your Password"),
      confirm_password: Yup.string()
        .required("Please Confirm Your Password")
        .oneOf([Yup.ref("password")], "Confirm Password Doesn't Match"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      sessionStorage.setItem("token", mutation.data.token);
      sessionStorage.setItem("email_registered", validation.values.email);
      const timeout = setTimeout(() => {
        mutation.reset();
        window.location.href = "/verifyemail";
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        mutation.reset();
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  document.title = "Register - Itrust Investments";

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="d-flex flex-column gap-4 align-items-center justify-content-center mt-2">
                      <div>
                        <Link to="/" className="d-inline-block auth-logo">
                          <img src={logo} alt="" height="40" width={"130"} />
                        </Link>
                      </div>
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <h5 className="text-primary">Get Started</h5>
                        <p className="text-muted">Create a new account</p>
                      </div>
                    </div>
                    <div className="p-2 mt-4">
                      <Form
                        autoComplete="off"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        className="needs-validation"
                        action="#"
                      >
                        <div className="mb-3">
                          <Label htmlFor="firstname" className="form-label">
                            First Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            autoComplete="off"
                            id="firstname"
                            name="firstname"
                            className="form-control"
                            placeholder="Enter First Name"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.firstname || ""}
                            invalid={
                              validation.touched.firstname &&
                              validation.errors.firstname
                                ? true
                                : false
                            }
                          />
                          {validation.touched.firstname &&
                          validation.errors.firstname ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.firstname}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="lastname" className="form-label">
                            Last Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            autoComplete="off"
                            id="lastname"
                            name="lastname"
                            className="form-control"
                            placeholder="Enter Last Name"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.lastname || ""}
                            invalid={
                              validation.touched.lastname &&
                              validation.errors.lastname
                                ? true
                                : false
                            }
                          />
                          {validation.touched.lastname &&
                          validation.errors.lastname ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.lastname}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="useremail" className="form-label">
                            Email <span className="text-danger">*</span>
                          </Label>
                          <Input
                            autoComplete="off"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email Address"
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
                        <div className="mb-3">
                          <Label htmlFor="username" className="form-label">
                            Username <span className="text-danger">*</span>
                          </Label>
                          <Input
                            autoComplete="off"
                            name="username"
                            type="text"
                            placeholder="Enter Username"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.username || ""}
                            invalid={
                              validation.touched.username &&
                              validation.errors.username
                                ? true
                                : false
                            }
                          />
                          {validation.touched.username &&
                          validation.errors.username ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.username}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3 position-relative auth-pass-inputgroup">
                          <Label htmlFor="userpassword" className="form-label">
                            Password <span className="text-danger">*</span>
                          </Label>
                          <Input
                            autoComplete="new-password"
                            name="password"
                            type={passwordShow ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.password}</div>
                            </FormFeedback>
                          ) : null}
                          <button
                            className="btn btn-link text-decoration-none text-muted"
                            type="button"
                            id="password-addon"
                            onClick={() => setPasswordShow(!passwordShow)}
                            style={{
                              position: "absolute",
                              top: 28,
                              right: 0,
                            }}
                          >
                            <i className="ri-eye-fill align-middle"></i>
                          </button>
                        </div>

                        <div className="mb-2 position-relative auth-pass-inputgroup">
                          <Label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            Confirm Password{" "}
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            autoComplete="new-password"
                            name="confirm_password"
                            type={confirmPasswordShow ? "text" : "password"}
                            placeholder="Confirm Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.confirm_password || ""}
                            invalid={
                              validation.touched.confirm_password &&
                              validation.errors.confirm_password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.confirm_password &&
                          validation.errors.confirm_password ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.confirm_password}</div>
                            </FormFeedback>
                          ) : null}
                          <button
                            className="btn btn-link text-decoration-none text-muted"
                            type="button"
                            id="password-addon"
                            onClick={() =>
                              setConfirmPasswordShoww(!confirmPasswordShow)
                            }
                            style={{
                              position: "absolute",
                              top: 28,
                              right: 0,
                            }}
                          >
                            <i className="ri-eye-fill align-middle"></i>
                          </button>
                        </div>

                        <div className="mb-4">
                          <p className="mb-0 fs-12 text-muted fst-italic d-flex gap-1">
                            By registering you agree to the Itrust
                            <Link
                              to="#"
                              className="text-primary text-decoration-underline fst-normal fw-medium"
                            >
                              Terms of Use
                            </Link>
                          </p>
                        </div>

                        <div className="mt-4">
                          <button
                            className="btn btn-secondary w-100"
                            type="submit"
                            disabled={mutation.isPending}
                          >
                            {mutation.isPending
                              ? "Creating Account..."
                              : "Signup"}
                          </button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-4 text-center">
                  <p className="mb-0 d-flex align-itesm-center gap-4 justify-content-center">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Signin{" "}
                    </Link>{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
      {mutation.isSuccess && (
        <SuccessToast
          isOpen={mutation.isSuccess}
          onClose={() => {
            // history("/contact");
            mutation.reset();
          }}
          successMsg={"Account Created Successfully."}
        />
      )}
      {error && (
        <ErrorToast
          isOpen={error}
          onClose={() => {
            mutation.reset();
            setError("");
          }}
          errorMsg={error}
        />
      )}
    </React.Fragment>
  );
};

export default Register;
