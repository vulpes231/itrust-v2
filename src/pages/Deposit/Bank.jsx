import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, FormFeedback, Input, Label, Row } from "reactstrap";

import * as Yup from "yup";
import { depositFunds } from "../../services/user/transactions";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import { formatCurrency } from "../../constants";
import { CenterSpan, CustomSpan, FlexRow } from "./DepositUtils";
import Loader from "../../components/Common/Loader";
import { BsBank } from "react-icons/bs";
import { IoAlertCircleOutline } from "react-icons/io5";

const Bank = ({ settings, userBank }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () => depositFunds(validation.values),
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
      console.log(values);
      mutation.mutate();
    },
  });

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
    if (error) {
      const timeout = setTimeout(() => {
        mutation.reset();
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  // useEffect(() => {
  //   if (userBank) console.log(userBank);
  // }, [userBank]);

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
          <Input
            type="text"
            className="form-control"
            readOnly
            value={userBank?.bankName ?? settings?.bankDetails?.bankName}
          />
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Account Name
          </Label>
          <Input
            type="text"
            className="form-control"
            readOnly
            value={userBank?.accountName ?? settings?.bankDetails?.accountName}
          />
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Account Number
          </Label>
          <Input
            type="text"
            className="form-control"
            readOnly
            value={
              userBank?.accountNumber ?? settings?.bankDetails?.accountNumber
            }
          />
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Routing Number
          </Label>
          <Input
            type="text"
            className="form-control"
            readOnly
            value={userBank?.routing ?? settings?.bankDetails?.routing}
          />
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Swift Code / BIC Code
          </Label>
          <Input type="text" className="form-control" id="banknameInput" />
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Bank Address
          </Label>
          <Input
            type="text"
            className="form-control"
            readOnly
            value={userBank?.address ?? settings?.bankDetails?.address}
          />
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Reference (Required)
          </Label>
          <Input
            type="text"
            className="form-control"
            readOnly
            value={userBank?.reference ?? settings?.bankDetails?.reference}
          />
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
          <small
            className="pb-3"
            style={{ fontSize: "14px", color: "#000000", fontWeight: 300 }}
          >
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
