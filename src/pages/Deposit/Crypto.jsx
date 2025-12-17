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
import { CenterSpan, CustomSpan, FlexRow } from "./DepositUtils";
import { FaDollarSign } from "react-icons/fa";
import { btc, dep, eth, usdt } from "../../assets";
import { IoAlertCircleOutline } from "react-icons/io5";

const Crypto = ({ settings }) => {
  const [error, setError] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  const handleMode = (asset) => {
    setSelectedMode(asset);
  };

  const cryptoMutation = useMutation({
    mutationFn: () => depositFunds(cryptoValidation.values),
    onError: (err) => setError(err.message),
  });

  const data = JSON.parse(sessionStorage.getItem("deposit"));

  const cryptoValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      method: selectedMode?.symbol || "",
      account: "cash",
      network: selectedMode?.network || "",
      amount: data.amount || "",
    },
    validationSchema: Yup.object({
      method: Yup.string().required("Select crypto method"),
      network: Yup.string().required("Select crypto network"),
      amount: Yup.string().required("Enter deposit amount"),
    }),
    onSubmit: (values) => {
      console.log("Submit clicked");
      console.log(values);
      // cryptoMutation.mutate();
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

  const getNetworks = (method) => {
    return methods.find((mt) => mt.id === method).network;
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

  // useEffect(() => {
  //   if (settings) console.log(settings);
  // }, [settings]);

  const getAddress = (name, network) => {
    const addressMap = {
      btc: { BTC: settings?.cryptoWallets["btc"] },
      eth: { ERC20: settings?.cryptoWallets["eth"] },
      usdt: {
        ERC20: settings?.cryptoWallets["usdtErc"],
        TRC20: settings?.cryptoWallets["usdtTrc"],
      },
    };

    return addressMap[name]?.[network] || null;
  };

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
              Cryptocurrency Deposit
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 300,
                color: "#878A99",
                // lineHeight: 2,
              }}
            >
              Choose your preferred cryptocurrency
            </span>
          </CustomSpan>
        </FlexRow>
      </div>
      <Col lg={12}>
        <div className="px-2">
          <Label
            className="pb-1"
            style={{ fontSize: "16px", color: "495057", fontWeight: 600 }}
          >
            Select Cryptocurrencies
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
                  <img src={mtd.img} alt="" width={25} />
                  <span className="d-flex flex-column">
                    <span>{mtd.label}</span>
                    <span>{mtd.network}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Col>
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
              Send exactly <b>{data?.amount}</b> <b>{selectedMode?.symbol}</b>{" "}
              to the address below{" "}
            </span>
            <span>
              Processing time: 1-30 minutes after network confirmation
            </span>
          </div>
        </div>
      </Col>
      <Col lg={12}>
        <div className="px-2">
          <span className="d-flex align-items-center justify-content-between">
            <Label
              style={{ fontSize: "16px", color: "495057", fontWeight: 600 }}
            >
              Deposit Address
            </Label>
            <img src={selectedMode?.img} alt="coin" width={20} />
          </span>

          <div className="d-flex flex-column">
            <hr style={{ color: "#dedede" }} />
            <div className="d-flex align-items-center justify-content-center">
              <img src={dep} alt="" width={"120px"} height={"120px"} />
            </div>
          </div>
        </div>
      </Col>

      <Col lg={12}>
        <div className="mb-3 px-2">
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
        <div className="d-flex align-items-start bg-warning-subtle rounded py-1 px-3 gap-3 mb-3 mx-2">
          <span>
            <IoAlertCircleOutline className="text-warning" />
          </span>
          <span
            style={{ fontWeight: 300, fontSize: "14px" }}
            className="d-flex flex-column text-warning"
          >
            <span style={{ fontWeight: 500 }}>Important</span>
            <ul>
              <li>Only send {selectedMode?.symbol} to this address</li>
              <li>
                Sending any other cryptocurrency will result in permanent loss
              </li>
              <li>Minimum deposit $50</li>
              <li>Deposit are credited after network confirmation</li>
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
            I have made payment
          </button>
          <small
            className="pb-3"
            style={{ fontSize: "14px", color: "#000000", fontWeight: 300 }}
          >
            After sending {selectedMode?.symbol}, click the button above. Your
            deposit will be credited after network confirmation.
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
