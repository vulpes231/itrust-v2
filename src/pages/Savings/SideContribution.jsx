import React, { useEffect, useState } from "react";
import { Card, Col, Input, Label } from "reactstrap";
import { formatCurrency, getIconBg } from "../../constants";
import { useFormik } from "formik";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { fundSavings } from "../../services/user/savings";
import SuccessToast from "../../components/Common/SuccessToast";
import ErrorToast from "../../components/Common/ErrorToast";

const btns = ["1000", "2000", "5000", "Max"];

const SideContribution = ({ accts, handleIcon }) => {
  const retireAccts =
    accts &&
    accts.length > 0 &&
    accts.filter((acct) => acct.tag === "retirement");

  const [selectedAcct, setSelectedAcct] = useState(
    retireAccts ? retireAccts[0] : ""
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
  });

  const validation = useFormik({
    initialValues: {
      amount: amount || "",
    },
    onSubmit: (values) => {
      const data = { amount: values.amount, accountId: selectedAcct.accountId };
      mutation.mutate(data);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      const tmt = setTimeout(() => {
        mutation.reset();
        window.location.reload();
      }, 3000);

      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);

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
    if (retireAccts) {
      setSelectedAcct(retireAccts[0]);
    }
  }, [retireAccts]);

  return (
    <React.Fragment>
      <Card className="p-3 d-flex flex-column gap-4">
        <Col key={selectedAcct?._id} style={{ position: "relative" }}>
          <div className="d-flex align-items-end justify-content-between shadow py-2 px-3 rounded">
            <span className="d-flex align-items-center gap-3">
              <span
                style={{ backgroundColor: getIconBg(selectedAcct?.name) }}
                className=" px-1 rounded d-flex align-items-center justify-content-center"
              >
                {handleIcon(selectedAcct?.name)}{" "}
              </span>
              <span
                className="d-flex flex-column"
                // style={{  }}
              >
                <span
                  style={{ color: "#878A99" }}
                  className="fw-bold fs-13 d-flex align-items-center gap-2"
                >
                  {selectedAcct?.name}{" "}
                  <span onClick={handleShowAccount}>
                    {showAccounts ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                  <Card
                    className="py-2 px-4"
                    style={{
                      display: showAccounts ? "block" : "none",
                      position: "absolute",
                      top: "40px",
                      left: "170px",
                    }}
                  >
                    {retireAccts &&
                      retireAccts.length > 0 &&
                      retireAccts.map((acct) => {
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
                  </Card>
                </span>
                <span
                  style={{ color: "#495057" }}
                  className="fw-semibold fs-21"
                >
                  {formatCurrency(selectedAcct?.analytics?.balance || 0)}
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
          <div className="d-flex flex-column gap-2 mt-4">
            <span className="d-flex align-items-center justify-content-between gap-4">
              <span className="fs-14 fw-semibold">2025 IRA Contributions</span>
              <span className="fs-14 fw-semibold" style={{ color: "#878A99" }}>
                $0 / $7500
              </span>
            </span>
            <div
              style={{
                width: "100%",
                borderRadius: "5px",
                backgroundColor: "#EFF2F7",
              }}
            >
              <div
                style={{
                  width: "1%",
                  height: "10px",
                  backgroundColor: "blue",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
              ></div>
            </div>
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
                      btn === "Max" ? "100000" : btn
                    )
                  }
                >
                  {btn === "1000"
                    ? "$1k"
                    : btn === "2000"
                    ? "$2k"
                    : btn === "5000"
                    ? "$5k"
                    : btn}
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
              className="btn btn-primary"
            >
              {!mutation.isPending ? "Contribute to IRA" : "Wait..."}
            </button>
            <span
              className="fw-medium fs-14 py-1"
              style={{ color: "#000000", textAlign: "center" }}
            >
              Traditional IRA contributions may be tax-deductible. Consult your
              tax advisor. Annual limit for 2025: $7,000 ($8,000 if age 50+).
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
      </Card>
    </React.Fragment>
  );
};

export default SideContribution;
