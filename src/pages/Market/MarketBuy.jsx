import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { openPosition } from "../../services/user/trade";
import numeral from "numeral";
import { Col, Label, Input, Spinner } from "reactstrap";
import SuccessToast from "../../components/Common/SuccessToast";
import ErrorToast from "../../components/Common/ErrorToast";
import { useFormik } from "formik";

const amountButtons = [
  {
    id: 1,
    label: "$100",
    value: 100,
  },
  {
    id: 2,
    label: "$1000",
    value: 1000,
  },
  {
    id: 3,
    label: "$2000",
    value: 2000,
  },
  {
    id: 4,
    label: "$5000",
    value: 5000,
  },
  {
    id: 5,
    label: "$10000",
    value: 10000,
  },
  {
    id: 6,
    label: "$25000",
    value: 25000,
  },
  {
    id: 7,
    label: "$50000",
    value: 50000,
  },
  {
    id: 8,
    label: "Max",
    value: 80000,
  },
];

const MarketBuy = ({ accounts, activeOrder, asset, tradeType }) => {
  const [selectedAcct, setSelectedAcct] = useState("");
  const [error, setError] = useState("");
  const [qty, setQty] = useState(0);

  const mutation = useMutation({
    mutationFn: openPosition,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        mutation.reset();
        window.location.reload();
      }, 3000);
    },
  });

  const tradeAccounts =
    (accounts &&
      accounts.length > 0 &&
      accounts.filter((acct) => acct.slug === "brokerage")) ||
    [];

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      assetId: asset?._id || "",
      walletId: "",
      amount: "",
      orderType: activeOrder || "",
      entry: asset?.priceData?.current || "",
      stoploss: "",
      takeprofit: "",
      leverage:
        tradeType.id === "leverage" || tradeType.id === "stoploss" ? "5" : "",
      executionType: tradeType.id,
    },
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate(values);
    },
  });

  const handleAccountChange = (e) => {
    const { value } = e.target;

    validation.handleChange(e);

    const account = accounts?.find((acct) => acct._id === value);

    setSelectedAcct(account || null);
  };

  useEffect(() => {
    if (asset && validation.values.amount) {
      const calc =
        parseFloat(validation.values.amount) / asset?.priceData?.current;
      setQty(calc);
    }
  }, [asset, validation.values.amount]);

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
      }}
      className="p-4"
    >
      <Col className="mb-3">
        <Label className="fs-16 fw-medium">
          Account <sup className="text-danger">*</sup>{" "}
        </Label>
        <Input
          type="select"
          className="text-capitalize"
          onChange={handleAccountChange}
          name="walletId"
          value={validation.values.walletId}
        >
          <option value="">Select Account</option>
          {(tradeAccounts || []).map((acct) => {
            return (
              <option value={acct._id} key={acct._id}>
                {acct.name.charAt(0).toUpperCase() + acct.name.slice(1)}
              </option>
            );
          })}
        </Input>
        <h6 className="fw-semibold py-1">
          Buy Power:{" "}
          {numeral(selectedAcct?.balance?.available).format("$0,0.00")}
        </h6>
      </Col>
      <Col>
        <Label className="fs-16 fw-medium">
          Amount <sup className="text-danger">*</sup>{" "}
        </Label>
        <Input
          type="text"
          name="amount"
          autoComplete="off"
          onChange={validation.handleChange}
          value={validation.values.amount}
          placeholder="$0.00"
        />
        <span className="d-flex align-items-center gap-2 mt-2">
          {amountButtons.map((btn) => {
            return (
              <span
                className="bg-light px-3 py-2 rounded-2 fs-10 text-muted"
                style={{ cursor: "default" }}
                onClick={() => validation.setFieldValue("amount", btn.value)}
                key={btn.id}
              >
                {btn.label}
              </span>
            );
          })}
        </span>
      </Col>
      <Col className="mt-4 d-flex flex-column gap-3">
        <div className="d-flex align-items-center justify-content-between">
          <span>Quantity</span>
          <span>{parseFloat(qty).toFixed(4)}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span>Cost Per Shares</span>
          <span>{numeral(asset?.priceData?.current).format("$0,0.00")}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span>
            Transaction Fees <sub className="text-muted">(0.05%)</sub>{" "}
          </span>
          <span>{numeral(0).format("$0,0.00")}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span>Total</span>
          <span>{numeral(validation.values.amount).format("$0,0.00")}</span>
        </div>
      </Col>
      <Col className="mt-4">
        <button
          type="submit"
          disabled={mutation.isPending}
          className={`btn w-100 text-capitalize d-flex gap-2 align-items-center justify-content-center btn-success`}
        >
          {mutation.isPending && <Spinner size={"sm"}></Spinner>}
          Place Buy Order
        </button>
      </Col>
      {error && (
        <ErrorToast
          errorMsg={error}
          isOpen={!!error}
          onClose={() => setError("")}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          successMsg={`You just bought ${qty.toFixed(6)} ${asset?.symbol}`}
          onClose={() => mutation.reset()}
          isOpen={mutation.isSuccess}
        />
      )}
    </form>
  );
};

export default MarketBuy;
