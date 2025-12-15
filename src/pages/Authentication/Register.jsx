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
      const timeout = setTimeout(() => {
        console.log(mutation);
        sessionStorage.setItem("token", mutation.token);
        history("/contact");
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

  document.title = "Register | Itrust Investments";

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      <img src={logo} alt="" height="20" />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">
                    Smart Wealth Management
                  </p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Create New Account</h5>
                      <p className="text-muted">
                        Get your free itrust account now
                      </p>
                    </div>
                    <div className="p-2 mt-4">
                      <Form
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

                        <div className="mb-3">
                          <Label htmlFor="userpassword" className="form-label">
                            Password <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="password"
                            type="password"
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
                        </div>

                        <div className="mb-2">
                          <Label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            Confirm Password{" "}
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="confirm_password"
                            type="password"
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
                        </div>

                        <div className="mb-4">
                          <p className="mb-0 fs-12 text-muted fst-italic">
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
                            className="btn btn-primary w-100"
                            type="submit"
                            disabled={mutation.isPending}
                          >
                            {mutation.isPending
                              ? "Creating Account..."
                              : "Signup"}
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title text-muted">
                              Create account with
                            </h5>
                          </div>

                          <div>
                            <button
                              type="button"
                              className="btn btn-primary btn-icon waves-effect waves-light"
                            >
                              <i className="ri-facebook-fill fs-16"></i>
                            </button>{" "}
                            <button
                              type="button"
                              className="btn btn-danger btn-icon waves-effect waves-light"
                            >
                              <i className="ri-google-fill fs-16"></i>
                            </button>{" "}
                            <button
                              type="button"
                              className="btn btn-dark btn-icon waves-effect waves-light"
                            >
                              <i className="ri-github-fill fs-16"></i>
                            </button>{" "}
                            <button
                              type="button"
                              className="btn btn-info btn-icon waves-effect waves-light"
                            >
                              <i className="ri-twitter-fill fs-16"></i>
                            </button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Already have an account ?{" "}
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
          onClose={() => mutation.reset()}
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
