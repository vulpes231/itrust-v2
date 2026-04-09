import { useFormik } from "formik";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { formatMarketCap } from "../../constants";
import { useMutation } from "@tanstack/react-query";
import { openPosition } from "../../services/user/trade";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";

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

const execTypes = [
  { id: "market", label: "Market Order" },
  { id: "limit", label: "Limit Order" },
  { id: "stoploss", label: "Stop Loss Order" },
  { id: "takeprofit", label: "Take Profit Order" },
  { id: "leverage", label: "Leverage Order" },
];

const TradeSection = ({ asset, accounts }) => {
  const [activeOrder, setActiveOrder] = useState("buy");
  const [tradeType, setTradeType] = useState("market");
  const [selectedAcct, setSelectedAcct] = useState("");
  const [error, setError] = useState("");
  const [qty, setQty] = useState(0);

  const mutation = useMutation({
    mutationFn: openPosition,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      assetId: asset._id || "",
      walletId: "",
      amount: "",
      orderType: activeOrder || "",
      entry: asset?.priceData?.current || "",
      stoploss: "",
      takeprofit: "",
      leverage: tradeType === "leverage" || tradeType === "stoploss" ? "5" : "",
      executionType: tradeType,
    },
    onSubmit: (values) => {
      // console.log(values);
      mutation.mutate(values);
    },
  });

  const toggleActiveOrder = (type) => {
    setActiveOrder(type);
  };

  const handleTradeType = (e) => {
    setTradeType(e.target.value);
  };

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
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  return (
    <Card className="">
      <Row>
        <Col md={9} className="p-3">
          <Col className="border rounded-2">
            <h5 className="py-2 px-4 mt-2">Place Trade</h5>
            <div className="bg-secondary-subtle w-100 py-2">
              <Col xs={3}>
                <span>
                  <Input
                    type="select"
                    className="border-0 text-secondary bg-secondary-subtle shadow-none px-4"
                    onChange={handleTradeType}
                    name="tradeType"
                    value={tradeType}
                  >
                    <option value="">Select Order Type</option>
                    {execTypes.map((type) => {
                      return (
                        <option value={type.id} key={type.id}>
                          {type.label}
                        </option>
                      );
                    })}
                  </Input>
                </span>
              </Col>
            </div>
            <Col className="p-4 d-flex gap-2">
              <button
                onClick={() => toggleActiveOrder("buy")}
                className={`btn w-100 text-capitalize fw-bold ${
                  activeOrder === "buy" ? "btn-success" : "btn-light"
                }`}
              >
                buy
              </button>
              <button
                onClick={() => toggleActiveOrder("sell")}
                className={`btn w-100 text-capitalize fw-bold ${
                  activeOrder === "sell" ? "btn-danger" : "btn-light"
                }`}
              >
                sell
              </button>
            </Col>
            <hr />
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
                  {(accounts || []).map((acct) => {
                    return (
                      <option value={acct._id} key={acct._id}>
                        {acct.name}
                      </option>
                    );
                  })}
                </Input>
                <h6 className="fw-semibold py-1">
                  Buy Power:{" "}
                  {numeral(selectedAcct?.availableBalance).format("$0,0.00")}
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
                        className="bg-light px-4 py-2 rounded-2 fs-13 text-muted"
                        style={{ cursor: "default" }}
                        onClick={() =>
                          validation.setFieldValue("amount", btn.value)
                        }
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
                  <span>
                    {numeral(asset?.priceData?.current).format("$0,0.00")}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span>
                    Transaction Fees <sub className="text-muted">(0.05%)</sub>{" "}
                  </span>
                  <span>{numeral(0).format("$0,0.00")}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span>Total</span>
                  <span>
                    {numeral(validation.values.amount).format("$0,0.00")}
                  </span>
                </div>
              </Col>
              <Col className="mt-4">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className={`btn w-100 text-capitalize d-flex gap-2 align-items-center justify-content-center ${
                    activeOrder === "buy" ? "btn-success" : "btn-danger"
                  }`}
                >
                  {mutation.isPending && <Spinner size={"sm"}></Spinner>}
                  Place {activeOrder} Order
                </button>
              </Col>
            </form>
          </Col>
        </Col>
        <Col md={3} className="p-3">
          <div className="d-flex flex-column gap-4 border rounded-2 p-4">
            <div className="d-flex align-items-center justify-content-between">
              <span>
                <h5>{asset?.symbol}</h5>
                <span>{asset?.name}</span>
              </span>
              <span className="bg-light p-1 rounded-circle">
                <img src={asset?.imageUrl} alt="" width={30} />
              </span>
            </div>
            <div className="d-flex flex-column">
              <h5>{numeral(asset?.priceData?.current).format("$0,0.00")}</h5>
              <span
                className={`d-flex align-items-center gap-1 fs-12 ${
                  asset?.priceData?.changePercent < 0
                    ? "text-danger"
                    : "text-success"
                }`}
              >
                <span>
                  {numeral(asset?.priceData?.change).format("$0,0.00")}
                </span>
                <span>
                  ({parseFloat(asset?.priceData?.changePercent).toFixed(2)}%)
                </span>
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span className="d-flex flex-column">
                <Label className="text-muted fw-light">Market Cap</Label>
                <span className="fw-medium fs-15 text-capitalize">
                  {formatMarketCap(asset?.fundamentals?.marketCap)}
                </span>
              </span>
              <span className="d-flex flex-column align-items-end">
                <Label className="text-muted fw-light">Volume</Label>
                <span className="fw-medium fs-15">
                  {formatMarketCap(asset?.priceData?.volume)}
                </span>
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span className="d-flex flex-column">
                <Label className="text-muted fw-light">24 High</Label>
                <span className="fw-medium fs-15">
                  {numeral(asset?.priceData?.dayHigh).format("$0,0.00")}
                </span>
              </span>
              <span className="d-flex flex-column align-items-end">
                <Label className="text-muted fw-light">24 Low</Label>
                <span className="fw-medium fs-15">
                  {numeral(asset?.priceData?.dayLow).format("$0,0.00")}
                </span>
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span className="d-flex flex-column">
                <Label className="text-muted fw-light">P/E Ratio</Label>
                <span className="fw-medium fs-15">
                  {asset?.fundamentals?.pe || "-"}
                </span>
              </span>
              <span className="d-flex flex-column align-items-end">
                <Label className="text-muted fw-light">52 Weeks Range</Label>
                <span className="fw-medium fs-15">
                  {numeral(asset?.historical?.yearHigh).format("$0,0.00")} -{" "}
                  {numeral(asset?.historical?.yearLow).format("$0,0.00")}
                </span>
              </span>
            </div>
            <div>
              <button className="btn btn-soft-secondary text-secondary w-100">
                Add to Watchlist
              </button>
            </div>
          </div>
        </Col>
      </Row>
      {error && (
        <ErrorToast
          errorMsg={error}
          isOpen={!!error}
          onClose={() => setError("")}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          successMsg={`${asset?.symbol} Position Opened.`}
          onClose={() => mutation.reset()}
          isOpen={mutation.isSuccess}
        />
      )}
    </Card>
  );
};

export default TradeSection;
