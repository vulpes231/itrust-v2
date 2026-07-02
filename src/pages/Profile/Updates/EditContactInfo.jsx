import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";

import {
  getCountries,
  getStatesByCountry,
} from "../../../services/location/geo";
import { updateUserInfo } from "../../../services/user/user";
import ErrorToast from "../../../components/Common/ErrorToast";
import SuccessToast from "../../../components/Common/SuccessToast";

const EditContactInfo = ({ isOpen, handleToggle, user }) => {
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const mutation = useMutation({
    mutationFn: updateUserInfo,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      sessionStorage.setItem("showContactToast", "true");
      handleToggle();
      window.location.reload();
    },
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.contactInfo?.email || "",
      phone: user?.contactInfo?.phone || "",
      phoneCode: user?.contactInfo?.areaCode || "",
      address: user?.contactInfo?.street || "",
      countryId: user?.contactInfo?.country?.countryId || "",
      stateId: user?.contactInfo?.state?.stateId || "",
      city: user?.contactInfo?.city || "",
      zipCode: user?.contactInfo?.zipCode || "",
    },
    onSubmit: (values) => {
      const changedValues = {};

      Object.keys(values).forEach((key) => {
        if (values[key] !== validation.initialValues[key]) {
          changedValues[key] = values[key];
        }
      });

      if (Object.keys(changedValues).length === 0) {
        handleToggle();
        return;
      }
      console.log(changedValues);

      mutation.mutate(changedValues);
    },
  });

  const { data: countries } = useQuery({
    queryFn: getCountries,
    queryKey: ["countries"],
  });

  const { data: states } = useQuery({
    queryFn: () => getStatesByCountry(validation.values.countryId),
    queryKey: ["states", validation.values.countryId],
    enabled: !!validation.values.countryId,
  });

  const handleCountryInputChange = (e) => {
    const currentCountryId = e.target.value;
    const currentCountry = countries.find(
      (cont) => cont._id === currentCountryId,
    );
    setSelectedCountry(currentCountry);

    validation.setFieldValue("countryId", currentCountry._id);
    validation.setFieldValue("phoneCode", currentCountry.phoneCode);
  };

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

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
      <Modal isOpen={isOpen} toggle={handleToggle} centered>
        <ModalHeader toggle={handleToggle}>
          Edit Contact Informations
        </ModalHeader>
        <hr />
        <ModalBody>
          <form
            action=""
            onSubmit={validation.handleSubmit}
            className="d-flex flex-column gap-3"
          >
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  email address
                </Label>
                <Input
                  type="text"
                  name="email"
                  onChange={validation.handleChange}
                  value={validation.values.email}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  phone number
                </Label>
                <div className="d-flex align-items-center gap-1">
                  <div className="d-flex align-items-center w-100 gap-2">
                    <Input
                      name="phoneCode"
                      type="text"
                      maxLength={6}
                      placeholder="+123"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.phoneCode}
                      invalid={
                        validation.touched.phoneCode &&
                        validation.errors.phoneCode
                          ? true
                          : false
                      }
                      autoComplete="off"
                      style={{ width: "20%" }}
                      readOnly={user?.contactInfo?.status === "verified"}
                      className={
                        user?.contactInfo?.status === "verified"
                          ? "bg-light"
                          : ""
                      }
                    />{" "}
                    <Input
                      name="phone"
                      type="text"
                      placeholder="Enter phone"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.phone}
                      invalid={
                        validation.touched.phone && validation.errors.phone
                          ? true
                          : false
                      }
                      autoComplete="off"
                      style={{ width: "100%" }}
                      readOnly={user?.contactInfo?.status === "verified"}
                      className={
                        user?.contactInfo?.status === "verified"
                          ? "bg-light"
                          : ""
                      }
                    />
                  </div>

                  {/* <Input
                    type="text"
                    name="phone"
                    onChange={validation.handleChange}
                    value={validation.values.phone}
                    readOnly={user?.contactInfo?.status === "verified"}
                    className={
                      user?.contactInfo?.status === "verified" ? "bg-light" : ""
                    }
                  /> */}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  address
                </Label>
                <Input
                  type="text"
                  name="address"
                  onChange={validation.handleChange}
                  value={validation.values.address}
                  readOnly={user?.contactInfo?.status === "verified"}
                  className={
                    user?.contactInfo?.status === "verified" ? "bg-light" : ""
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  country of residence
                </Label>
                <Input
                  type="select"
                  name="countryId"
                  onChange={handleCountryInputChange}
                  value={validation.values.countryId}
                  className="text-capitalize"
                  disabled={user?.contactInfo?.status === "verified"}
                >
                  <option value="">Select Country</option>
                  {countries?.map((country) => (
                    <option key={country._id} value={country._id}>
                      {country.name}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">state</Label>
                <Input
                  type="select"
                  name="stateId"
                  onChange={validation.handleChange}
                  value={validation.values.stateId}
                  className="text-capitalize"
                  disabled={user?.contactInfo?.status === "verified"}
                >
                  <option value="">Select State</option>
                  {states?.map((state) => (
                    <option key={state._id} value={state._id}>
                      {state.name}
                    </option>
                  ))}
                </Input>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">city</Label>
                <Input
                  type="text"
                  name="city"
                  onChange={validation.handleChange}
                  value={validation.values.city}
                  autoComplete="off"
                  readOnly={user?.contactInfo?.status === "verified"}
                  className={
                    user?.contactInfo?.status === "verified" ? "bg-light" : ""
                  }
                />
              </Col>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  zip code
                </Label>
                <Input
                  type="text"
                  name="zipCode"
                  onChange={validation.handleChange}
                  value={validation.values.zipCode}
                  autoComplete="off"
                  readOnly={user?.contactInfo?.status === "verified"}
                  className={
                    user?.contactInfo?.status === "verified" ? "bg-light" : ""
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col className="d-flex align-items-center justify-content-end">
                <button
                  disabled={mutation.isPending}
                  type="submit"
                  className="btn btn-primary d-flex align-items-center gap-2"
                >
                  {mutation.isPending && <Spinner size={"sm"}></Spinner>}
                  Update
                </button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      {error && (
        <ErrorToast
          errorMsg={error}
          isOpen={!!error}
          onClose={() => setError("")}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          successMsg={"Contact Information Updated"}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default EditContactInfo;
