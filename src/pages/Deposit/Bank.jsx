import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Alert, Col, FormFeedback, Input, Label, Row } from "reactstrap";

import * as Yup from "yup";
import { depositFunds } from "../../services/user/transactions";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import { formatBytes, formatCurrency } from "../../constants";
import { CenterSpan, CustomSpan, FlexRow } from "./DepositUtils";
import Loader from "../../components/Common/Loader";
import { BsBank } from "react-icons/bs";
import { IoAlertCircleOutline } from "react-icons/io5";
import { PiCopyLight } from "react-icons/pi";
import Dropzone from "react-dropzone";

const Bank = ({ settings, userBank }) => {
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [fileError, setFileError] = useState("");
  const [proof, setProof] = useState(null);

  const mutation = useMutation({
    mutationFn: depositFunds,
    onError: (err) => setError(err.message),
  });

  const data = JSON.parse(sessionStorage.getItem("deposit"));

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: data?.amount || "",
      account: "cash",
      network: "bank",
      method: "bank",
    },
    validationSchema: Yup.object({
      // amount: Yup.string().required("Enter deposit amount"),
    }),
    onSubmit: (values) => {
      if (!proof) {
        setFileError("Proof of payment is required!");
        return;
      }

      setFileError("");
      // setError("Coming soon...");

      mutation.mutate({ ...values, proof });
    },
  });

  const handleCopy = async (value, id) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);

      setCopied(id);
    } catch (err) {
      console.log(err);
      setError("Copy failed.");
    }
  };

  function handleProof(files) {
    const file = files[0];

    if (!file) return;

    const updatedFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
      formattedSize: formatBytes(file.size),
    });

    setProof(updatedFile);
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      const timeout = setTimeout(() => {
        mutation.reset();
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (error || fileError) {
      const timeout = setTimeout(() => {
        setError("");
        setFileError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error, fileError]);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied("");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <Row className="g-3 p-4">
      <div className="pb-3">
        <FlexRow>
          <span
            className="bg-primary d-flex align-items-center justify-content-center"
            style={{
              fontSize: "25px",
              fontWeight: 600,
              color: "#fff",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
            }}
          >
            <BsBank />
          </span>
          <CustomSpan>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#495057",
                lineHeight: 2,
              }}
            >
              Wire Transfer Details
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 300,
                color: "#878A99",
                // lineHeight: 2,
              }}
            >
              Send exactly <b>{formatCurrency(data?.amount)}</b> to the account
              below
            </span>
          </CustomSpan>
        </FlexRow>
      </div>

      <Col lg={12}>
        <div className="d-flex align-items-center bg-primary-subtle rounded mx-2 gap-3 mb-3 py-2 px-4">
          <div>
            <IoAlertCircleOutline className="text-primary" />
          </div>
          <div
            style={{ fontWeight: 300, fontSize: "14px" }}
            className="d-flex flex-column text-primary"
          >
            <span>
              Please ensure you include the reference number in your wire
              transfer. This helps us identify your deposit quickly.
            </span>
            <span>Processing time: 1 - 5 business days</span>
          </div>
        </div>
      </Col>

      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Bank Name
          </Label>
          <div className="position-relative">
            <Input
              type="text"
              className="form-control"
              readOnly
              value={userBank?.bankName ?? settings?.bankDetails?.bankName}
            />
            <button
              onClick={() =>
                handleCopy(
                  userBank?.bankName || settings?.bankDetails?.bankName,
                  1
                )
              }
              type="button"
              className="position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center gap-1 bg-transparent border-0"
            >
              <span
                className={`${
                  copied === 1 ? "text-success" : "text-muted"
                } fw-light fs-11`}
              >
                {copied === 1 ? "Copied" : "Copy"}
              </span>
              <PiCopyLight className="text-muted" />
            </button>
          </div>
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Account Name
          </Label>
          <div className="position-relative">
            <Input
              type="text"
              className="form-control"
              readOnly
              value={
                userBank?.accountName ?? settings?.bankDetails?.accountName
              }
            />
            <button
              onClick={() =>
                handleCopy(
                  userBank?.accountName || settings?.bankDetails?.accountName,
                  2
                )
              }
              type="button"
              className="position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center gap-1 bg-transparent border-0"
            >
              <span
                className={`${
                  copied === 2 ? "text-success" : "text-muted"
                } fw-light fs-11`}
              >
                {copied === 2 ? "Copied" : "Copy"}
              </span>
              <PiCopyLight className="text-muted" />
            </button>
          </div>
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Account Number
          </Label>
          <div className="position-relative">
            <Input
              type="text"
              className="form-control"
              readOnly
              value={
                userBank?.accountNumber ?? settings?.bankDetails?.accountNumber
              }
            />
            <button
              onClick={() =>
                handleCopy(
                  userBank?.accountNumber ||
                    settings?.bankDetails?.accountNumber,
                  3
                )
              }
              type="button"
              className="position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center gap-1 bg-transparent border-0"
            >
              <span
                className={`${
                  copied === 3 ? "text-success" : "text-muted"
                } fw-light fs-11`}
              >
                {copied === 3 ? "Copied" : "Copy"}
              </span>
              <PiCopyLight className="text-muted" />
            </button>
          </div>
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Routing Number
          </Label>
          <div className="position-relative">
            <Input
              type="text"
              className="form-control"
              readOnly
              value={userBank?.routing ?? settings?.bankDetails?.routing}
            />
            <button
              onClick={() =>
                handleCopy(
                  userBank?.routing || settings?.bankDetails?.routing,
                  4
                )
              }
              type="button"
              className="position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center gap-1 bg-transparent border-0"
            >
              <span
                className={`${
                  copied === 4 ? "text-success" : "text-muted"
                } fw-light fs-11`}
              >
                {copied === 4 ? "Copied" : "Copy"}
              </span>
              <PiCopyLight className="text-muted" />
            </button>
          </div>
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Swift Code / BIC Code
          </Label>
          <div className="position-relative">
            <Input type="text" className="form-control" id="banknameInput" />
            <button
              //  onClick={() =>
              //   handleCopy(
              //     userBank?.accountName || settings?.bankDetails?.accountName, 5
              //   )
              // }
              type="button"
              className="position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center gap-1 bg-transparent border-0"
            >
              <span
                className={`${
                  copied === 5 ? "text-success" : "text-muted"
                } fw-light fs-11`}
              >
                {copied === 5 ? "Copied" : "Copy"}
              </span>
              <PiCopyLight className="text-muted" />
            </button>
          </div>
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Bank Address
          </Label>
          <div className="position-relative">
            <Input
              type="text"
              className="form-control"
              readOnly
              value={userBank?.address ?? settings?.bankDetails?.address}
            />
            <button
              onClick={() =>
                handleCopy(
                  userBank?.address || settings?.bankDetails?.address,
                  6
                )
              }
              type="button"
              className="position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center gap-1 bg-transparent border-0"
            >
              <span
                className={`${
                  copied === 6 ? "text-success" : "text-muted"
                } fw-light fs-11`}
              >
                {copied === 6 ? "Copied" : "Copy"}
              </span>
              <PiCopyLight className="text-muted" />
            </button>
          </div>
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Reference (Required)
          </Label>
          <div className="position-relative">
            <Input
              type="text"
              className="form-control"
              readOnly
              value={userBank?.reference ?? settings?.bankDetails?.reference}
            />
            <button
              onClick={() =>
                handleCopy(
                  userBank?.reference || settings?.bankDetails?.reference,
                  7
                )
              }
              type="button"
              className="position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center gap-1 bg-transparent border-0"
            >
              <span
                className={`${
                  copied === 7 ? "text-success" : "text-muted"
                } fw-light fs-11`}
              >
                {copied === 7 ? "Copied" : "Copy"}
              </span>
              <PiCopyLight className="text-muted" />
            </button>
          </div>
        </div>
      </Col>

      <Col lg={12}>
        <div className="px-2">
          <span className="d-flex align-items-center justify-content-between">
            <Label
              style={{ fontSize: "16px", color: "495057", fontWeight: 600 }}
            >
              Deposit Summary
            </Label>
            {/* <img src="" alt="coin" /> */}
          </span>

          <hr style={{ color: "#dedede" }} />

          <div className="d-flex flex-column gap-2 px-3">
            <span className="d-flex align-items-center justify-content-between">
              <span
                style={{ color: "#878A99", fontSize: "14px", fontWeight: 300 }}
              >
                Amount to Send
              </span>
              <span
                style={{ color: "#495057", fontSize: "14px", fontWeight: 600 }}
              >
                {formatCurrency(data?.amount)}
              </span>
            </span>

            <span className="d-flex align-items-center justify-content-between">
              <span
                style={{ color: "#878A99", fontSize: "14px", fontWeight: 300 }}
              >
                Processing Fee
              </span>
              <span
                className="text-success"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                {formatCurrency(0)}
              </span>
            </span>
            <span className="d-flex align-items-center justify-content-between">
              <span
                style={{ color: "#495057", fontSize: "14px", fontWeight: 500 }}
              >
                You will receive
              </span>
              <span
                style={{ color: "#495057", fontSize: "14px", fontWeight: 600 }}
              >
                {formatCurrency(data?.amount)}
              </span>
            </span>
          </div>
          <hr style={{ color: "#dedede" }} />
        </div>
      </Col>
      <Col className="px-3">
        {fileError && (
          <Alert color="danger" className="mb-3">
            {fileError}
          </Alert>
        )}

        <div className="mb-1">
          <Label className="form-label text-muted">Proof Of Payment</Label>
        </div>

        <Dropzone
          onDrop={handleProof}
          accept={{
            "image/*": [".jpeg", ".jpg", ".png", ".webp"],
          }}
          maxFiles={1}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone dz-clickable bg-light-subtle">
              <div className="dz-message needsclick pt-4" {...getRootProps()}>
                <div className="mb-1">
                  <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                </div>
                <h6 className="mb-1">
                  {proof ? proof.name : "Click to upload or drag and drop"}
                </h6>

                <small className="text-muted fs-12">
                  {proof ? "Image uploaded" : "PNG, JPG up to 5MB"}
                </small>
              </div>
            </div>
          )}
        </Dropzone>
      </Col>

      <Col lg={12}>
        <CenterSpan>
          <button
            style={{ width: "100%" }}
            onClick={(e) => {
              e.preventDefault();
              validation.submitForm();
              return false;
            }}
            type="submit"
            disabled={mutation.isPending}
            className="btn btn-primary"
          >
            I have made payment
          </button>
          <small className="pb-3 fs-13 text-muted fw-light">
            After sending the wire transfer, click the button above to notify
            us. We'll credit your account once we receive the funds.
          </small>
        </CenterSpan>
      </Col>
      {error && (
        <ErrorToast
          errorMsg={error}
          onClose={() => {
            mutation.reset();
            setError("");
          }}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          successMsg={"Deposit request submitted."}
          onClose={() => {
            mutation.reset();
            setError("");
          }}
        />
      )}
      {mutation.isPending && <Loader />}
    </Row>
  );
};

export default Bank;
