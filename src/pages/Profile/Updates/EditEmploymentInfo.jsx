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
import SuccessToast from "../../../components/Common/SuccessToast";
import ErrorToast from "../../../components/Common/ErrorToast";

const EditEmploymentInfo = ({ isOpen, handleToggle, user }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: updateUserInfo,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      employment: user?.professionalInfo?.employment || "",
      employerName: user?.professionalInfo?.employmentInfo?.employerName || "",
      position: user?.professionalInfo?.employmentInfo?.position || "",
      expYears: user?.professionalInfo?.employmentInfo?.expYears || "",
      annualIncome: user?.professionalInfo?.employmentInfo?.annualIncome || "",
      estimatedNet: user?.professionalInfo?.employmentInfo?.estimatedNet || "",
      liquidNet: user?.professionalInfo?.employmentInfo?.liquidNet || "",
      taxBracket: user?.professionalInfo?.employmentInfo?.taxBracket || "",
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
          Edit Employment &amp; Financial Informations
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
                  employment status
                </Label>
                <Input
                  type="select"
                  name="employment"
                  onChange={validation.handleChange}
                  value={validation.values.employment}
                  className="text-capitalize"
                >
                  <option value="">Select Status</option>
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                  <option value="student">Student</option>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  employer name
                </Label>
                <Input
                  type="text"
                  name="employerName"
                  onChange={validation.handleChange}
                  value={validation.values.employerName}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  position
                </Label>
                <Input
                  type="select"
                  name="position"
                  onChange={validation.handleChange}
                  value={validation.values.position}
                  className="text-capitalize"
                >
                  <option value="">Select Position</option>
                  <option value="owner">Owner</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="clerk">Clerk</option>
                </Input>
              </Col>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  experience years
                </Label>
                <Input
                  type="select"
                  name="expYears"
                  onChange={validation.handleChange}
                  value={validation.values.expYears}
                  className="text-capitalize"
                >
                  <option value="">Select Experience</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  annual income
                </Label>
                <Input
                  type="select"
                  name="annualIncome"
                  onChange={validation.handleChange}
                  value={validation.values.annualIncome}
                  className="text-capitalize"
                >
                  <option value="">Select Annual Income</option>
                  <option value="1k - 10k">1k - 10k</option>
                  <option value="10k - 100k">10k - 100k</option>
                  <option value="100k - 1M">100k - 1M</option>
                  <option value="1M - 10M">1M - 10M</option>
                </Input>
              </Col>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  estimated networth
                </Label>
                <Input
                  type="select"
                  name="estimatedNet"
                  onChange={validation.handleChange}
                  value={validation.values.estimatedNet}
                  className="text-capitalize"
                >
                  <option value="">Select Estimated Networth</option>
                  <option value="1k - 10k">1k - 10k</option>
                  <option value="10k - 100k">10k - 100k</option>
                  <option value="100k - 1M">100k - 1M</option>
                  <option value="1M - 10M">1M - 10M</option>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  liquid networth
                </Label>
                <Input
                  type="select"
                  name="liquidNet"
                  onChange={validation.handleChange}
                  value={validation.values.liquidNet}
                  className="text-capitalize"
                >
                  <option value="">Select Liquid Networth</option>
                  <option value="1k - 10k">1k - 10k</option>
                  <option value="10k - 100k">10k - 100k</option>
                  <option value="100k - 1M">100k - 1M</option>
                  <option value="1M - 10M">1M - 10M</option>
                </Input>
              </Col>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  tax bracket
                </Label>
                <Input
                  type="select"
                  name="taxBracket"
                  onChange={validation.handleChange}
                  value={validation.values.taxBracket}
                  className="text-capitalize"
                >
                  <option value="">Select Tax Bracket</option>
                  <option value="1% - 10%">1% - 10%</option>
                  <option value="10% - 30%">10% - 30%</option>
                  <option value="30% - 50%">30% - 50%</option>
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
          successMsg={"Employment Information Updated"}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default EditEmploymentInfo;
