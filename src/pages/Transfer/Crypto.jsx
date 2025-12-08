// ===================================================

import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import { Col, FormFeedback, Input, Label, Row } from "reactstrap";
import { getUserWallets } from "../../services/user/wallet";
import { useMutation, useQuery } from "@tanstack/react-query";
import { transferFund } from "../../services/user/transactions";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";

const Crypto = () => {
  const [error, setError] = useState("");
  const [swapped, setSwapped] = useState(false);
  const [defaultAcct, setDefaultAcct] = useState("");

  const [form, setForm] = useState({
    amount: "",
    fromWallet: "",
    toWallet: "",
  });

  const { data: wallets } = useQuery({
    queryFn: getUserWallets,
    queryKey: ["wallets"],
  });

  const mutation = useMutation({
    mutationFn: transferFund,
    onError: (err) => {
      console.log(err);
      setError(err.message);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      fromWallet: form.fromWallet || "",
      toWallet: form.toWallet || "",
      amount: form.amount || "",
    },
    validationSchema: Yup.object({
      fromWallet: Yup.string().required("Select from account"),
      toWallet: Yup.string().required("Select to account"),
      amount: Yup.string().required("Enter withdrawal amount"),
    }),
    onSubmit: (values) => {
      console.log("values", values);

      // const formData = {
      //   fromWallet: !swapped
      //     ? validation.values.fromWallet
      //     : validation.values.toWallet,
      //   toWallet: !swapped
      //     ? validation.values.toWallet
      //     : validation.values.fromWallet,
      //   amount: validation.values.amount,
      // };
      // console.log("form", values);
      mutation.mutate(values);
    },
    validateOnMount: true,
  });

  useEffect(() => {
    if (wallets) {
      const wallet = wallets.find((wallet) => wallet.name === "cash");
      setDefaultAcct(wallet);
    }
  }, [wallets]);

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
    <Row className="g-3">
      <Col lg={12}>
        <div>
          <Label for="account" className="form-label">
            From Account
          </Label>
          <Input
            id="account"
            name="fromWallet"
            className="form-control"
            type="select"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.fromWallet || ""}
            invalid={
              validation.touched.fromWallet && validation.errors.fromWallet
                ? true
                : false
            }
          >
            <option value="">Select From Wallet</option>
            {!swapped ? (
              <option value={defaultAcct._id}>
                {capitalize(defaultAcct.name)} Account
              </option>
            ) : (
              wallets &&
              wallets.length > 0 &&
              wallets
                .filter((wallet) => wallet.name !== "cash")
                .map((wallet) => (
                  <option key={wallet._id} value={wallet._id}>
                    {capitalize(wallet.name)} Account
                  </option>
                ))
            )}
          </Input>
          {validation.touched.fromWallet && validation.errors.fromWallet ? (
            <FormFeedback type="invalid">
              {validation.errors.fromWallet}
            </FormFeedback>
          ) : null}
        </div>
      </Col>
      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={() => setSwapped(!swapped)}
          className="btn-soft-secondary"
          style={{
            outline: "none",
            border: "none",
            color: "#505050",
            padding: "2px 10px",
          }}
        >
          <i class="ri-exchange-line fs-22"></i>
        </button>
      </div>

      <Col lg={12}>
        <div>
          <Label for="address" className="form-label">
            To Account
          </Label>
          <Input
            id="account"
            name="toWallet"
            className="form-control"
            type="select"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.toWallet || ""}
            invalid={
              validation.touched.toWallet && validation.errors.toWallet
                ? true
                : false
            }
          >
            <option value="">Select To Wallet</option>
            {swapped ? (
              <option value={defaultAcct._id}>
                {capitalize(defaultAcct.name)} Account
              </option>
            ) : (
              wallets &&
              wallets.length > 0 &&
              wallets
                .filter((wallet) => wallet.name !== "cash")
                .map((wallet) => (
                  <option key={wallet._id} value={wallet._id}>
                    {capitalize(wallet.name)} Account
                  </option>
                ))
            )}
          </Input>
          {validation.touched.toWallet && validation.errors.toWallet ? (
            <FormFeedback type="invalid">
              {validation.errors.toWallet}
            </FormFeedback>
          ) : null}
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
            placeholder="Enter amount"
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
            type="submit"
            disabled={mutation.isPending}
            className="btn btn-success btn-label right ms-auto"
          >
            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>{" "}
            Transfer
          </button>
        </div>
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
          successMsg={"Transfer completed."}
          onClose={() => {
            mutation.reset();
            setError("");
          }}
        />
      )}
    </Row>
  );
};

export default Crypto;
