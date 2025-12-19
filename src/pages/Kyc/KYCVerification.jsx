import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Label,
  Input,
  FormFeedback,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Dropzone from "react-dropzone";
import { verification } from "../../assets";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { submitVericationRequest } from "../../services/user/verification";
import { getUserInfo } from "../../services/user/user";
import { getAccessToken } from "../../constants";
import ErrorToast from "../../components/Common/ErrorToast";

const KYCVerification = () => {
  const token = getAccessToken();
  const { data: user } = useQuery({
    queryFn: getUserInfo,
    queryKey: ["user"],
    enabled: !!token,
  });
  const [error, setError] = useState("");
  const [isKycVerification, setIsKycVerification] = useState(false);

  const toggleKycVerification = () => {
    setIsKycVerification(!isKycVerification);
    if (isKycVerification) {
      setSelectedFiles([]);
      validation.resetForm();
      setActiveTab(1);
      setPassedSteps([1]);
    }
  };

  const [activeTab, setActiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileError, setFileError] = useState("");

  const mutation = useMutation({
    mutationFn: (data) => submitVericationRequest(data, selectedFiles),
    onError: (err) => {
      setError(err.message);
      setActiveTab(2);
    },
    onSuccess: () => {
      toggleTab(3);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: "",
      lastname: "",
      idType: "",
      idNumber: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please Enter Your First Name"),
      lastname: Yup.string().required("Please Enter Your Last Name"),
      idType: Yup.string().required("Please Select Your ID Type"),
      idNumber: Yup.string().required("Please Enter Your ID Number"),
    }),
    onSubmit: (values) => {
      if (selectedFiles.length !== 2) {
        setFileError("Please upload both front and back images of your ID");
        setActiveTab(2);
        return;
      }

      setFileError("");
      mutation.mutate(values);
    },
  });

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4) {
        setActiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function handleAcceptedFiles(files) {
    const limitedFiles = files.slice(0, 2);

    limitedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    setSelectedFiles(limitedFiles);
    setFileError("");
  }

  React.useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [selectedFiles]);

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col lg={6}>
          <Card>
            <CardBody>
              <div className="text-center">
                <Row className="justify-content-center">
                  {user?.identityVerification?.kycStatus === "pending" ? (
                    <Col>
                      <p className="text-warning mt-2">
                        {" "}
                        Verification request submitted and awaiting review.
                      </p>
                    </Col>
                  ) : user?.identityVerification?.kycStatus === "completed" ? (
                    <Col>
                      <p className="text-success mt-2">Account Verified.</p>
                    </Col>
                  ) : (
                    <Col lg={9}>
                      <h4 className="mt-4 fw-bold">KYC Verification</h4>
                      <p className="text-muted mt-3">
                        When you get your KYC verification process done, you
                        have given the crypto exchange in this case,
                        information.{" "}
                      </p>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={toggleKycVerification}
                          className="btn btn-primary"
                        >
                          Click here for Verification
                        </button>
                      </div>
                    </Col>
                  )}
                </Row>

                <Row className="justify-content-center mt-5 mb-2">
                  <Col sm={7} xs={8}>
                    <img src={verification} alt="" className="img-fluid" />
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Error Alert
      {error && (
        <Alert
          color="danger"
          isOpen={!!error}
          toggle={() => setError("")}
          className="position-fixed top-0 end-0 m-3"
          style={{ zIndex: 9999 }}
        >
          {error}
        </Alert>
      )} */}

      <Modal
        isOpen={isKycVerification}
        toggle={toggleKycVerification}
        centered={true}
        size="lg"
      >
        <ModalHeader
          className="p-3 text-uppercase fw-bold"
          toggle={toggleKycVerification}
        >
          Verify your Account
        </ModalHeader>
        <form className="checkout-tab">
          <ModalBody className="p-0">
            <div className="step-arrow-nav">
              <Nav
                className="nav-pills nav-justified custom-nav"
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames(
                      {
                        active: activeTab === 1,
                        done: activeTab <= 3 && activeTab >= 0,
                      },
                      "p-3"
                    )}
                    onClick={() => {
                      toggleTab(1);
                    }}
                  >
                    Personal Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames(
                      {
                        active: activeTab === 2,
                        done: activeTab <= 3 && activeTab > 1,
                      },
                      "p-3"
                    )}
                    onClick={() => {
                      toggleTab(2);
                    }}
                  >
                    Document Verification
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames(
                      {
                        active: activeTab === 3,
                        done: activeTab <= 3 && activeTab > 2,
                      },
                      "p-3"
                    )}
                    onClick={() => {
                      if (mutation.isSuccess) {
                        toggleTab(3);
                      }
                    }}
                  >
                    Verified
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </ModalBody>
          <div className="modal-body">
            <TabContent activeTab={activeTab}>
              <TabPane tabId={1}>
                <Row className="g-3">
                  <Col lg={6}>
                    <div>
                      <Label for="firstName" className="form-label">
                        First Name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="firstname"
                        placeholder="Enter your firstname"
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        value={validation.values.firstname}
                        invalid={
                          validation.touched.firstname &&
                          validation.errors.firstname
                            ? true
                            : false
                        }
                        name="firstname"
                      />
                      {validation.touched.firstname &&
                      validation.errors.firstname ? (
                        <FormFeedback type="invalid">
                          {validation.errors.firstname}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div>
                      <Label for="lastname" className="form-label">
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="lastname"
                        placeholder="Enter your lastname"
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        value={validation.values.lastname}
                        invalid={
                          validation.touched.lastname &&
                          validation.errors.lastname
                            ? true
                            : false
                        }
                        name="lastname"
                      />
                      {validation.touched.lastname &&
                      validation.errors.lastname ? (
                        <FormFeedback type="invalid">
                          {validation.errors.lastname}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={6}>
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
                  <Col lg={6}>
                    <div>
                      <Label for="serviceTax" className="form-label">
                        ID Number
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="idNumber"
                        placeholder="Enter your ID Number"
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        value={validation.values.idNumber}
                        invalid={
                          validation.touched.idNumber &&
                          validation.errors.idNumber
                            ? true
                            : false
                        }
                        name="idNumber"
                      />
                      {validation.touched.idNumber &&
                      validation.errors.idNumber ? (
                        <FormFeedback type="invalid">
                          {validation.errors.idNumber}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="d-flex align-items-start gap-3 mt-3">
                      <button
                        onClick={() => {
                          if (validation.isValid) {
                            toggleTab(activeTab + 1);
                          } else {
                            validation.validateForm();
                          }
                        }}
                        type="button"
                        className="btn btn-primary btn-label right ms-auto nexttab"
                      >
                        <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>{" "}
                        Next Step
                      </button>
                    </div>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tabId={2}>
                {fileError && (
                  <Alert color="danger" className="mb-3">
                    {fileError}
                  </Alert>
                )}

                <div className="mb-3">
                  <Label className="form-label">
                    Upload ID Images (Front & Back)
                  </Label>
                  <p className="text-muted small mb-2">
                    Please upload exactly 2 images: front and back of your ID
                  </p>
                </div>

                <Dropzone
                  onDrop={handleAcceptedFiles}
                  accept={{
                    "image/*": [".jpeg", ".jpg", ".png", ".webp"],
                  }}
                  maxFiles={2}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div className="dropzone dz-clickable">
                      <div
                        className="dz-message needsclick pt-4"
                        {...getRootProps()}
                      >
                        <div className="mb-3">
                          <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                        </div>
                        <h4>Drop files here or click to upload.</h4>
                        <p className="text-muted">
                          Upload exactly 2 images (Front and Back of your ID)
                        </p>
                      </div>
                    </div>
                  )}
                </Dropzone>

                <div className="mt-3">
                  <p className="text-muted small">
                    Selected files: {selectedFiles.length}/2
                  </p>
                </div>

                <div className="list-unstyled mb-0" id="file-previews">
                  {selectedFiles.map((f, i) => {
                    const label = i === 0 ? "Front ID" : "Back ID";
                    return (
                      <Card
                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                        key={i + "-file"}
                      >
                        <div className="p-2">
                          <Row className="align-items-center">
                            <Col className="col-auto">
                              <img
                                data-dz-thumbnail=""
                                height="80"
                                className="avatar-sm rounded bg-light"
                                alt={f.name}
                                src={f.preview}
                              />
                            </Col>
                            <Col>
                              <div>
                                <span className="badge bg-info me-2">
                                  {label}
                                </span>
                                <span className="text-muted font-weight-bold">
                                  {f.name}
                                </span>
                              </div>
                              <p className="mb-0">
                                <strong>{f.formattedSize}</strong>
                              </p>
                            </Col>
                          </Row>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <div className="d-flex align-items-start gap-3 mt-4">
                  <button
                    onClick={() => {
                      toggleTab(activeTab - 1);
                    }}
                    type="button"
                    className="btn btn-light btn-label previestab"
                  >
                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                    Back to Personal Details
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      validation.submitForm();
                    }}
                    disabled={mutation.isPending}
                    type="button"
                    className="btn btn-primary btn-label right ms-auto nexttab"
                  >
                    {mutation.isPending ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="ri-save-line label-icon align-middle fs-16 ms-2"></i>
                        Submit
                      </>
                    )}
                  </button>
                </div>
              </TabPane>

              <TabPane tabId={3}>
                <Row className="text-center justify-content-center py-4">
                  <Col lg={12}>
                    <div className="mb-4">
                      <lord-icon
                        src="https://cdn.lordicon.com/lupuorrc.json"
                        trigger="loop"
                        colors="primary:#0ab39c,secondary:#405189"
                        style={{ width: "120px", height: "120px" }}
                      ></lord-icon>
                    </div>
                    <h4>Verification Submitted</h4>
                    <p className="text-muted mb-4">
                      Your verification is being reviewed, The process takes 2 -
                      4 hours upon which your verification status will be
                      updated. You can check the progress on your dashboard.
                      <span className="fw-medium">KYC Application.</span>
                    </p>

                    <div className="hstack justify-content-center gap-2">
                      <button
                        onClick={() => {
                          toggleKycVerification();
                          window.location.reload();
                        }}
                        type="button"
                        className="btn btn-ghost-success"
                      >
                        Done{" "}
                        <i className="ri-thumb-up-fill align-bottom me-1"></i>
                      </button>
                      <button
                        onClick={() => {
                          toggleKycVerification();
                          window.location.reload();
                        }}
                        type="button"
                        className="btn btn-primary"
                      >
                        <i className="ri-home-4-line align-bottom ms-1"></i>{" "}
                        Back to Home
                      </button>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </form>
      </Modal>
      {error && (
        <ErrorToast
          errorMsg={error}
          isOpen={true}
          onClose={() => {
            mutation.reset();
            setError("");
          }}
        />
      )}
    </React.Fragment>
  );
};

export default KYCVerification;
