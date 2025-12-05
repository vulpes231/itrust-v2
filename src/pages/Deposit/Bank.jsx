import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, FormFeedback, Input, Label, Row } from "reactstrap";

import * as Yup from "yup";
import { depositFunds } from "../../services/user/transactions";

const Bank = () => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () => depositFunds(validation.values),
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: "",
      account: "cash",
      network: "bank",
      method: "bank",
    },
    validationSchema: Yup.object({
      amount: Yup.string().required("Enter deposit amount"),
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

  return (
    <Row>
      <Col lg={6}>
        <div className="mb-3">
          <Label for="banknameInput" className="form-label">
            Bank Name
          </Label>
          <Input
            type="text"
            className="form-control"
            id="banknameInput"
            placeholder="Enter your bank name"
          />
        </div>
      </Col>
      <Col lg={6}>
        <div className="mb-3">
          <Label for="branchInput" className="form-label">
            Branch
          </Label>
          <Input
            type="text"
            className="form-control"
            id="branchInput"
            placeholder="Branch"
          />
        </div>
      </Col>
      <Col lg={12}>
        <div className="mb-3">
          <Label for="accountnameInput" className="form-label">
            Account Holder Name
          </Label>
          <Input
            type="text"
            className="form-control"
            id="accountnameInput"
            placeholder="Enter account holder name"
          />
        </div>
      </Col>
      <Col lg={6}>
        <div className="mb-3">
          <Label for="accountnumberInput" className="form-label">
            Account Number
          </Label>
          <Input
            type="number"
            className="form-control"
            id="accountnumberInput"
            placeholder="Enter account number"
          />
        </div>
      </Col>
      <Col lg={6}>
        <div className="mb-3">
          <Label for="ifscInput" className="form-label">
            IFSC
          </Label>
          <Input
            type="number"
            className="form-control"
            id="ifscInput"
            placeholder="IFSC"
          />
        </div>
      </Col>
      <Col lg={12}>
        <div>
          <Label for="amount" className="form-label">
            Amount
          </Label>
          <Input
            type="text"
            value={validation.values.amount}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            className={`form-control ${
              validation.touched.amount && validation.errors.amount
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter deposit amount"
            name="amount"
            autoComplete="off"
          />
          {validation.touched.amount && validation.errors.amount ? (
            <FormFeedback type="invalid">
              {validation.errors.amount}
            </FormFeedback>
          ) : null}
        </div>
      </Col>
      <Col lg={12}>
        <div className="d-flex align-items-start gap-3 mt-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              validation.submitForm();
              return false;
            }}
            disabled={mutation.isPending}
            type="submit"
            className="btn btn-primary btn-label right ms-auto"
          >
            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>{" "}
            Deposit via Bank
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default Bank;
