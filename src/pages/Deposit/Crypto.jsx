import { capitalize } from "lodash";
import React, { useEffect, useState } from "react";
import { Col, FormFeedback, Input, Label, Row } from "reactstrap";
import { getUserWallets } from "../../services/user/wallet";
import { useMutation, useQuery } from "@tanstack/react-query";
import { depositFunds } from "../../services/user/transactions";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import { formatCurrency } from "../../constants";

const Crypto = ({ settings }) => {
  const [error, setError] = useState("");
  const [depositAcct, setDepositAccount] = useState("");

  const [form, setForm] = useState({
    amount: "",
    method: "",
    network: "",
    account: "",
  });

  const { data: wallets } = useQuery({
    queryFn: getUserWallets,
    queryKey: ["wallets"],
  });

  const cryptoMutation = useMutation({
    mutationFn: () => depositFunds(cryptoValidation.values),
    onError: (err) => setError(err.message),
  });

  const cryptoValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      method: form.method || "",
      account: form.account || "",
      network: form.network || "",
      amount: form.amount || "",
    },
    validationSchema: Yup.object({
      account: Yup.string().required("Select deposit account"),
      method: Yup.string().required("Select crypto method"),
      network: Yup.string().required("Select crypto network"),
      amount: Yup.string().required("Enter deposit amount"),
    }),
    onSubmit: (values) => {
      console.log("Submit cliked");
      console.log(values);
      cryptoMutation.mutate();
    },
    validateOnMount: true,
  });
  const methods = [
    { id: "btc", label: "Bitcoin (BTC)", network: ["BTC"] },
    { id: "eth", label: "Ethereum (ETH)", network: ["ERC20"] },
    { id: "usdt", label: "Tether (USDT)", network: ["ERC20", "TRC20"] },
  ];

  const getNetworks = (method) => {
    return methods.find((mt) => mt.id === method).network;
  };

  useEffect(() => {
    if (wallets) {
      const wallet = wallets.find((wallet) => wallet.name === "cash");
      setDepositAccount(wallet);
    }
  }, [wallets]);

  useEffect(() => {
    if (cryptoMutation.isSuccess) {
      const timeout = setTimeout(() => {
        cryptoMutation.reset();
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [cryptoMutation.isSuccess]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        cryptoMutation.reset();
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    if (settings) console.log(settings);
  }, [settings]);

  const getAddress = (name, network) => {
    const addressMap = {
      btc: { BTC: settings.cryptoWallets["btc"] },
      eth: { ERC20: settings.cryptoWallets["eth"] },
      usdt: {
        ERC20: settings.cryptoWallets["usdtErc"],
        TRC20: settings.cryptoWallets["usdtTrc"],
      },
    };

    return addressMap[name]?.[network] || null;
  };

  return (
    <Row className="g-3">
      <Col lg={6}>
        <div>
          <Label for="country-select" className="form-label">
            Account
          </Label>
          <Input
            id="account"
            name="account"
            className="form-control"
            type="select"
            onChange={cryptoValidation.handleChange}
            onBlur={cryptoValidation.handleBlur}
            value={cryptoValidation.values.account || ""}
            invalid={
              cryptoValidation.touched.account &&
              cryptoValidation.errors.account
                ? true
                : false
            }
          >
            <option value="">Select Account</option>
            {depositAcct && (
              <option value={depositAcct.name}>
                {capitalize(depositAcct.name)} Account
              </option>
            )}
          </Input>
          {cryptoValidation.touched.account &&
          cryptoValidation.errors.account ? (
            <FormFeedback type="invalid">
              {cryptoValidation.errors.account}
            </FormFeedback>
          ) : null}
        </div>
      </Col>
      <Col lg={6}>
        <div>
          <Label for="coin" className="form-label">
            Method
          </Label>
          <Input
            id="method"
            name="method"
            className="form-control"
            type="select"
            onChange={cryptoValidation.handleChange}
            onBlur={cryptoValidation.handleBlur}
            value={cryptoValidation.values.method || ""}
            invalid={
              cryptoValidation.touched.method && cryptoValidation.errors.method
                ? true
                : false
            }
          >
            <option value="">Select Method</option>
            {methods.map((mt) => {
              return (
                <option key={mt.id} value={mt.id}>
                  {mt.label}
                </option>
              );
            })}
          </Input>
          {cryptoValidation.touched.method && cryptoValidation.errors.method ? (
            <FormFeedback type="invalid">
              {cryptoValidation.errors.method}
            </FormFeedback>
          ) : null}
        </div>
      </Col>
      {cryptoValidation.values.method && (
        <Col lg={12}>
          <div>
            <Label for="network" className="form-label">
              Network
            </Label>
            <Input
              id="network"
              name="network"
              className="form-control"
              type="select"
              onChange={cryptoValidation.handleChange}
              onBlur={cryptoValidation.handleBlur}
              value={cryptoValidation.values.network || ""}
              invalid={
                cryptoValidation.touched.network &&
                cryptoValidation.errors.network
                  ? true
                  : false
              }
            >
              <option value="">Select Network</option>
              {getNetworks(cryptoValidation.values.method).map((mt, index) => {
                return (
                  <option key={index} value={mt}>
                    {mt}
                  </option>
                );
              })}
            </Input>
            {cryptoValidation.touched.network &&
            cryptoValidation.errors.network ? (
              <FormFeedback type="invalid">
                {cryptoValidation.errors.network}
              </FormFeedback>
            ) : null}
          </div>
        </Col>
      )}
      <Col lg={12}>
        <div>
          <Label for="address" className="form-label">
            Address
          </Label>
          <Input
            type="text"
            className="form-control"
            id="address"
            placeholder={getAddress(
              cryptoValidation.values.method,
              cryptoValidation.values.network
            )}
            readOnly
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
            value={cryptoValidation.values.amount}
            onChange={cryptoValidation.handleChange}
            onBlur={cryptoValidation.handleBlur}
            className={`form-control ${
              cryptoValidation.touched.amount && cryptoValidation.errors.amount
                ? "is-invalid"
                : ""
            }`}
            placeholder="Enter deposit amount"
            name="amount"
            autoComplete="off"
          />
          {cryptoValidation.touched.amount && cryptoValidation.errors.amount ? (
            <FormFeedback type="invalid">
              {cryptoValidation.errors.amount}
            </FormFeedback>
          ) : null}
        </div>
      </Col>
      <Col>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            color: "#505050",
          }}
        >
          <small>
            Minimum Deposit Limit:{" "}
            {settings ? formatCurrency(settings.depositLimits.crypto.min) : 0}
          </small>
          <small>
            Maximum deposit Limit:{" "}
            {settings ? formatCurrency(settings.depositLimits.crypto.max) : 0}
          </small>
        </div>
      </Col>

      <Col lg={12}>
        <div className="d-flex align-items-start gap-3 mt-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              cryptoValidation.submitForm();
              return false;
            }}
            type="submit"
            disabled={cryptoMutation.isPending}
            className="btn btn-primary btn-label right ms-auto"
          >
            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>{" "}
            Deposit via Crypto
          </button>
        </div>
      </Col>
      {error && (
        <ErrorToast
          errorMsg={error}
          onClose={() => {
            cryptoMutation.reset();
            setError("");
          }}
        />
      )}
      {cryptoMutation.isSuccess && (
        <SuccessToast
          successMsg={"Deposit request submitted."}
          onClose={() => {
            cryptoMutation.reset();
            setError("");
          }}
        />
      )}
    </Row>
  );
};

export default Crypto;
