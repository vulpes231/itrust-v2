import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import { PiCoin } from "react-icons/pi";
import { RiBankLine } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { FaDollarSign } from "react-icons/fa";
import { CenterSpan, CustomSpan, FlexRow } from "./DepositUtils";
import ErrorToast from "../../components/Common/ErrorToast";

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

const paymentMethods = [
  {
    id: "crypto",
    comment: "In few minutes",
    title: "Cryptocurrencies",
    icon: <PiCoin className="text-warning" size={24} />,
  },
  {
    id: "bank",
    comment: "1 - 5 Business Days",
    title: "Bank Transfer (Wire Transfers)",
    icon: <RiBankLine className="text-info" size={24} />,
  },
];

const Form = ({ handleView, analytics }) => {
  const [selectedMethod, setSelectedMethod] = useState("crypto");

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  function handleConfirm(e) {
    e.preventDefault();

    if (analytics && analytics.pendingDeposit > 0) {
      setError("You have pending deposits!");
      return;
    }
    if (!amount) {
      setError("Amount required!");
      return;
    }

    const data = { method: selectedMethod, amount: amount };
    sessionStorage.setItem("deposit", JSON.stringify(data));
    handleView(data.method);
  }

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <React.Fragment>
      <div className="px-4 py-1" style={{ color: "#495057" }}>
        <div className="pb-4">
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
                Make a Deposit
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "#878A99",
                  // lineHeight: 2,
                }}
              >
                Add Funds to your Cash Account
              </span>
            </CustomSpan>
          </FlexRow>
        </div>
        <Col>
          <div className="pb-4">
            <Label>Deposit Amount</Label>
            <Input
              name="amount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              value={amount}
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
                      setAmount(btn);
                    }}
                  >
                    ${btn}
                  </button>
                );
              })}
            </FlexRow>
          </div>
        </Col>
        <Col>
          <div className="pb-4 px-2">
            <Label
              className="pb-2"
              style={{ fontSize: "17.5", fontWeight: 600 }}
            >
              Payment Method
            </Label>
            <div className="pb-4">
              {paymentMethods.map((method, idx) => {
                return (
                  <div
                    key={method.id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border:
                        selectedMethod === method.id
                          ? "3px solid #5b71b9"
                          : "none",

                      borderRadius: "5px",
                      cursor: "pointer",
                      backgroundColor:
                        selectedMethod === method.id ? "#E5E7F5" : "",
                    }}
                    onClick={() => {
                      setSelectedMethod(method.id);
                    }}
                    className={`p-3 `}
                  >
                    <FlexRow>
                      <span
                        style={{
                          backgroundColor:
                            idx === 0 ? "#FFF7E4" : idx === 1 ? "#DFF5FA" : "",
                          borderRadius: "5px",
                          display: "flex",
                          alignItems: "center",
                          justifyItems: "center",
                        }}
                        className="p-2"
                      >
                        {method.icon}
                      </span>
                      <CustomSpan>
                        <span style={{ fontSize: "16.8", fontWeight: 600 }}>
                          {method.title}
                        </span>
                        <small style={{ fontSize: "14px", fontWeight: 300 }}>
                          {method.comment}
                        </small>
                      </CustomSpan>
                    </FlexRow>
                    <span
                      style={{
                        border: "3px solid #5b71b9",
                        width: "13px",
                        height: "13px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyItems: "center",
                      }}
                    >
                      {selectedMethod === method.id && (
                        <GoDotFill className="text-primary" />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
        <Col>
          <CenterSpan className="pt-4 px-2">
            <button
              onClick={handleConfirm}
              style={{ width: "100%" }}
              className="btn btn-primary"
            >
              Confirm Deposit
            </button>
            <small
              className="pb-3"
              style={{ fontSize: "14px", color: "#000000", fontWeight: 300 }}
            >
              Your deposit is secure and encrypted. Funds will be available
              according to the payment method processing time.
            </small>
          </CenterSpan>
        </Col>
      </div>
      {error && (
        <ErrorToast
          isOpen={error}
          onClose={() => setError("")}
          errorMsg={error}
        />
      )}
    </React.Fragment>
  );
};

export default Form;
