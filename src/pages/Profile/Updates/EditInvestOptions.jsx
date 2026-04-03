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
import { updateUserInfo } from "../../../services/user/user";
import ErrorToast from "../../../components/Common/ErrorToast";

const ALL_OBJECTIVES = [
  "growth",
  "income",
  "capital preservation",
  "speculation",
];

const EditInvestOptions = ({ isOpen, handleToggle, user }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: updateUserInfo,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      sessionStorage.setItem("showSuccessToast", "true");
      handleToggle();
      window.location.reload();
    },
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      experience: user?.investmentInfo?.experience || "",
      riskTolerance: user?.investmentInfo?.riskTolerance || "",
      objectives: [],
      retiring: user?.investmentInfo?.retiring || "",
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

      mutation.mutate(changedValues);
    },
  });

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

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

                <div className="d-flex flex-wrap gap-2 mb-2">
                  {validation.values.objectives.map((obj) => (
                    <div
                      key={obj}
                      className="badge bg-primary d-flex align-items-center gap-2 px-3 py-2"
                    >
                      <span className="text-capitalize">{obj}</span>
                      <span
                        role="button"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          const updated = validation.values.objectives.filter(
                            (item) => item !== obj
                          );
                          validation.setFieldValue("objectives", updated);
                        }}
                      >
                        ×
                      </span>
                    </div>
                  ))}
                </div>

                <Input
                  type="select"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!value) return;

                    validation.setFieldValue("objectives", [
                      ...validation.values.objectives,
                      value,
                    ]);

                    e.target.value = "";
                  }}
                  value=""
                >
                  <option value="">Select Objective</option>
                  {ALL_OBJECTIVES.filter(
                    (obj) => !validation.values.objectives.includes(obj)
                  ).map((obj, idx) => (
                    <option key={idx} value={obj}>
                      {obj.charAt(0).toUpperCase() + obj.slice(1)}
                    </option>
                  ))}
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
                  <option value="0 - 1 year">0 - 1 year</option>
                  <option value="1 - 5 years">1 - 5 years</option>
                  <option value="5 - 10 years">5 - 10 years</option>
                  <option value="10 - 20 years">10 - 20 years</option>
                  <option value="20 - 30 years">20 - 30 years</option>
                  <option value="> 30 years">{`> 30 years`}</option>
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
    </React.Fragment>
  );
};

export default EditInvestOptions;
