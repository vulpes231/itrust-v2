import React, { useEffect, useState } from "react";
import {
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
  Input,
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";

import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { submitVericationRequest } from "../../services/user/verification";
import { getUserInfo } from "../../services/user/user";
import { getAccessToken } from "../../constants";
import ErrorToast from "../../components/Common/ErrorToast";
import { IoAlertCircleOutline } from "react-icons/io5";
import SuccessToast from "../../components/Common/SuccessToast";

const KYCVerification = ({ isKycVerification, setIsKycVerification }) => {
  const token = getAccessToken();

  const { data: user } = useQuery({
    queryFn: getUserInfo,
    queryKey: ["user"],
    enabled: !!token,
  });

  const [error, setError] = useState("");

  const [mainFile, setMainFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const mutation = useMutation({
    mutationFn: (data) =>
      submitVericationRequest(data, {
        mainFile,
        backFile,
      }),
    onError: (err) => {
      setError(err.message);
    },
    onSuccess: () => {
      toggleKycVerification();
    },
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      idType: "",
    },
    validationSchema: Yup.object({
      idType: Yup.string().required("Please Select Your ID Type"),
    }),
    onSubmit: (values) => {
      if (!mainFile) {
        setFileError("Main ID is required!");
        return;
      }

      setFileError("");
      mutation.mutate(values);
    },
  });

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function toggleKycVerification() {
    setIsKycVerification(!isKycVerification);

    if (isKycVerification) {
      setMainFile(null);
      setBackFile(null);
      validation.resetForm();
      setFileError("");
    }
  }

  function handleMainFile(files) {
    const file = files[0];

    if (!file) return;

    const updatedFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
      formattedSize: formatBytes(file.size),
    });

    setMainFile(updatedFile);
    setFileError("");
  }

  function handleBackFile(files) {
    const file = files[0];

    if (!file) return;

    const updatedFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
      formattedSize: formatBytes(file.size),
    });

    setBackFile(updatedFile);
  }

  useEffect(() => {
    return () => {
      if (mainFile?.preview) URL.revokeObjectURL(mainFile.preview);
      if (backFile?.preview) URL.revokeObjectURL(backFile.preview);
    };
  }, [mainFile, backFile]);

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
        window.location.reload();
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);

  return (
    <Modal
      isOpen={isKycVerification}
      toggle={toggleKycVerification}
      centered={true}
      size="lg"
    >
      <ModalHeader className="p-3" toggle={toggleKycVerification}>
        <h4>Identity Verification</h4>
        <small className="text-muted">Upload your government issued ID</small>
      </ModalHeader>
      <ModalBody className="p-0">
        <form className="checkout-tab">
          <div className="modal-body d-flex flex-column gap-3">
            <Row className="g-3">
              <Col>
                <div>
                  <Label for="ID Type" className="form-label">
                    ID Type
                  </Label>
                  <Input
                    type="select"
                    className="form-control"
                    id="idType"
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    value={validation.values.idType}
                    invalid={
                      validation.touched.idType && validation.errors.idType
                        ? true
                        : false
                    }
                    name="idType"
                  >
                    <option value="">Select ID Type</option>
                    <option value="passport">Passport</option>
                    <option value="drivers license">Drivers License</option>
                    <option value="state id">State ID</option>
                    <option value="national id">National ID</option>
                  </Input>
                  {validation.touched.idType && validation.errors.idType ? (
                    <FormFeedback type="invalid">
                      {validation.errors.idType}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Col>
              {fileError && (
                <Alert color="danger" className="mb-3">
                  {fileError}
                </Alert>
              )}

              <div className="mb-1">
                <Label className="form-label">Main ID</Label>
              </div>
              <Dropzone
                onDrop={handleMainFile}
                accept={{
                  "image/*": [".jpeg", ".jpg", ".png", ".webp"],
                }}
                maxFiles={1}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone dz-clickable">
                    <div
                      className="dz-message needsclick pt-4 text-center"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />

                      <div className="mb-3">
                        <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                      </div>

                      <h6 className="mb-1">
                        {mainFile
                          ? mainFile.name
                          : "Click to upload or drag and drop"}
                      </h6>

                      <small className="text-muted fs-12">
                        {mainFile ? "Image uploaded" : "PNG, JPG up to 5MB"}
                      </small>
                    </div>
                  </div>
                )}
              </Dropzone>
            </Col>
            <Col>
              {fileError && (
                <Alert color="danger" className="mb-3">
                  {fileError}
                </Alert>
              )}

              <div className="mb-1">
                <Label className="form-label text-muted">
                  Back ID (Optional)
                </Label>
              </div>

              <Dropzone
                onDrop={handleBackFile}
                accept={{
                  "image/*": [".jpeg", ".jpg", ".png", ".webp"],
                }}
                maxFiles={1}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone dz-clickable">
                    <div
                      className="dz-message needsclick pt-4"
                      {...getRootProps()}
                    >
                      <div className="mb-1">
                        <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                      </div>
                      <h6 className="mb-1">
                        {backFile
                          ? backFile.name
                          : "Click to upload or drag and drop"}
                      </h6>

                      <small className="text-muted fs-12">
                        {backFile ? "Image uploaded" : "PNG, JPG up to 5MB"}
                      </small>
                    </div>
                  </div>
                )}
              </Dropzone>
            </Col>
            <Col>
              <Col className="d-flex align-items-start gap-2 justify-content-between bg-primary-subtle p-3 rounded">
                <div className="d-flex align-items-start gap-4 text-primary">
                  <IoAlertCircleOutline />
                  <div>
                    <span>Tips for a succesful verification</span>
                    <ul>
                      <li>Ensure all texts are clearly readable</li>
                      <li>Avoid glare and shadows</li>
                      <li>Include all four corners of the document</li>
                      <li>Make sure the ID is not expired</li>
                    </ul>
                    <span>
                      By submitting, you certify that the information provided
                      is accurate. Most verifications are completed within 24
                      hours and you'll receive an email notification.
                    </span>
                  </div>
                </div>
              </Col>

              <div className="d-flex align-items-start gap-3 mt-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    validation.submitForm();
                  }}
                  disabled={mutation.isPending}
                  type="button"
                  className="btn btn-primary btn-label right ms-auto d-flex align-items-center gap-1"
                >
                  {mutation.isPending && <Spinner size={"sm"} />}
                  <>
                    <i className="ri-save-line label-icon align-middle fs-16 ms-2"></i>
                    Submit
                  </>
                </button>
              </div>
            </Col>
          </div>
        </form>
      </ModalBody>

      {error && (
        <ErrorToast
          errorMsg={error}
          isOpen={true}
          onClose={() => {
            setError("");
          }}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          successMsg={"Documents submitted."}
          isOpen={mutation.isSuccess}
          onClose={() => {
            mutation.reset();
          }}
        />
      )}
    </Modal>
  );
};

export default KYCVerification;
