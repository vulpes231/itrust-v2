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
import { submitAddressVericationRequest } from "../../../../services/user/verification";
import { getUserInfo } from "../../../../services/user/user";
import { formatBytes, getAccessToken } from "../../../../constants";
import ErrorToast from "../../../../components/Common/ErrorToast";
import { IoAlertCircleOutline } from "react-icons/io5";
import SuccessToast from "../../../../components/Common/SuccessToast";

const AddressVerificationForm = ({
  isKycVerification,
  setIsKycVerification,
}) => {
  const token = getAccessToken();

  const { data: user } = useQuery({
    queryFn: getUserInfo,
    queryKey: ["user"],
    enabled: !!token,
  });

  const [error, setError] = useState("");

  const [addressFile, setAddressFile] = useState(null);

  const [fileError, setFileError] = useState("");

  const mutation = useMutation({
    mutationFn: (data) =>
      submitAddressVericationRequest(data, {
        addressFile,
      }),
    onError: (err) => {
      setError(err.message);
    },
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      idType: "",
      address: user?.contactInfo?.street || "",
      country: user?.contactInfo?.country?.name || "",
      state: user?.contactInfo?.state?.name || "",
      city: user?.contactInfo?.city || "",
      zipCode: user?.contactInfo?.zipCode || "",
    },
    validationSchema: Yup.object({
      idType: Yup.string().required("Please Select Your ID Type"),
    }),
    onSubmit: (values) => {
      if (!addressFile) {
        setFileError("Proof of Address is required!");
        return;
      }

      setFileError("");
      mutation.mutate(values);
    },
  });

  function toggleKycVerification() {
    setIsKycVerification(!isKycVerification);

    if (isKycVerification) {
      setAddressFile(null);

      validation.resetForm();
      setFileError("");
    }
  }

  function handleAddressFile(files) {
    const file = files[0];

    if (!file) return;

    const updatedFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
      formattedSize: formatBytes(file.size),
    });

    setAddressFile(updatedFile);
    setFileError("");
  }

  useEffect(() => {
    return () => {
      if (addressFile?.preview) URL.revokeObjectURL(addressFile.preview);
    };
  }, [addressFile]);

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  return (
    <Modal
      isOpen={isKycVerification}
      toggle={toggleKycVerification}
      centered={true}
      size="lg"
    >
      <ModalHeader className="p-3 " toggle={toggleKycVerification}>
        <div className="d-flex flex-column">
          <span className="fs-18 fw-bold">Address Verification</span>
          <small className="text-muted">
            Upload your government utility bill
          </small>
        </div>
      </ModalHeader>
      <ModalBody className="p-0">
        <form className="checkout-tab">
          <div className="modal-body d-flex flex-column gap-3">
            <Row className="g-3">
              <Col>
                <div>
                  <Label for="address" className="form-label">
                    Residential Address
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="address"
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    value={validation.values.address}
                    readOnly
                    name="address"
                  />
                </div>
              </Col>
            </Row>

            <Row className="g-3">
              <Col>
                <div>
                  <Label for="country" className="form-label">
                    Country of Residence
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="country"
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    value={validation.values.country}
                    readOnly
                    name="country"
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <Label for="state" className="form-label">
                    State
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="state"
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    value={validation.values.state}
                    readOnly
                    name="state"
                  />
                </div>
              </Col>
            </Row>
            <Row className="g-3">
              <Col>
                <div>
                  <Label for="city" className="form-label">
                    City
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="city"
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    value={validation.values.city}
                    readOnly
                    name="city"
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <Label for="zipCode" className="form-label">
                    Zip Code
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="zipCode"
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    value={validation.values.zipCode}
                    readOnly
                    name="zipCode"
                  />
                </div>
              </Col>
            </Row>
            <Row className="g-3">
              <Col>
                <div>
                  <Label for="ID Type" className="form-label">
                    Document Type
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
                    <option value="">Select Document Type</option>
                    <option value="utility">Utility bill</option>
                    <option value="statement">Bank Statement</option>
                    <option value="lease">Lease Agreement</option>
                    <option value="govid">Government ID</option>
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
                <Label className="form-label">Proof of Address</Label>
              </div>
              <Dropzone
                onDrop={handleAddressFile}
                accept={{
                  "image/*": [".jpeg", ".jpg", ".png", ".webp"],
                }}
                maxFiles={1}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone dz-clickable">
                    <div
                      className="dz-message needsclick text-center"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />

                      <div className="mb-3">
                        <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                      </div>

                      <h6 className="mb-1">
                        {addressFile
                          ? addressFile.name
                          : "Click to upload or drag and drop"}
                      </h6>

                      <small className="text-muted fs-12">
                        {addressFile ? "Image uploaded" : "PNG, JPG up to 5MB"}
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
            </Col>
            <Col>
              <Col className="d-flex align-items-start gap-2 justify-content-between bg-primary-subtle p-3 rounded">
                <div className="d-flex align-items-start gap-4 text-primary">
                  <IoAlertCircleOutline />
                  <div>
                    <span>
                      Acceptable Documents(Must be dated within the last 3
                      months)
                    </span>
                    <ul>
                      <li>Utility bill (electricity, gas, water)</li>
                      <li>Bank or credit card statement</li>
                      <li>Lease or rental aggreement</li>
                      <li>Government issued document</li>
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
      {!mutation.isSuccess && (
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

export default AddressVerificationForm;
