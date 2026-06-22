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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logo } from "../../assets";

import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { useQuery } from "@tanstack/react-query";
import { getCountries, getStatesByCountry } from "../../services/location/geo";
import { RiContactsBookLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";

const Contact = () => {
  const history = useNavigate();

  const savedContact = JSON.parse(sessionStorage.getItem("contact"));

  const { data: countries, isLoading: getCountriesLoading } = useQuery({
    queryFn: getCountries,
    queryKey: ["countries"],
  });

  const [selectedCountry, setSelectedCountry] = useState("");

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      countryId: savedContact?.countryId || "",
      phone: savedContact?.phone || "",
      street: savedContact?.street || "",
      stateId: savedContact?.stateId || "",
      city: savedContact?.city || "",
      zipCode: savedContact?.zipCode || "",
    },
    validationSchema: Yup.object({
      countryId: Yup.string().required("Please Select Your Country"),
      phone: Yup.string().required("Please Enter Your Phone"),
      street: Yup.string().required("Please Enter Your Street"),
      stateId: Yup.string().required("Please Select Your State"),
      city: Yup.string().required("Please Select Your City"),
      zipCode: Yup.string().required("Please Enter Your Zipcode"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      sessionStorage.setItem("contact", JSON.stringify(values));
      history("/personal");
    },
  });

  const handleCountryInputChange = (e) => {
    const currentCountry = e.target.value;
    setSelectedCountry(currentCountry);

    validation.setFieldValue("countryId", currentCountry._id);
  };

  const { data: states, isLoading: getStatesLoading } = useQuery({
    queryFn: () => getStatesByCountry(validation.values.countryId),
    queryKey: ["states", validation.values.countryId],
    enabled: !!validation.values.countryId,
  });

  document.title = "Complete Profile - Contact Information";

  const location = useLocation();

  useEffect(() => {
    if (!validation.values.countryId) return;
    const country =
      countries &&
      countries.length > 0 &&
      countries.find((ct) => ct._id.toString() === validation.values.countryId);
    // console.log(country);
    setSelectedCountry(country);
  }, [validation.values.countryId]);

  return (
    <React.Fragment>
      <Container style={{ marginTop: "100px", marginBottom: "100px" }}>
        <Row className="justify-content-center">
          <Col md={8} lg={7} xl={6}>
            <Card className="mt-4">
              <CardBody className="p-4">
                <div className="d-flex flex-column gap-2 align-items-center justify-content-center mt-2">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <h5 className="text-primary">Complete Your Profile</h5>
                    <p className="text-muted fs-13">
                      Enter Contact Information
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-evenly text-muted">
                    <span
                      style={{
                        border: location.pathname.includes("/contact")
                          ? "1px solid #5162BE"
                          : "1px solid #E9EBEC",
                        borderRadius: "50%",
                      }}
                      className="p-2"
                    >
                      <RiContactsBookLine
                        size={20}
                        style={{
                          color: location.pathname.includes("/contact")
                            ? "#5162BE"
                            : "#E9EBEC",
                        }}
                      />
                    </span>
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "#E9EBEC",
                        width: "250px",
                      }}
                    ></div>
                    <span
                      style={{
                        border: "1px solid #E9EBEC",
                        borderRadius: "50%",
                      }}
                      className="p-2"
                    >
                      <AiOutlineUser size={20} />
                    </span>
                  </div>
                </div>
                <div className="p-2 mt-5">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.submitForm();
                    }}
                    className="needs-validation"
                    action="#"
                  >
                    <div className="mb-3">
                      <Label htmlFor="country" className="form-label">
                        Country of Residence
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        id="country"
                        name="countryId"
                        className="form-control text-capitalize"
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
                                  validation.values.countryId === country._id
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
                        Phone Number <span className="text-danger">*</span>
                      </Label>
                      <div className="d-flex align-items-center gap-1">
                        {selectedCountry !== "" ? (
                          <span className="border border-2 rounded-2 p-2">
                            {selectedCountry?.phoneCode}
                          </span>
                        ) : null}
                        <Input
                          name="phone"
                          type="text"
                          placeholder="Enter phone"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone || ""}
                          invalid={
                            validation.touched.phone && validation.errors.phone
                              ? true
                              : false
                          }
                          autoComplete="off"
                        />
                      </div>
                      {validation.touched.phone && validation.errors.phone ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.phone}</div>
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label htmlFor="street" className="form-label">
                        Residential Address{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="street"
                        type="text"
                        placeholder="Enter Home Address"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.street || ""}
                        invalid={
                          validation.touched.street && validation.errors.street
                            ? true
                            : false
                        }
                        autoComplete="off"
                      />
                      {validation.touched.street && validation.errors.street ? (
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
                        className="form-control text-capitalize"
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
                        autoComplete="off"
                      />
                      {validation.touched.city && validation.errors.city ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.city}</div>
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-2">
                      <Label htmlFor="zipcode" className="form-label">
                        Zip Code
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="zipCode"
                        type="text"
                        placeholder="Enter zipcode"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.zipCode || ""}
                        invalid={
                          validation.touched.zipCode &&
                          validation.errors.zipCode
                            ? true
                            : false
                        }
                        autoComplete="off"
                      />
                      {validation.touched.zipCode &&
                      validation.errors.zipCode ? (
                        <FormFeedback type="invalid">
                          <div>{validation.errors.zipCode}</div>
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mt-4 d-flex justify-content-end">
                      <button className="btn btn-secondary" type="submit">
                        Next
                      </button>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Contact;
