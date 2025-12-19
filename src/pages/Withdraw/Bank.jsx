import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, FormFeedback, Input, Label, Row } from "reactstrap";

import * as Yup from "yup";
import { depositFunds } from "../../services/user/transactions";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import { formatCurrency } from "../../constants";
import { CenterSpan, CustomSpan, FlexRow } from "../Deposit/DepositUtils";
import Loader from "../../components/Common/Loader";
import { BsBank } from "react-icons/bs";
import { IoAlertCircleOutline } from "react-icons/io5";

const Bank = ({ settings }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () => depositFunds(validation.values),
    onError: (err) => setError(err.message),
  });

  const data = JSON.parse(sessionStorage.getItem("withdraw"));

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: data?.amount || "",
      network: "bank",
      method: "bank",
      bankName: "",
      accountName: "",
      accountNumber: "",
      swiftCode: "",
      routingNumber: "",
      bankAddress: "",
      reference: "",
    },
    validationSchema: Yup.object({
      amount: Yup.string().required("Enter deposit amount"),
      bankName: Yup.string().required("Enter bank name"),
      accountName: Yup.string().required("Enter account name"),
      accountNumber: Yup.string().required("Enter account number"),
      bankAddress: Yup.string().required("Enter bank address"),
      routingNumber: Yup.string().required("Enter routing number"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // mutation.mutate();
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
  // console.log(settings);

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
              Bank Transfer Withdrawal
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 300,
                color: "#878A99",
                // lineHeight: 2,
              }}
            >
              Enter your bank account details
            </span>
          </CustomSpan>
        </FlexRow>
      </div>

      <Col lg={12}>
        <div className="d-flex align-items-center justify-content-center bg-warning-subtle rounded mx-2 gap-3 p-2">
          <div className="d-flex align-items-center">
            <IoAlertCircleOutline className="text-warning" />
          </div>
          <div className="d-flex align-items-center">
            <ul
              style={{ fontWeight: 300, fontSize: "14px" }}
              className="text-warning mb-0"
            >
              <li>
                Please ensure your bank details are correct. Incorrect
                information may result in delays or failed transfers.
              </li>
              <li>Processing time: 2 - 5 business days</li>
            </ul>
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
            name="bankName"
            placeholder="Enter Bank Name"
            value={validation.values.bankName}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={
              validation.touched.bankName && validation.errors.bankName
                ? true
                : false
            }
          />
          {validation.touched.bankName && validation.errors.bankName ? (
            <FormFeedback type={"invalid"}>
              {validation.errors.bankName}
            </FormFeedback>
          ) : null}
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
            name="accountName"
            placeholder="Enter Account Name"
            value={validation.values.accountName}
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            invalid={
              validation.touched.accountName && validation.errors.accountName
                ? true
                : false
            }
          />
          {validation.touched.accountName && validation.errors.accountName ? (
            <FormFeedback type="invalid">
              {validation.errors.accountName}
            </FormFeedback>
          ) : null}
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
            name="accountNumber"
            placeholder="Enter Account Number"
            value={validation.values.accountNumber}
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            invalid={
              validation.touched.accountNumber &&
              validation.errors.accountNumber
                ? true
                : false
            }
          />
          {validation.touched.accountNumber &&
          validation.errors.accountNumber ? (
            <FormFeedback type="invalid">
              {validation.errors.accountNumber}
            </FormFeedback>
          ) : null}
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
            name="routingNumber"
            placeholder="Enter Routing Number"
            value={validation.values.routingNumber}
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            invalid={
              validation.touched.routingNumber &&
              validation.errors.routingNumber
                ? true
                : false
            }
          />
          {validation.touched.routingNumber &&
          validation.errors.routingNumber ? (
            <FormFeedback type="invalid">
              {validation.errors.routingNumber}
            </FormFeedback>
          ) : null}
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Swift Code / BIC Code (Optional for International)
          </Label>
          <Input
            type="text"
            className="form-control"
            name="swiftCode"
            placeholder="FNBKUS33XXX"
            value={validation.values.swiftCode}
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            // invalid={
            //   validation.touched.swiftCode &&
            //   validation.errors.swiftCode
            //     ? true
            //     : false
            // }
          />
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
            name="bankAddress"
            placeholder="Enter Bank Address"
            value={validation.values.bankAddress}
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            invalid={
              validation.touched.bankAddress && validation.errors.bankAddress
                ? true
                : false
            }
          />
          {validation.touched.bankAddress && validation.errors.bankAddress ? (
            <FormFeedback type="invalid">
              {validation.errors.bankAddress}
            </FormFeedback>
          ) : null}
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="banknameInput" className="form-label">
            Reference (Optional for International)
          </Label>
          <Input
            type="text"
            className="form-control"
            name="reference"
            placeholder="DEPE59948970"
            value={validation.values.reference}
            onBlur={validation.handleBlur}
            onChange={validation.handleChange}
            // invalid={
            //   validation.touched.reference &&
            //   validation.errors.reference
            //     ? true
            //     : false
            // }
          />
        </div>
      </Col>

      <Col lg={12}>
        <div className="px-2">
          <span className="d-flex align-items-center justify-content-between">
            <Label
              style={{ fontSize: "16px", color: "495057", fontWeight: 600 }}
            >
              Withdrawal Summary
            </Label>
            {/* <img src="" alt="coin" /> */}
          </span>

          <hr style={{ color: "#dedede" }} />

          <div className="d-flex flex-column gap-2 px-3">
            <span className="d-flex align-items-center justify-content-between">
              <span
                style={{ color: "#878A99", fontSize: "14px", fontWeight: 300 }}
              >
                Amount to Receive
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
            Confirm Withdrawal
          </button>
          <small
            className="pb-3"
            style={{ fontSize: "14px", color: "#000000", fontWeight: 300 }}
          >
            By confirming, you authorize us to transfer{" "}
            <b>{formatCurrency(data?.amount)}</b> to your bank account. Funds
            typically arrive in 2-5 business days.
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
          successMsg={"Withdrawal request submitted."}
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
