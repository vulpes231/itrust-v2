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
} from "reactstrap";

import {
  getCountries,
  getStatesByCountry,
} from "../../../services/location/geo";
import { updateUserInfo } from "../../../services/user/user";

const EditContactInfo = ({ isOpen, handleToggle, user }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: updateUserInfo,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.credentials?.email || "",
      phone: user?.contactInfo?.phone || "",
      address: user?.contactInfo?.address?.street || "",
      countryId: user?.locationDetails?.country?.countryId || "",
      stateId: user?.locationDetails?.state?.stateId || "",
      city: user?.contactInfo?.address?.city || "",
      zipCode: user?.contactInfo?.address?.zipCode || "",
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

      // mutation.mutate(changedValues);
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

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  // useEffect(() => {
  //   if (user) console.log(user);
  // }, [user]);

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
                <Input
                  type="text"
                  name="phone"
                  onChange={validation.handleChange}
                  value={validation.values.phone}
                />
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
                  onChange={validation.handleChange}
                  value={validation.values.countryId}
                  className="text-capitalize"
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
                />
              </Col>
            </Row>
            <Row>
              <Col className="d-flex align-items-center justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default EditContactInfo;
