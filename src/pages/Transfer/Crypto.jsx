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
import { CenterSpan, CustomSpan, FlexRow } from "../Deposit/DepositUtils";
import { BsFillSendFill } from "react-icons/bs";
import {
  formatCurrency,
  getWalletBg,
  getWalletColor,
  getWalletIcon,
} from "../../constants";
import { GoDotFill } from "react-icons/go";
import Loader from "../../components/Common/Loader";

const buttons = [
  "100",
  "1000",
  "2000",
  "5000",
  "10000",
  "20000",
  "50000",
  "100000",
];

const Crypto = () => {
  const [error, setError] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amt, setAmt] = useState("");

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
      fromWallet: selectedAccount._id || "",
      toWallet: toAccount._id || "",
      amount: amt || "",
    },
    validationSchema: Yup.object({
      amount: Yup.string().required("Enter withdrawal amount"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      mutation.mutate(values);
    },
    validateOnMount: true,
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
            <BsFillSendFill />
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
              Transfer Between Accounts
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 300,
                color: "#878A99",
                // lineHeight: 2,
              }}
            >
              Move funds between your investment accounts
            </span>
          </CustomSpan>
        </FlexRow>
      </div>
      <Col lg={12}>
        <div>
          <Label for="account" className="form-label">
            Account From
          </Label>
          <div className="d-flex flex-column gap-2">
            {wallets &&
              wallets.length > 0 &&
              wallets.map((wallet) => {
                return (
                  <div
                    className={`d-flex align-items-center gap-2 justify-content-between px-4 py-2 rounded  ${
                      selectedAccount._id === wallet._id
                        ? "bg-primary-subtle"
                        : ""
                    }`}
                    style={{
                      border:
                        selectedAccount._id === wallet._id
                          ? "1px solid #5156be"
                          : "1px solid #dedede",
                    }}
                    key={wallet._id}
                    onClick={() => setSelectedAccount(wallet)}
                  >
                    <div className={`d-flex align-items-center gap-3`}>
                      <figure
                        style={{
                          backgroundColor: getWalletBg(wallet.name),
                          // color: getWalletColor(wallet.name),
                        }}
                        className="p-1 d-flex align-items-center justify-content-center rounded"
                      >
                        <img
                          src={getWalletIcon(wallet.name)}
                          alt=""
                          width={20}
                        />
                      </figure>
                      <div className="d-flex flex-column gap-1">
                        <span
                          style={{
                            color: "#495057",
                            fontWeight: 600,
                            fontSize: "14px",
                          }}
                        >
                          {capitalize(wallet.name)}
                        </span>

                        <span
                          style={{
                            color: "#212529",
                            fontWeight: 300,
                            fontSize: "14px",
                          }}
                        >
                          Balance: {formatCurrency(wallet.availableBalance)}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        border:
                          selectedAccount._id === wallet._id
                            ? "3px solid #5156be"
                            : "3px solid #505050",
                        borderRadius: "50%",
                        width: "16px",
                        height: "16px",
                      }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <GoDotFill
                        style={{
                          display:
                            selectedAccount._id === wallet._id
                              ? "flex"
                              : "none",
                          color:
                            selectedAccount._id === wallet._id
                              ? "#5156be"
                              : "none",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Col>
      <Col>
        <div className="pb-4">
          <Label>Transfer Amount</Label>
          <Input
            name="amount"
            onChange={(e) => {
              setAmt(e.target.value);
            }}
            value={amt}
          />
          <FlexRow>
            {buttons.map((btn, idx) => {
              return (
                <button
                  style={{
                    fontSize: "10.5px",
                    color: "#878A99",
                    width: "90px",
                  }}
                  key={idx}
                  type="button"
                  className="btn bg-light mt-2"
                  onClick={() => {
                    setAmt(btn);
                  }}
                >
                  ${btn}
                </button>
              );
            })}
          </FlexRow>
        </div>
      </Col>

      <Col lg={12}>
        <div>
          <Label for="address" className="form-label">
            To Account
          </Label>
          <div className="d-flex flex-column gap-2">
            {wallets &&
              wallets.length > 0 &&
              wallets.map((wallet) => {
                return (
                  <div
                    className={`d-flex align-items-center gap-2 justify-content-between px-4 py-2 rounded  ${
                      toAccount._id === wallet._id ? "bg-primary-subtle" : ""
                    }`}
                    style={{
                      border:
                        toAccount._id === wallet._id
                          ? "1px solid #5156be"
                          : "1px solid #dedede",
                    }}
                    key={wallet._id}
                    onClick={() => setToAccount(wallet)}
                  >
                    <div className={`d-flex align-items-center gap-3`}>
                      <figure
                        style={{
                          backgroundColor: getWalletBg(wallet.name),
                          // color: getWalletColor(wallet.name),
                        }}
                        className="p-1 d-flex align-items-center justify-content-center rounded"
                      >
                        <img
                          src={getWalletIcon(wallet.name)}
                          alt=""
                          width={20}
                        />
                      </figure>
                      <div className="d-flex flex-column gap-1">
                        <span
                          style={{
                            color: "#495057",
                            fontWeight: 600,
                            fontSize: "14px",
                          }}
                        >
                          {capitalize(wallet.name)}
                        </span>

                        <span
                          style={{
                            color: "#212529",
                            fontWeight: 300,
                            fontSize: "14px",
                          }}
                        >
                          Balance: {formatCurrency(wallet.availableBalance)}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        border:
                          toAccount._id === wallet._id
                            ? "3px solid #5156be"
                            : "3px solid #505050",
                        borderRadius: "50%",
                        width: "16px",
                        height: "16px",
                      }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <GoDotFill
                        style={{
                          display:
                            toAccount._id === wallet._id ? "flex" : "none",
                          color:
                            toAccount._id === wallet._id ? "#5156be" : "none",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Col>

      <Col>
        <CenterSpan className="pt-4 px-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              validation.submitForm();
            }}
            style={{ width: "100%" }}
            className="btn btn-primary"
          >
            Confirm Transfer
          </button>
          <small
            className="pb-3"
            style={{ fontSize: "14px", color: "#000000", fontWeight: 300 }}
          >
            Transfer between accounts are instant and free of charge.
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
          successMsg={"Transfer completed."}
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

export default Crypto;
