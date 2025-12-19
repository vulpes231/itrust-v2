import React, { useEffect, useState } from "react";
import { Col, FormFeedback, Input, Label, Row } from "reactstrap";
import { useMutation } from "@tanstack/react-query";
import { depositFunds } from "../../services/user/transactions";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import { formatCurrency } from "../../constants";
import { CenterSpan, CustomSpan, FlexRow } from "../Deposit/DepositUtils";
import { FaDollarSign } from "react-icons/fa";
import { btc, dep, eth, usdt } from "../../assets";
import { IoAlertCircleOutline } from "react-icons/io5";
import Loader from "../../components/Common/Loader";
import ConnectWalletModal from "./ConnectWalletModal";
import ConnectForm from "./ConnectForm";
import ConnectWait from "./ConnectWait";

const Crypto = ({ settings }) => {
  const [error, setError] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [connectModal, setConnectModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);

  const handleShowForm = () => {
    setConnectModal(!connectModal);
    setShowForm(!showForm);
  };

  const handleShowWait = () => {
    setShowForm(!showForm);
    setShowWaiting(!showWaiting);
  };

  const handleMode = (asset) => {
    setSelectedMode(asset);
  };

  const cryptoMutation = useMutation({
    mutationFn: () => depositFunds(cryptoValidation.values),
    onError: (err) => setError(err.message),
  });

  const data = JSON.parse(sessionStorage.getItem("withdraw"));

  const cryptoValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      method: selectedMode?.symbol || "",
      account: "cash",
      network: selectedMode?.network || "",
      amount: data.amount || "",
      address: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Enter Address"),
    }),
    onSubmit: (values) => {
      if (!values.method) {
        setError("Select cryptocurrency!");
        return;
      }
      console.log(values);
      cryptoMutation.mutate();
    },
    validateOnMount: true,
  });

  const methods = [
    { id: "btc", label: "Bitcoin", network: "BTC", img: btc, symbol: "BTC" },
    { id: "eth", label: "Ethereum", network: "ERC20", img: eth, symbol: "ETH" },
    {
      id: "usdtErc",
      label: "Tether",
      network: "ERC20",
      img: usdt,
      symbol: "USDT",
    },
    {
      id: "usdtTrc",
      label: "Tether",
      network: "TRC20",
      img: usdt,
      symbol: "USDT",
    },
  ];

  const toggleConnect = () => {
    setConnectModal(!connectModal);
  };

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
            <FaDollarSign />
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
              Cryptocurrency Withdrawal
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 300,
                color: "#878A99",
                // lineHeight: 2,
              }}
            >
              Choose your cryptocurrency and enter wallet address
            </span>
          </CustomSpan>
        </FlexRow>
      </div>
      <Col lg={12}>
        <div className="d-flex align-items-start bg-danger-subtle rounded mx-2 gap-3 mb-3 py-3 px-4">
          <div className="d-flex align-items-center">
            <IoAlertCircleOutline className="text-danger" />
          </div>
          <div className="d-flex align-items-center">
            <ul
              style={{ fontWeight: 300, fontSize: "14px" }}
              className="text-danger mb-0"
            >
              <span style={{ fontWeight: 600, fontSize: "14px" }}>
                Important
              </span>
              <li>Double-check your wallet address before confirming</li>
              <li>
                Sending to wrong address will result in permanent loss of funds
              </li>
              <li>
                Ensure you're using the correct network for the selected
                cryptocurrency
              </li>
              <li>We cannot reverse or refund cryptocurrency transactions</li>
            </ul>
          </div>
        </div>
      </Col>
      <Col lg={12}>
        <div className="px-2">
          <Label
            className="pb-1"
            style={{ fontSize: "16px", color: "#495057", fontWeight: 600 }}
          >
            Select Cryptocurrency
          </Label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
            className="pb-3"
          >
            {methods.map((mtd) => {
              return (
                <div
                  style={{
                    borderRadius: "5px",
                    border:
                      selectedMode.id === mtd.id
                        ? "1px solid #5126be"
                        : "1px solid #dedede",
                    cursor: "pointer",
                  }}
                  key={mtd.id}
                  className={`d-flex align-items-center gap-3 py-1 px-2 ${
                    selectedMode.id === mtd.id ? "bg-primary-subtle" : ""
                  }`}
                  onClick={() => handleMode(mtd)}
                >
                  <img src={mtd.img} alt="" width={30} />
                  <span className="d-flex flex-column">
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#495057",
                      }}
                    >
                      {mtd.label}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 300,
                        color: "#212529",
                      }}
                    >
                      {mtd.network}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Col>

      <Col lg={12}>
        <div className="d-flex align-items-start bg-warning-subtle rounded mx-2 gap-3 mb-3 py-3 px-4">
          <div className="d-flex align-items-center">
            <IoAlertCircleOutline className="text-warning" />
          </div>
          <span
            style={{ fontWeight: 300, fontSize: "14px" }}
            className="text-warning"
          >
            Connect a DEFI wallet to process your crypto withdrawals
          </span>
        </div>
      </Col>
      <Col>
        <div className="mx-2">
          <button
            style={{ width: "100%" }}
            type="button"
            className="btn btn-primary mb-4"
            onClick={toggleConnect}
          >
            Connect Wallet
          </button>
          <span
            style={{
              fontSize: "14px",
              color: "#878A99",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            or enter manually
          </span>
        </div>
      </Col>

      <Col lg={12}>
        <div className="mb-3 px-2">
          <Label for="address" className="form-label">
            {selectedMode?.symbol} Wallet Address
          </Label>
          <Input
            type="text"
            className="form-control"
            placeholder="Enter Address"
            name="address"
            value={cryptoValidation.values.address}
            onBlur={cryptoValidation.handleBlur}
            onChange={cryptoValidation.handleChange}
            invalid={
              cryptoValidation.touched.address &&
              cryptoValidation.errors.address
                ? true
                : false
            }
          />
          {cryptoValidation.touched.address &&
          cryptoValidation.errors.address ? (
            <FormFeedback type="invalid">
              {cryptoValidation.errors.address}
            </FormFeedback>
          ) : null}
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
                Amount to receive
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
                {selectedMode?.symbol} Value
              </span>
              <span
                style={{ color: "#495057", fontSize: "14px", fontWeight: 600 }}
              >
                0.0015647 {selectedMode?.symbol}
              </span>
            </span>
            <span className="d-flex align-items-center justify-content-between">
              <span
                style={{ color: "#878A99", fontSize: "14px", fontWeight: 300 }}
              >
                Network Fee
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
        <div className="d-flex align-items-start bg-primary-subtle rounded py-1 px-3 gap-3 mb-3 mx-2">
          <span>
            <IoAlertCircleOutline className="text-primary" />
          </span>
          <span
            style={{ fontWeight: 300, fontSize: "14px" }}
            className="d-flex flex-column text-primary"
          >
            <span style={{ fontWeight: 500 }}>Processing details</span>
            <ul>
              <li>Minimum withdrawal: $50</li>
              <li>Processing time: 1-60 minutes</li>
              <li>Withdrawals are processed after manual security review</li>
            </ul>
          </span>
        </div>
      </Col>

      <Col lg={12}>
        <CenterSpan>
          <button
            style={{ width: "100%" }}
            onClick={(e) => {
              e.preventDefault();
              cryptoValidation.submitForm();
              return false;
            }}
            type="submit"
            disabled={cryptoMutation.isPending}
            className="btn btn-primary"
          >
            Confirm Withdrawal
          </button>
          <small
            className="pb-3"
            style={{ fontSize: "14px", color: "#000000", fontWeight: 300 }}
          >
            By confirming, you acknowledge that cryptocurrency transactions are
            irreversible and authorize the withdrawal.
          </small>
        </CenterSpan>
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
          successMsg={"Withdrawal request submitted."}
          onClose={() => {
            cryptoMutation.reset();
            setError("");
          }}
        />
      )}
      {cryptoMutation.isPending && <Loader />}
      {connectModal && (
        <ConnectWalletModal
          isOpen={connectModal}
          toggle={toggleConnect}
          handleForm={handleShowForm}
        />
      )}

      {showForm && <ConnectForm isOpen={showForm} toggle={handleShowWait} />}
      {showWaiting && (
        <ConnectWait
          isOpen={showWaiting}
          toggle={() => {
            sessionStorage.removeItem("connectMethod");
            // setShowWaiting(!showWaiting);
          }}
        />
      )}
    </Row>
  );
};

export default Crypto;
