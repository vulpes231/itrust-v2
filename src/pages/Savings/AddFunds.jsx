import React, { useEffect, useState } from "react";
import { Card, Col, Input, Label } from "reactstrap";
import { formatCurrency, getIconBg } from "../../constants";
import { useFormik } from "formik";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { fundSavings } from "../../services/user/savings";
import SuccessToast from "../../components/Common/SuccessToast";
import ErrorToast from "../../components/Common/ErrorToast";
import numeral from "numeral";

const btns = ["100", "1000", "2000", "5000", "10000", "25000", "50000", "Max"];

const AddFunds = ({ accts, handleIcon, cash }) => {
  const saveAccts =
    accts && accts.length > 0 && accts.filter((acct) => acct.tag === "savings");

  const [selectedAcct, setSelectedAcct] = useState(
    saveAccts ? saveAccts[0] : "",
  );
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [showAccounts, setShowAccounts] = useState(false);

  const handleShowAccount = () => {
    setShowAccounts(!showAccounts);
  };

  const mutation = useMutation({
    mutationFn: fundSavings,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  });

  const validation = useFormik({
    initialValues: {
      amount: amount || "",
    },
    onSubmit: (values) => {
      const amount = parseFloat(values.amount);

      if (!amount || amount < 0) {
        setError("Enter amount to fund!");
        return;
      }

      if (amount < selectedAcct?.depositLimit?.min) {
        setError(
          `Deposit limit is ${numeral(selectedAcct?.depositLimit?.min).format("$0,0.00")}`,
        );
        return;
      }

      if (amount > selectedAcct?.depositLimit?.max) {
        setError(
          `Deposit limit is ${numeral(selectedAcct?.depositLimit?.max).format("$0,0.00")}`,
        );
        return;
      }
      if (amount > cash?.balance?.available) {
        setError(`You don't have available cash!`);
        return;
      }
      const data = { amount: values.amount, accountId: selectedAcct.accountId };
      console.log(data);

      mutation.mutate(data);
    },
  });

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
        mutation.reset();
      }, 3000);

      return () => clearTimeout(tmt);
    }
  }, [error]);

  useEffect(() => {
    if (saveAccts) {
      setSelectedAcct(saveAccts[0]);
    }
  }, [saveAccts]);

  return (
    <div className="py-4 d-flex flex-column gap-4">
      <Col key={selectedAcct?._id} style={{ position: "relative" }}>
        <Card>
          <div className="d-flex align-items-end justify-content-between shadow p-3 rounded border border-1">
            <span className="d-flex align-items-center gap-3">
              <span className="py-2 px-3 rounded d-flex align-items-center justify-content-center bg-danger-subtle">
                {handleIcon(selectedAcct?.name)}
              </span>
              <span className="d-flex flex-column">
                <span className="fw-bold fs-13 d-flex align-items-center gap-2 text-uppercase text-muted">
                  {selectedAcct?.name}
                  <span onClick={handleShowAccount}>
                    {showAccounts ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                  <Col
                    className="py-2 px-4"
                    style={{
                      display: showAccounts ? "block" : "none",
                      position: "absolute",
                      top: "0px",
                      left: "200px",
                    }}
                  >
                    {saveAccts &&
                      saveAccts.length > 0 &&
                      saveAccts.map((acct) => {
                        return (
                          <div
                            onClick={() => {
                              setSelectedAcct(acct);
                              handleShowAccount();
                            }}
                            key={acct._id}
                          >
                            {acct.name}
                          </div>
                        );
                      })}
                  </Col>
                </span>
                <span
                  style={{ color: "#495057" }}
                  className="fw-semibold fs-21"
                >
                  {formatCurrency(
                    selectedAcct?.analytics?.balance?.available || 0,
                  )}
                </span>
              </span>
            </span>
            <span
              style={{ color: "#3AB67A" }}
              className="fw-semibold fs-9 bg-success-subtle py-1 px-2 rounded"
            >
              {selectedAcct?.analytics?.dailyChange}%
            </span>
          </div>
        </Card>
        <div className="d-flex flex-column gap-2 mt-4">
          <span className="d-flex align-items-center justify-content-between gap-4">
            <span className="fs-14 fw-semibold">
              Estimated Monthly Interest
            </span>
            <span className="fs-14 fw-semibold" style={{ color: "#878A99" }}>
              {selectedAcct?.rate}%
            </span>
          </span>
        </div>
      </Col>
      <Col>
        <Label>Contribution Amount</Label>
        <Input
          type="text"
          placeholder="$0.00"
          value={validation.values.amount}
          onChange={validation.handleChange}
          name="amount"
        />
        <div className="d-flex align-items-center justify-content-evenly gap-1 py-2">
          {btns.map((btn, idx) => {
            return (
              <button
                style={{
                  fontSize: "10.5px",
                  color: "#878A99",
                  // width: "90px",
                }}
                key={idx}
                className="btn btn-light w-100"
                onClick={() =>
                  validation.setFieldValue(
                    "amount",
                    btn === "Max" ? "100000" : btn,
                  )
                }
              >
                {btn}
              </button>
            );
          })}
        </div>
        <div className="d-flex flex-column mt-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              validation.submitForm();
            }}
            disabled={mutation.isPending}
            className="btn btn-success"
          >
            {!mutation.isPending ? "Add Savings" : "Wait..."}
          </button>
          <span
            className="fw-regular fs-14 py-1"
            style={{ color: "#212529", textAlign: "center" }}
          >
            Interest calculated daily, paid monthly. FDIC insured up to
            $250,000.
          </span>
        </div>
      </Col>
      {error && (
        <ErrorToast
          errorMsg={error}
          onClose={() => setError("")}
          isOpen={error}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          successMsg={"Contribution added."}
          onClose={() => {
            mutation.reset();
          }}
          isOpen={mutation.isSuccess}
        />
      )}
    </div>
  );
};

export default AddFunds;
