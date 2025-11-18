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

import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../assets";

import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { useQuery } from "@tanstack/react-query";
import { getCountries, getStatesByCountry } from "../../services/location/geo";

const Contact = () => {
  const history = useNavigate();
  const [countryId, setCountryId] = useState("");

  const { data: countries, isLoading: getCountriesLoading } = useQuery({
    queryFn: getCountries,
    queryKey: ["countries"],
  });

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      countryId: "",
      phone: "",
      street: "",
      stateId: "",
      city: "",
      zipcode: "",
    },
    validationSchema: Yup.object({
      country: Yup.string().required("Please Select Your Country"),
      phone: Yup.string().required("Please Enter Your Phone"),
      street: Yup.string().required("Please Enter Your Street"),
      stateId: Yup.string().required("Please Select Your State"),
      city: Yup.string().required("Please Select Your City"),
      zipcode: Yup.string().required("Please Enter Your Zipcode"),
    }),
    onSubmit: (values) => {
      console.log("form: ", values);
    },
  });

  const { data: states, isLoading: getStatesLoading } = useQuery({
    queryFn: () => getStatesByCountry(validation.values.countryId),
    queryKey: ["states", validation.values.countryId],
    enabled: !!validation.values.countryId,
  });

  const onCountryChange = (id) => {
    setCountryId(id);
    // dispatch(getPortfolioChartsData(pType));
  };

  // useEffect(() => {
  //   if (mutation.isSuccess) {
  //     setTimeout(() => history("/login"), 3000);
  //   }
  // }, [mutation.isSuccess]);

  document.title = "Contact Information | Itrust Investments";

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
                      <p className="text-muted">Contact Information</p>
                    </div>
                    <div className="p-2 mt-4">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          console.log(validation.values);
                          return false;
                        }}
                        className="needs-validation"
                        action="#"
                      >
                        <div className="mb-3">
                          <Label htmlFor="country" className="form-label">
                            Country <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="country"
                            name="countryId"
                            className="form-control"
                            placeholder="Enter country"
                            type="select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.countryId || ""}
                            invalid={
                              validation.touched.countryId &&
                              validation.errors.countryId
                                ? true
                                : false
                            }
                          >
                            <option value="">Select your country</option>
                            {countries &&
                              countries.length > 0 &&
                              countries.map((country) => {
                                return (
                                  <option
                                    key={country._id}
                                    value={country._id}
                                    className={
                                      validation.values.countryId ===
                                      country._id
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {country.name}
                                  </option>
                                );
                              })}
                          </Input>
                          {validation.touched.countryId &&
                          validation.errors.countryId ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.countryId}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="phone" className="form-label">
                            Phone <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="phone"
                            type="text"
                            placeholder="Enter phone"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone || ""}
                            invalid={
                              validation.touched.phone &&
                              validation.errors.phone
                                ? true
                                : false
                            }
                          />
                          {validation.touched.phone &&
                          validation.errors.phone ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.phone}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="street" className="form-label">
                            Street <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="street"
                            type="text"
                            placeholder="Enter street"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.street || ""}
                            invalid={
                              validation.touched.street &&
                              validation.errors.street
                                ? true
                                : false
                            }
                          />
                          {validation.touched.street &&
                          validation.errors.street ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.street}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="state" className="form-label">
                            State <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="state"
                            name="stateId"
                            className="form-control"
                            placeholder="Enter state"
                            type="select"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.stateId || ""}
                            invalid={
                              validation.touched.stateId &&
                              validation.errors.stateId
                                ? true
                                : false
                            }
                          >
                            <option value="">Select your state</option>
                            {states &&
                              states.length > 0 &&
                              states.map((state) => {
                                return (
                                  <option
                                    key={state._id}
                                    value={state._id}
                                    className={
                                      validation.values.stateId === state._id
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {state.name}
                                  </option>
                                );
                              })}
                          </Input>
                          {validation.touched.stateId &&
                          validation.errors.stateId ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.stateId}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-2">
                          <Label htmlFor="city" className="form-label">
                            City
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="city"
                            type="text"
                            placeholder="Enter City"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.city || ""}
                            invalid={
                              validation.touched.city && validation.errors.city
                                ? true
                                : false
                            }
                          />
                          {validation.touched.city && validation.errors.city ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.city}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-2">
                          <Label htmlFor="zipcode" className="form-label">
                            Zipcode
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="zipcode"
                            type="text"
                            placeholder="Enter zipcode"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.zipcode || ""}
                            invalid={
                              validation.touched.zipcode &&
                              validation.errors.zipcode
                                ? true
                                : false
                            }
                          />
                          {validation.touched.zipcode &&
                          validation.errors.zipcode ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.zipcode}</div>
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
                          >
                            Sign Up
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
    </React.Fragment>
  );
};

export default Contact;
