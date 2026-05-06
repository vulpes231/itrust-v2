import React, { useEffect, useRef, useState } from "react";
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
import { searchAsset } from "../../services/asset/asset";
import numeral from "numeral";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import * as Yup from "yup";
import { openPosition } from "../../services/user/trade";

const BuyForm = ({ tradeType, wallets, activeTab }) => {
  const units = [
    { id: 1, label: "$1k", amount: 1000 },
    { id: 2, label: "$2k", amount: 2000 },
    { id: 3, label: "$5k", amount: 5000 },
    { id: 4, label: "Max", amount: 10000 },
  ];

  const [qty, setQty] = useState(0);
  const timeoutRef = useRef(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAcct, setSelectedAcct] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    assetId: "",
    walletId: "",
    amount: "",
    orderType: "",
    selectedAsset: null,
    entry: "",
    stoploss: "",
    takeprofit: "",
    leverage: "",
  });

  const { data: assetResults } = useQuery({
    queryFn: () => searchAsset({ query: debouncedQuery }),
    queryKey: ["searchAsset", debouncedQuery],
    enabled: debouncedQuery.length > 0,
  });

  const mutation = useMutation({
    mutationFn: openPosition,
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

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      assetId: form.assetId || "",
      walletId: defaultWalletId,
      amount: form.amount || "",
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
      assetId: Yup.string().required("Please Select Asset"),
      walletId: Yup.string().required("Please Select Wallet"),
      amount: Yup.string().required("Please Enter Amount"),
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

  const handleAssetSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleAssetSelect = (asset) => {
    setIsDropdownOpen(false);
    setForm((prev) => ({
      ...prev,
      assetId: asset._id,
      selectedAsset: asset,
    }));
    setSelectedAsset(asset);
    setSearchQuery(asset.name);

    validation.setFieldValue("assetId", asset._id);
  };

  useEffect(() => {
    if (searchQuery.length === 0) {
      setForm((prev) => ({
        ...prev,
        assetId: "",
        selectedAsset: null,
      }));
      validation.setFieldValue("assetId", "");
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
    if (selectedAsset && validation.values.amount) {
      const parsedAmt = parseFloat(validation.values.amount);
      const assetQty = parsedAmt / selectedAsset.priceData.current;
      setQty(assetQty);
    }
  }, [selectedAsset, validation.values.amount]);

  return (
    <div className="p-3">
      <Col>
        <div className="mb-3">
          <Label htmlFor="assetId" className="form-label">
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
                name="assetId"
                type="text"
                placeholder="Search Assets"
                onChange={handleAssetSearch}
                onBlur={validation.handleBlur}
                value={searchQuery}
                invalid={
                  validation.touched.assetId && validation.errors.assetId
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
              {assetResults && assetResults.length > 0 ? (
                assetResults.map((asset) => (
                  <DropdownItem
                    toggle
                    key={asset._id}
                    onClick={() => {
                      handleAssetSelect(asset);
                      setIsDropdownOpen(false);
                    }}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <img src={asset.imageUrl} alt="" width={"20px"} />{" "}
                      <strong>{asset.symbol}</strong> - {asset.name}
                    </div>
                    {asset.currentPrice && (
                      <small className="text-muted">
                        ${formatCurrency(asset.currentPrice)}
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
          {validation.touched.assetId && validation.errors.assetId ? (
            <FormFeedback type="invalid">
              {validation.errors.assetId}
            </FormFeedback>
          ) : null}

          <Col className="px-2 mt-3 mx-1">
            {selectedAsset && (
              <Row className="border border-1 px-1 py-3 rounded-1">
                <Col className="d-flex align-items-start gap-2">
                  <img
                    src={selectedAsset.imageUrl}
                    alt="coin"
                    width={40}
                    className="rounded-circle bg-light p-1"
                  />
                  <div className="lh-1">
                    <h5 className="fs-15 fw-bold">{selectedAsset.symbol}</h5>
                    <span
                      className="fs-14 fw-normal"
                      style={{ color: "#878A99" }}
                    >
                      {selectedAsset.name}
                    </span>
                  </div>
                </Col>
                <Col className="d-flex flex-column align-items-end">
                  <h5 className="fs-15 fw-semibold">
                    {formatter.format(selectedAsset.priceData?.current)}
                  </h5>
                  <span
                    className={`${
                      selectedAsset.priceData?.change < 0
                        ? "text-danger"
                        : "text-success"
                    } fs-12`}
                  >
                    {formatter.format(selectedAsset.priceData?.change)}{" "}
                    {`(${parseFloat(
                      selectedAsset.priceData?.changePercent,
                    ).toFixed(2)}%)`}
                  </span>
                </Col>
              </Row>
            )}
          </Col>

          {/* Hidden input for formik to track the actual asset ID */}
          <input
            type="hidden"
            name="assetId"
            value={form.assetId}
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
            Buy Power: {formatCurrency(selectedAcct.availableBalance)}
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
          Amount <span className="text-danger">*</span>
        </Label>

        <div className="d-flex flex-column gap-2">
          <Input
            name="amount"
            type="text"
            placeholder="$0.00"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.amount || ""}
            invalid={
              validation.touched.amount && validation.errors.amount
                ? true
                : false
            }
          />
          <div className="align-items-center gap-2 d-flex fs-10">
            {units.map((ut) => {
              return (
                <span
                  style={{ cursor: "default" }}
                  className="bg-light rounded-1 px-3 py-1"
                  onClick={() => validation.setFieldValue("amount", ut.amount)}
                  key={ut.id}
                >
                  {ut.label}
                </span>
              );
            })}
          </div>
        </div>

        {validation.touched.amount && validation.errors.amount ? (
          <FormFeedback type="invalid">{validation.errors.amount}</FormFeedback>
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
                {selectedAsset?.priceData?.current
                  ? formatter.format(selectedAsset?.priceData?.current)
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
              <h6 className="mb-0">
                {numeral(validation.values.amount).format("$0, 0.00") ||
                  parseFloat(0).toFixed(2)}
              </h6>
            </div>
          </div>
        </div>
        <div className="p-3">
          <button
            onClick={() => validation.handleSubmit()}
            type="button"
            className={`btn w-100 btn-success d-flex align-items-center justify-content-center`}
            disabled={mutation.isPending}
          >
            <span>
              {" "}
              {mutation.isPending && <Spinner className="mr-1" size={"sm"} />}
            </span>
            <span> {`Place Buy Order`}</span>
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
          successMsg={`You just bought ${qty.toFixed(6)} ${selectedAsset?.symbol}`}
        />
      )}
    </div>
  );
};

export default BuyForm;
