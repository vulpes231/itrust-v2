import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { formatCurrency } from "../../constants";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import numeral from "numeral";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import * as Yup from "yup";
import { closePosition, searchTrades } from "../../services/user/trade";

const SellForm = ({ tradeType, wallets, activeTab, walletData }) => {
  const units = [
    { id: 1, label: "25", amount: 25 },
    { id: 2, label: "50", amount: 50 },
    { id: 3, label: "75", amount: 75 },
    { id: 4, label: "Max", amount: 100 },
  ];

  const [qty, setQty] = useState(0);
  const timeoutRef = useRef(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAcct, setSelectedAcct] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    tradeId: "",
    walletId: "",
    amount: "",
    orderType: "",
    selectedTrade: null,
    entry: "",
    stoploss: "",
    takeprofit: "",
    leverage: "",
  });

  const { data: tradeResults } = useQuery({
    queryFn: () => searchTrades({ query: debouncedQuery }),
    queryKey: ["searchTrade", debouncedQuery],
    enabled: debouncedQuery.length > 0,
  });

  const mutation = useMutation({
    mutationFn: closePosition,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      mutation.reset();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  });

  const availableWallets =
    wallets && wallets.filter((w) => w.slug === "brokerage");
  const defaultWalletId = form.walletId || availableWallets?.[0]?._id || "";

  const transformedData = useMemo(() => {
    if (!tradeResults) return;

    const filteredTrades = tradeResults.filter(
      (trd) => trd.wallet.id === selectedAcct._id,
    );

    return filteredTrades.map((trade) => ({
      ...trade,
      img: trade.asset.img,
      assetName: trade.asset.name,
      assetSymbol: trade.asset.symbol,
      currentValue: trade.performance.currentValue,
      totalReturn: trade.performance.totalReturn,
      totalReturnPercent: trade.performance.totalReturnPercent,
      currentPrice: trade.performance.currentPrice,
    }));
  }, [tradeResults, selectedAcct]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      tradeId: "",
      percentToClose: "",
      walletId: defaultWalletId,
      orderType: activeTab || "",
      assetType: "",
      entry: "",
      stoploss: "",
      takeprofit: "",
      leverage:
        tradeType.id === "leverage" || tradeType.id === "stoploss" ? "2" : "",
      executionType: tradeType.id,
    },
    validationSchema: Yup.object({
      percentToClose: Yup.string().required("Please Enter Amount"),
      leverage: Yup.string().when("executionType", {
        is: (value) => value === "leverage" || value === "stoploss",
        then: (schema) => schema.required("Please select leverage"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),

    onSubmit: (values) => {
      console.log(values);
      mutation.mutate(values);
    },
  });

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);

  const handleTradeSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleTradeSelect = (trade) => {
    setIsDropdownOpen(false);
    setForm((prev) => ({
      ...prev,
      tradeId: trade._id,
      selectedTrade: trade,
    }));
    setSelectedTrade(trade);
    setSearchQuery(trade.asset.name);

    validation.setFieldValue("tradeId", trade._id);
  };

  useEffect(() => {
    if (searchQuery.length === 0) {
      setForm((prev) => ({
        ...prev,
        tradeId: "",
        selectedTrade: null,
      }));
      validation.setFieldValue("tradeId", "");
    }
  }, [searchQuery]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
        mutation.reset();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    if (availableWallets?.length && !validation.values.walletId) {
      validation.setFieldValue("walletId", availableWallets[0]._id);
      setSelectedAcct(availableWallets[0]);
    }
  }, [availableWallets]);

  useEffect(() => {
    if (validation.values.walletId) {
      const wallet = wallets.find(
        (wallet) => wallet._id === validation.values.walletId,
      );
      setSelectedAcct(wallet);
    }
  }, [validation.values.walletId]);

  useEffect(() => {
    if (selectedTrade) {
      const parsedAmt = parseFloat(selectedTrade.performance.currentValue);
      const assetQty = parsedAmt / selectedTrade.performance.currentPrice;
      setQty(assetQty);
    }
  }, [selectedTrade]);

  return (
    <div className="p-3">
      <Col>
        <div className="mb-3">
          <Label htmlFor="tradeId" className="form-label">
            Asset <span className="text-danger">*</span>
          </Label>
          <Dropdown
            isOpen={isDropdownOpen}
            toggle={toggleDropdown}
            className="w-100"
          >
            <DropdownToggle
              tag="div"
              className="p-0 border-0"
              style={{ cursor: "pointer" }}
            >
              <Input
                name="tradeId"
                type="text"
                placeholder="Search Assets"
                onChange={handleTradeSearch}
                onBlur={validation.handleBlur}
                value={searchQuery}
                invalid={
                  validation.touched.tradeId && validation.errors.tradeId
                    ? true
                    : false
                }
                autoComplete="off"
              />
            </DropdownToggle>
            <DropdownMenu
              className="w-100"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {transformedData && transformedData.length > 0 ? (
                transformedData.map((trade) => (
                  <DropdownItem
                    toggle
                    key={trade._id}
                    onClick={() => {
                      handleTradeSelect(trade);
                      setIsDropdownOpen(false);
                    }}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <img src={trade.img} alt="" width={"20px"} />{" "}
                      <strong>{trade.assetSymbol}</strong> - {trade.assetName}
                    </div>
                    {trade.currentValue && (
                      <small className="text-muted">
                        {formatCurrency(trade.currentValue)}
                      </small>
                    )}
                  </DropdownItem>
                ))
              ) : debouncedQuery.length > 0 ? (
                <DropdownItem disabled>
                  No assets found for "{debouncedQuery}"
                </DropdownItem>
              ) : (
                <DropdownItem disabled>
                  Start typing to search assets...
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
          {validation.touched.tradeId && validation.errors.tradeId ? (
            <FormFeedback type="invalid">
              {validation.errors.tradeId}
            </FormFeedback>
          ) : null}

          <Col className="px-2 mt-3 mx-1">
            {selectedTrade && (
              <Row className="border border-1 px-1 py-3 rounded-1">
                <Col className="d-flex align-items-start gap-2">
                  <img
                    src={selectedTrade.asset.img}
                    alt="coin"
                    width={40}
                    className="rounded-circle bg-light p-1"
                  />
                  <div className="lh-1">
                    <h5 className="fs-15 fw-bold">
                      {selectedTrade.asset.symbol}
                    </h5>
                    <span
                      className="fs-14 fw-normal"
                      style={{ color: "#878A99" }}
                    >
                      {selectedTrade.asset.name}
                    </span>
                  </div>
                </Col>
                <Col className="d-flex flex-column align-items-end">
                  <h5 className="fs-15 fw-semibold">
                    {formatter.format(selectedTrade.performance?.totalReturn)}
                  </h5>
                  <span
                    className={`${
                      selectedTrade.performance?.totalReturn < 0
                        ? "text-danger"
                        : "text-success"
                    } fs-12`}
                  >
                    {formatter.format(selectedTrade.performance?.totalReturn)}{" "}
                    {`(${parseFloat(
                      selectedTrade.performance?.totalReturnPercent,
                    ).toFixed(2)}%)`}
                  </span>
                </Col>
              </Row>
            )}
          </Col>

          {/* Hidden input for formik to track the actual asset ID */}
          <input
            type="hidden"
            name="tradeId"
            value={form.tradeId}
            onChange={validation.handleChange}
          />
        </div>
      </Col>
      <Col>
        <Label htmlFor="country" className="form-label">
          Account <span className="text-danger">*</span>
        </Label>
        <Input
          id="walletId"
          name="walletId"
          className="form-control text-capitalize"
          type="select"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.walletId || ""}
          invalid={
            validation.touched.walletId && validation.errors.walletId
              ? true
              : false
          }
        >
          <option value="">Select Account</option>
          {availableWallets &&
            availableWallets.length > 0 &&
            availableWallets.map((wallet) => {
              return (
                <option key={wallet._id} value={wallet._id}>
                  {wallet.name.charAt(0).toUpperCase() + wallet.name.slice(1)}
                </option>
              );
            })}
        </Input>
        {selectedAcct && (
          <div className="mt-2">
            Asset Value:{" "}
            {(selectedTrade &&
              numeral(selectedTrade.performance.totalReturn).format(
                "$0,0.00",
              )) ||
              0}
          </div>
        )}
        {validation.touched.walletId && validation.errors.walletId ? (
          <FormFeedback type="invalid">
            {validation.errors.walletId}
          </FormFeedback>
        ) : null}
      </Col>

      <Col className="mb-3 mt-3">
        <Label htmlFor="amount" className="form-label">
          Amount (%) <span className="text-danger">*</span>
        </Label>

        <div className="d-flex flex-column gap-2">
          <Input
            name="percentToClose"
            type="text"
            placeholder=""
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.percentToClose || ""}
            invalid={
              validation.touched.percentToClose &&
              validation.errors.percentToClose
                ? true
                : false
            }
          />
          <div className="align-items-center gap-2 d-flex fs-12">
            {units.map((ut) => {
              return (
                <span
                  style={{ cursor: "default" }}
                  className="bg-light rounded-1 px-4 py-1"
                  onClick={() =>
                    validation.setFieldValue("percentToClose", ut.amount)
                  }
                  key={ut.id}
                >
                  {ut.label}
                  {ut.label !== "Max" && "%"}
                </span>
              );
            })}
          </div>
        </div>

        {validation.touched.percentToClose &&
        validation.errors.percentToClose ? (
          <FormFeedback type="invalid">
            {validation.errors.percentToClose}
          </FormFeedback>
        ) : null}
      </Col>

      <Row style={{ display: tradeType === "limit" ? "flex" : "none" }}>
        <div className="input-group mb-3">
          <label className="input-group-text">Entry Point</label>
          <Input
            name="entry"
            type="text"
            placeholder="0.00"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.entry || ""}
          />
        </div>
      </Row>
      <Row
        style={{
          display: tradeType === "stoploss" ? "flex" : "none",
        }}
      >
        <Col xl={12}>
          <div className="input-group mb-3">
            <label className="input-group-text">Leverage</label>
            <Input
              name="leverage"
              type="select"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.leverage}
            >
              <option value="">Select Leverage</option>
              <option value="5">5x</option>
              <option value="10">10x</option>
              <option value="20">20X</option>
              <option value="30">30X</option>
              <option value="50">50X</option>
            </Input>
            {validation.touched.leverage && validation.errors.leverage ? (
              <div className="invalid-feedback d-block">
                {validation.errors.leverage}
              </div>
            ) : null}
          </div>
        </Col>
        <Col xl={12}>
          <div className="input-group mb-3">
            <label className="input-group-text">Stop Loss</label>
            <Input
              name="stoploss"
              type="text"
              placeholder="0.00"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.stoploss || ""}
            />
          </div>
        </Col>
      </Row>
      <Row
        style={{
          display: tradeType === "takeprofit" ? "flex" : "none",
        }}
      >
        <div className="input-group mb-3">
          <label className="input-group-text">Take Profit</label>
          <Input
            name="takeprofit"
            type="text"
            placeholder="0.00"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.takeprofit || ""}
          />
        </div>
      </Row>
      <Row
        style={{
          display: tradeType === "leverage" ? "flex" : "none",
        }}
      >
        <Col xl={12}>
          <div className="input-group mb-3">
            <label className="input-group-text">Leverage</label>
            <Input
              name="leverage"
              type="select"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.leverage}
            >
              <option value="">Select Leverage</option>
              <option value="5">5x</option>
              <option value="10">10x</option>
              <option value="20">20X</option>
              <option value="30">30X</option>
              <option value="50">50X</option>
            </Input>
            {validation.touched.leverage && validation.errors.leverage ? (
              <div className="invalid-feedback d-block">
                {validation.errors.leverage}
              </div>
            ) : null}
          </div>
        </Col>
      </Row>
      <Col>
        <div className="mt-3 p-3">
          <div className="d-flex mb-2">
            <div className="flex-grow-1">
              <p className="mb-0">Quantity</p>
            </div>
            <div className="flex-shrink-0">
              <h6 className="mb-0">{parseFloat(qty).toFixed(4)} shares</h6>
            </div>
          </div>
          <div className="d-flex mb-2">
            <div className="flex-grow-1">
              <p className="mb-0">Cost per share</p>
            </div>
            <div className="flex-shrink-0">
              <h6 className="mb-0">
                {selectedTrade?.priceData?.current
                  ? formatter.format(selectedTrade?.priceData?.current)
                  : numeral(0).format("$0,0.00")}
              </h6>
            </div>
          </div>
          <div className="d-flex mb-2">
            <div className="flex-grow-1">
              <p className="mb-0">
                Transaction Fees
                <span className="text-muted ms-1 fs-11">(0.05%)</span>
              </p>
            </div>
            <div className="flex-shrink-0">
              <h6 className="mb-0">$1.08</h6>
            </div>
          </div>
          <div className="d-flex">
            <div className="flex-grow-1">
              <p className="mb-0">Total</p>
            </div>
            <div className="flex-shrink-0">
              <h6 className="mb-0">{validation.values.percentToClose || 0}%</h6>
            </div>
          </div>
        </div>
        <div className="p-3">
          <button
            onClick={() => {
              console.log("clicked sell");
              validation.handleSubmit();
            }}
            type="button"
            className={`btn w-100 btn-danger d-flex align-items-center justify-content-center gap-2`}
            disabled={mutation.isPending}
          >
            <span>
              {" "}
              {mutation.isPending && <Spinner className="mr-1" size={"sm"} />}
            </span>
            <span> {`Place Sell Order`}</span>
          </button>
        </div>
      </Col>
      {error && (
        <ErrorToast
          isOpen={error}
          onClose={() => {
            setError("");
          }}
          errorMsg={error}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          isOpen={mutation.isSuccess}
          onClose={() => {
            mutation.reset();
          }}
          successMsg={`You just sold ${qty.toFixed(6)} ${selectedTrade?.asset?.symbol}`}
        />
      )}
    </div>
  );
};

export default SellForm;
