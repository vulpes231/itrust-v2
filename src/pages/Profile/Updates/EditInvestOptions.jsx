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

const EditInvestOptions = ({ isOpen, handleToggle, user }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: updateUserInfo,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      experience: user?.professionalInfo?.experience || "",
      riskTolerance: user?.investOption?.riskTolerance || "",
      objectives: user?.investOption?.objectives || "",
      retiring: user?.investOption?.retiring || "",
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
        <ModalHeader toggle={handleToggle}>
          Edit Investing Preferences
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
                  experience
                </Label>
                <Input
                  type="select"
                  name="experience"
                  onChange={validation.handleChange}
                  value={validation.values.experience}
                  className="text-capitalize"
                >
                  <option value="">Select Experience</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="professional">Professional</option>
                  <option value="expert">Expert</option>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  risk tolerance
                </Label>
                <Input
                  type="select"
                  name="riskTolerance"
                  onChange={validation.handleChange}
                  value={validation.values.riskTolerance}
                  className="text-capitalize"
                >
                  <option value="">Select Risk Tolerance</option>
                  <option value="novice">Novice</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="professional">Professional</option>
                  <option value="expert">Expert</option>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  objectives
                </Label>
                <Input
                  type="select"
                  name="objectives"
                  onChange={validation.handleChange}
                  value={validation.values.objectives}
                  className="text-capitalize"
                >
                  <option value="">Select Objectives</option>
                  <option value="growth">Growth</option>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  retirement time horizon
                </Label>
                <Input
                  type="select"
                  name="retiring"
                  onChange={validation.handleChange}
                  value={validation.values.retiring}
                  className="text-capitalize"
                >
                  <option value="">Select Retirement Time Horizon</option>
                  <option value="2">2 Years</option>
                  <option value="4">4 Years</option>
                  <option value="6">6 Years</option>
                  <option value="8">8 Years</option>
                  <option value="10">10 Years</option>
                </Input>
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
          successMsg={"Investing Information Updated"}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default EditInvestOptions;
