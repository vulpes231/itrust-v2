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
  Button,
  Spinner,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerUser } from "../../services/auth/register";
import { logo } from "../../assets";

import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { getCurrencies, getNations } from "../../services/location/geo";

const Personal = () => {
  const history = useNavigate();

  const [error, setError] = useState("");

  const { data: currencies, isLoading: getCurrenciesLoading } = useQuery({
    queryFn: getCurrencies,
    queryKey: ["currencies"],
  });
  const { data: nations, isLoading: getNationsLoading } = useQuery({
    queryFn: getNations,
    queryKey: ["nations"],
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      dob: "",
      experience: "",
      employment: "",
      nationalityId: "",
      currencyId: "",
    },
    validationSchema: Yup.object({
      dob: Yup.string().required("Please Enter Your DOB"),
      employment: Yup.string().required("Please Select Your Employment"),
      experience: Yup.string().required("Please Select Your Experience"),
      nationalityId: Yup.string().required("Please Select Your Nationality"),
      currencyId: Yup.string().required("Please Select Your Currency"),
    }),
    onSubmit: (values) => {
      const userForm = JSON.parse(sessionStorage.getItem("credentials"));
      const contactForm = JSON.parse(sessionStorage.getItem("contact"));

      const formData = { ...userForm, ...contactForm, ...values };
      // console.log("form: ", formData);
      mutation.mutate(formData);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      console.log(mutation);
      sessionStorage.setItem("token", mutation.token);
      sessionStorage.removeItem("credentials");
      sessionStorage.removeItem("contact");
      setTimeout(() => history("/verifyemail"), 3000);
    }
  }, [mutation.isSuccess]);

  document.title = "Personal Information | Itrust Investments";

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
                      <p className="text-muted">Personal Information</p>
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
                        {mutation.isSuccess && mutation.isSuccess ? (
                          <>
                            {toast("Your Redirect To Login Page...", {
                              position: "top-right",
                              hideProgressBar: false,
                              progress: undefined,
                              toastId: "",
                            })}
                            <ToastContainer autoClose={2000} limit={1} />
                            <Alert color="success">
                              Register User Successfully and Your Redirect To
                              Login Page...
                            </Alert>
                          </>
                        ) : null}

                        {error && error ? (
                          <Alert color="danger">
                            <div>{error}</div>
                          </Alert>
                        ) : null}

                        <div className="mb-3">
                          <Label htmlFor="dob" className="form-label">
                            Date of Birth <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="dob"
                            name="dob"
                            className="form-control"
                            placeholder="Enter date of birth"
                            type="date"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.dob || ""}
                            invalid={
                              validation.touched.dob && validation.errors.dob
                                ? true
                                : false
                            }
                          />
                          {validation.touched.dob && validation.errors.dob ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.dob}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="employment" className="form-label">
                            Employment <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="employment"
                            name="employment"
                            className="form-control"
                            type="select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.employment || ""}
                            invalid={
                              validation.touched.employment &&
                              validation.errors.employment
                                ? true
                                : false
                            }
                          >
                            <option value="">Select your employment</option>
                            {[
                              { _id: "employed", name: "employed" },
                              { _id: "unemployed", name: "unemployed" },
                              { _id: "student", name: "student" },
                              { _id: "retired", name: "retired" },
                            ].map((post) => {
                              return (
                                <option
                                  key={post._id}
                                  value={post._id}
                                  className={
                                    validation.values.employment === post._id
                                      ? "active"
                                      : ""
                                  }
                                >
                                  {post.name}
                                </option>
                              );
                            })}
                          </Input>
                          {validation.touched.employment &&
                          validation.errors.employment ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.employment}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="experience" className="form-label">
                            Experience <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="experience"
                            name="experience"
                            className="form-control"
                            type="select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.experience || ""}
                            invalid={
                              validation.touched.experience &&
                              validation.errors.experience
                                ? true
                                : false
                            }
                          >
                            <option value="">Select your experience</option>
                            {[
                              { _id: "beginner", name: "beginner" },
                              { _id: "intermediate", name: "intermediate" },
                              { _id: "expert", name: "expert" },
                            ].map((exp) => {
                              return (
                                <option
                                  key={exp._id}
                                  value={exp._id}
                                  className={
                                    validation.values.experience === exp._id
                                      ? "active"
                                      : ""
                                  }
                                >
                                  {exp.name}
                                </option>
                              );
                            })}
                          </Input>
                          {validation.touched.experience &&
                          validation.errors.experience ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.experience}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="nationality" className="form-label">
                            Nationality <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="nationality"
                            name="nationalityId"
                            className="form-control"
                            type="select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.nationalityId || ""}
                            invalid={
                              validation.touched.nationalityId &&
                              validation.errors.nationalityId
                                ? true
                                : false
                            }
                          >
                            <option value="">Select your nationality</option>
                            {nations &&
                              nations.length > 0 &&
                              nations.map((nation) => {
                                return (
                                  <option
                                    key={nation._id}
                                    value={nation._id}
                                    className={
                                      validation.values.nationalityId ===
                                      nation._id
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {nation.name}
                                  </option>
                                );
                              })}
                          </Input>
                          {validation.touched.nationalityId &&
                          validation.errors.nationalityId ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.nationalityId}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="currency" className="form-label">
                            Currency <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="currency"
                            name="currencyId"
                            className="form-control"
                            type="select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.currencyId || ""}
                            invalid={
                              validation.touched.currencyId &&
                              validation.errors.currencyId
                                ? true
                                : false
                            }
                          >
                            <option value="">Select your currency</option>
                            {currencies &&
                              currencies.length > 0 &&
                              currencies.map((currency) => {
                                return (
                                  <option
                                    key={currency._id}
                                    value={currency._id}
                                    className={
                                      validation.values.currencyId ===
                                      currency._id
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {currency.name}
                                  </option>
                                );
                              })}
                          </Input>
                          {validation.touched.currencyId &&
                          validation.errors.currencyId ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.currencyId}</div>
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
                            className="btn btn-dark w-100 mb-1"
                            type="button"
                            onClick={() => history("/contact")}
                          >
                            Prev
                          </button>
                          <Button
                            disabled={
                              error ? null : mutation.isPending ? true : false
                            }
                            color="primary"
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            {mutation.isPending ? (
                              <Spinner size="sm" className="me-2">
                                {" "}
                                Registering user...
                              </Spinner>
                            ) : null}
                            Sign Up
                          </Button>
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
    </React.Fragment>
  );
};

export default Personal;
