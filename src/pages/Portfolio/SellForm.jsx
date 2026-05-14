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
import { formatCurrency, getAccessToken } from "../../constants";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import numeral from "numeral";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import * as Yup from "yup";
import {
  closePosition,
  getUserTrades,
  searchTrades,
} from "../../services/user/trade";
import { getUserPositions } from "../../services/user/position";
import { getAssetInfo } from "../../services/asset/asset";

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
  const [selectedTrade, setSelectedTrade] = useState(null);
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

  const tk = getAccessToken();

  const { data: positionData, loading: positionLoading } = useQuery({
    queryKey: ["positionData"],
    queryFn: getUserPositions,
    enabled: !!tk,
  });

  // const { data: assetInfo } = useQuery({
  //   queryKey: ["assetInfo", selectedTrade?.asset?.assetId],
  //   queryFn: () => getAssetInfo({ assetId: selectedTrade?.asset?.assetId }),
  //   enabled: !!selectedTrade?.asset?.assetId,
  // });

  const mutation = useMutation({
    mutationFn: closePosition,
    onError: (err) => {
      setError(err.message || "Failed to close position");
    },
    onSuccess: () => {
      mutation.reset();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  });

  const availableWallets = wallets?.filter((w) => w.slug === "brokerage") || [];
  const defaultWalletId = form.walletId || availableWallets?.[0]?._id || "";

  const positions = positionData?.positions || [];

  const transformedData = useMemo(() => {
    if (!positions || !selectedAcct) return [];

    const filteredTrades = positions.filter(
      (trd) => trd.wallet?.id === selectedAcct._id,
    );

    return filteredTrades.map((trade) => ({
      ...trade,
      img: trade.asset?.img,
      assetName: trade.asset?.name,
      assetSymbol: trade.asset?.symbol,
      currentValue: trade.currentValue,
      totalReturn: trade.retru,
      totalReturnPercent: trade.performance?.totalReturnPercent,
      currentPrice: trade.performance?.currentPrice,
    }));
  }, [positions, selectedAcct]);

  // console.log(positions);

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
        tradeType?.id === "leverage" || tradeType?.id === "stoploss" ? "2" : "",
      executionType: tradeType?.id || "",
    },
    validationSchema: Yup.object({
      percentToClose: Yup.string()
        .required("Please enter amount")
        .test(
          "is-valid-percentage",
          "Amount must be between 1 and 100",
          (value) => {
            if (!value) return false;
            const num = parseFloat(value);
            return !isNaN(num) && num >= 1 && num <= 100;
          },
        ),
      tradeId: Yup.string().required("Please select an asset"),
      leverage: Yup.string().when("executionType", {
        is: (value) => value === "leverage" || value === "stoploss",
        then: (schema) => schema.required("Please select leverage"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),

    onSubmit: (values) => {
      if (!selectedTrade) {
        setError("Please select an asset");
        return;
      }

      const submitData = {
        ...values,
        tradeId: selectedTrade._id,
        assetSymbol: selectedTrade.asset?.symbol,
      };

      console.log(submitData);
      mutation.mutate(submitData);
    },
  });

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleTradeSelect = (e) => {
    const tradeId = e.target.value;
    const trade = transformedData.find((t) => t._id === tradeId);

    if (trade) {
      setForm((prev) => ({
        ...prev,
        tradeId: trade._id,
        selectedTrade: trade,
      }));
      setSelectedTrade(trade);
      setSearchQuery(trade.asset?.name || "");
      validation.setFieldValue("tradeId", trade._id);
    } else {
      setSelectedTrade(null);
      validation.setFieldValue("tradeId", "");
    }
  };

  const handlePercentageClick = (percentage) => {
    validation.setFieldValue("percentToClose", percentage.toString());
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
        mutation.reset();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error, mutation]);

  useEffect(() => {
    if (availableWallets?.length && !validation.values.walletId) {
      validation.setFieldValue("walletId", availableWallets[0]._id);
      setSelectedAcct(availableWallets[0]);
    }
  }, [availableWallets, validation]);

  useEffect(() => {
    if (validation.values.walletId && wallets?.length) {
      const wallet = wallets.find(
        (wallet) => wallet._id === validation.values.walletId,
      );
      if (wallet) {
        setSelectedAcct(wallet);
      }
    }
  }, [validation.values.walletId, wallets]);

  useEffect(() => {
    if (selectedTrade && selectedTrade.performance) {
      const parsedAmt = parseFloat(selectedTrade.currentValue || 0);
      const currentPrice = selectedTrade.currentPrice || 1;
      const assetQty = parsedAmt / currentPrice;
      setQty(isNaN(assetQty) ? 0 : assetQty);
    } else {
      setQty(0);
    }
  }, [selectedTrade]);

  const calculatedAmount = useMemo(() => {
    if (!selectedTrade || !validation.values.percentToClose) {
      return { fee: 0, totalAmount: 0 };
    }

    const percent = parseFloat(validation.values.percentToClose) / 100;
    const totalValue = selectedTrade.performance?.totalReturn || 0;
    const amountToSell = totalValue * percent;
    const fee = amountToSell * 0.0005;

    return {
      fee,
      totalAmount: amountToSell,
      percentAmount: validation.values.percentToClose,
    };
  }, [selectedTrade, validation.values.percentToClose]);

  return (
    <div className="p-3">
      <Col>
        <Label htmlFor="walletId" className="form-label">
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
          {availableWallets.map((wallet) => (
            <option key={wallet._id} value={wallet._id}>
              {wallet.name
                ? wallet.name.charAt(0).toUpperCase() + wallet.name.slice(1)
                : "Account"}
            </option>
          ))}
        </Input>

        {validation.touched.walletId && validation.errors.walletId && (
          <FormFeedback type="invalid">
            {validation.errors.walletId}
          </FormFeedback>
        )}
      </Col>

      <Col>
        <div className="mb-3">
          <Label htmlFor="tradeId" className="form-label">
            Asset <span className="text-danger">*</span>
          </Label>
          <Input
            name="tradeId"
            type="select"
            onChange={handleTradeSelect}
            onBlur={validation.handleBlur}
            value={validation.values.tradeId || ""}
            invalid={
              validation.touched.tradeId && validation.errors.tradeId
                ? true
                : false
            }
            autoComplete="off"
            disabled={!selectedAcct}
          >
            <option value="">Select Asset</option>
            {transformedData.map((trd) => (
              <option key={trd._id} value={trd._id}>
                {trd.assetName} ({trd.assetSymbol})
              </option>
            ))}
          </Input>

          {selectedAcct && !transformedData.length && !positionLoading && (
            <div className="mt-2 text-muted">
              No assets found in this account
            </div>
          )}

          {selectedTrade && (
            <div className="mt-2">
              Current Value:{" "}
              {numeral(selectedTrade?.currentValue).format("$0,0.00")}
            </div>
          )}

          {validation.touched.tradeId && validation.errors.tradeId && (
            <FormFeedback type="invalid">
              {validation.errors.tradeId}
            </FormFeedback>
          )}

          {selectedTrade && (
            <Col className="px-2 mt-3 mx-1">
              <Row className="border border-1 px-1 py-3 rounded-1">
                <Col className="d-flex align-items-start gap-2">
                  <img
                    src={selectedTrade.asset?.img || "/default-avatar.png"}
                    alt="coin"
                    width={40}
                    className="rounded-circle bg-light p-1"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                  <div className="lh-1">
                    <h5 className="fs-15 fw-bold">
                      {selectedTrade.asset?.symbol || "N/A"}
                    </h5>
                    <span
                      className="fs-14 fw-normal"
                      style={{ color: "#878A99" }}
                    >
                      {selectedTrade.asset?.name || "Unknown"}
                    </span>
                  </div>
                </Col>
                <Col className="d-flex flex-column align-items-end">
                  <h5 className="fs-15 fw-semibold">
                    {formatter.format(selectedTrade?.currentValue || 0)}
                  </h5>
                  <span
                    className={`${
                      (selectedTrade.return || 0) < 0
                        ? "text-danger"
                        : "text-success"
                    } fs-12`}
                  >
                    {formatter.format(selectedTrade?.return || 0)}{" "}
                    {selectedTrade?.returnPercent &&
                      `(${parseFloat(selectedTrade.returnPercent).toFixed(2)}%)`}
                  </span>
                </Col>
              </Row>
            </Col>
          )}
        </div>
      </Col>

      <Col className="mb-3 mt-3">
        <Label htmlFor="percentToClose" className="form-label">
          Amount (%) <span className="text-danger">*</span>
        </Label>

        <div className="d-flex flex-column gap-2">
          <Input
            name="percentToClose"
            type="number"
            placeholder="Enter percentage (1-100)"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.percentToClose || ""}
            invalid={
              validation.touched.percentToClose &&
              validation.errors.percentToClose
                ? true
                : false
            }
            min="1"
            max="100"
          />
          <div className="align-items-center gap-2 d-flex fs-11">
            {units.map((ut) => (
              <span
                key={ut.id}
                style={{ cursor: "pointer" }}
                className="bg-light rounded-1 px-3 py-1"
                onClick={() => handlePercentageClick(ut.amount)}
              >
                {ut.label}
                {ut.label !== "Max" && "%"}
              </span>
            ))}
          </div>
        </div>

        {validation.touched.percentToClose &&
          validation.errors.percentToClose && (
            <FormFeedback type="invalid">
              {validation.errors.percentToClose}
            </FormFeedback>
          )}
      </Col>

      {(tradeType?.id === "limit" || tradeType === "limit") && (
        <Row>
          <div className="input-group mb-3">
            <label className="input-group-text">Entry Point</label>
            <Input
              name="entry"
              type="number"
              step="0.01"
              placeholder="0.00"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.entry || ""}
            />
          </div>
        </Row>
      )}

      {(tradeType?.id === "stoploss" || tradeType === "stoploss") && (
        <Row>
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
              {validation.touched.leverage && validation.errors.leverage && (
                <div className="invalid-feedback d-block">
                  {validation.errors.leverage}
                </div>
              )}
            </div>
          </Col>
          <Col xl={12}>
            <div className="input-group mb-3">
              <label className="input-group-text">Stop Loss</label>
              <Input
                name="stoploss"
                type="number"
                step="0.01"
                placeholder="0.00"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.stoploss || ""}
              />
            </div>
          </Col>
        </Row>
      )}

      {(tradeType?.id === "takeprofit" || tradeType === "takeprofit") && (
        <Row>
          <div className="input-group mb-3">
            <label className="input-group-text">Take Profit</label>
            <Input
              name="takeprofit"
              type="number"
              step="0.01"
              placeholder="0.00"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.takeprofit || ""}
            />
          </div>
        </Row>
      )}

      {(tradeType?.id === "leverage" || tradeType === "leverage") && (
        <Row>
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
              {validation.touched.leverage && validation.errors.leverage && (
                <div className="invalid-feedback d-block">
                  {validation.errors.leverage}
                </div>
              )}
            </div>
          </Col>
        </Row>
      )}

      <Col>
        <div className="mt-3 py-3 px-4">
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
                {selectedTrade?.performance?.currentPrice
                  ? formatter.format(selectedTrade.performance.currentPrice)
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
              <h6 className="mb-0">{formatter.format(calculatedAmount.fee)}</h6>
            </div>
          </div>
          <div className="d-flex">
            <div className="flex-grow-1">
              <p className="mb-0">Percentage to Sell</p>
            </div>
            <div className="flex-shrink-0">
              <h6 className="mb-0">{validation.values.percentToClose || 0}%</h6>
            </div>
          </div>
          <div className="d-flex mt-2 pt-2 border-top">
            <div className="flex-grow-1">
              <p className="mb-0 fw-bold">Estimated Total</p>
            </div>
            <div className="flex-shrink-0">
              <h6 className="mb-0 fw-bold">
                {formatter.format(calculatedAmount.totalAmount)}
              </h6>
            </div>
          </div>
        </div>

        <div className="p-3">
          <button
            onClick={() => {
              if (!selectedTrade) {
                setError("Please select an asset");
                return;
              }
              validation.handleSubmit();
            }}
            type="button"
            className="btn w-100 btn-danger d-flex align-items-center justify-content-center gap-2"
            disabled={mutation.isPending || !selectedTrade}
          >
            {mutation.isPending && <Spinner className="mr-1" size={"sm"} />}
            <span>
              {mutation.isPending ? "Processing..." : "Place Sell Order"}
            </span>
          </button>
        </div>
      </Col>

      {error && (
        <ErrorToast
          isOpen={!!error}
          onClose={() => setError("")}
          errorMsg={error}
        />
      )}

      {mutation.isSuccess && (
        <SuccessToast
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
          successMsg={`You sold ${parseFloat(qty).toFixed(6)} ${selectedTrade?.asset?.symbol || "assets"}`}
        />
      )}
    </div>
  );
};

export default SellForm;
