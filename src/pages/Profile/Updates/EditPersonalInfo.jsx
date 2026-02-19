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
import { getNations } from "../../../services/location/geo";
import { updateUserInfo } from "../../../services/user/user";
import ErrorToast from "../../../components/Common/ErrorToast";
import SuccessToast from "../../../components/Common/SuccessToast";

const EditPersonalInfo = ({ isOpen, handleToggle, user }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: updateUserInfo,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.name?.firstName || "",
      lastName: user?.name?.lastName || "",
      dob: user?.personalDetails?.dob
        ? user.personalDetails.dob.split("T")[0]
        : "",
      nationalityId: user?.locationDetails?.nationality?.id || "",
      username: user?.credentials?.username || "",
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

  const { data: nationalities } = useQuery({
    queryFn: getNations,
    queryKey: ["nations"],
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
          Edit Personal Informations
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
                  first name
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  onChange={validation.handleChange}
                  value={validation.values.firstName}
                />
              </Col>
            </Row>
            <Row>
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
                <Label className="fs-15 fw-normal text-capitalize">
                  username
                </Label>
                <Input
                  type="text"
                  name="username"
                  onChange={validation.handleChange}
                  value={validation.values.username}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  nationality
                </Label>
                <Input
                  type="select"
                  name="nationalityId"
                  onChange={validation.handleChange}
                  value={validation.values.nationalityId}
                  className="text-capitalize"
                >
                  <option value="">Select nationality</option>
                  {nationalities?.map((nation) => (
                    <option key={nation._id} value={nation._id}>
                      {nation.name}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col>
                <Label className="fs-15 fw-normal text-capitalize">
                  date of birth
                </Label>
                <Input
                  type="date"
                  name="dob"
                  onChange={validation.handleChange}
                  value={validation.values.dob}
                />
              </Col>
            </Row>
            <Row>
              <Col className="d-flex align-items-center justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary d-flex align-items-center gap-2"
                  disabled={mutation.isPending}
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
          successMsg={"Personal Information Updated"}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default EditPersonalInfo;
