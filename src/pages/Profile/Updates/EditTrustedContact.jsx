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
import { updateTrustedContact } from "../../../services/user/user";
import ErrorToast from "../../../components/Common/ErrorToast";
import SuccessToast from "../../../components/Common/SuccessToast";

const EditTrustedContact = ({ isOpen, handleToggle, user }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: updateTrustedContact,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.settings?.beneficiary?.firstName || "",
      lastName: user?.settings?.beneficiary?.lastName || "",
      email: user?.settings?.beneficiary?.contact?.email || "",
      phone: user?.settings?.beneficiary?.contact?.phone || "",
      street: user?.settings?.beneficiary?.address?.street || "",
      countryId: user?.settings?.beneficiary?.address?.country?.id || "",
      stateId: user?.settings?.beneficiary?.address?.state?.id || "",
      city: user?.settings?.beneficiary?.address?.city || "",
      zipCode: user?.settings?.beneficiary?.address?.zipCode || "",
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

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const tmt = setTimeout(() => {
        mutation.reset();
        handleToggle();
        window.location.reload();
      }, 1000);
      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} toggle={handleToggle} centered>
        <ModalHeader toggle={handleToggle}>Add Trusted Contact</ModalHeader>
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
                  firstName
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  onChange={validation.handleChange}
                  value={validation.values.firstName}
                />
              </Col>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  last name
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  onChange={validation.handleChange}
                  value={validation.values.lastName}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">email</Label>
                <Input
                  type="text"
                  name="email"
                  onChange={validation.handleChange}
                  value={validation.values.email}
                />
              </Col>
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
                  name="street"
                  onChange={validation.handleChange}
                  value={validation.values.street}
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
          successMsg={"Trusted Contact Information Updated"}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default EditTrustedContact;
