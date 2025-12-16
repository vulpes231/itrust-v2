import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  Col,
  FormFeedback,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import classnames from "classnames";
import { getUserWallets, getWalletAnalytics } from "../../services/user/wallet";
import { searchAsset } from "../../services/asset/asset";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formatCurrency } from "../../constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { openPosition } from "../../services/user/trade";
import Loader from "../../components/Common/Loader";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import { capitalize } from "lodash";

const Trading = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timeoutRef = useRef(null);
  const [tradeType, setTradeType] = useState("market");
  const [selectedAsset, setSelectedAsset] = useState("");

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

  const mutation = useMutation({
    mutationFn: openPosition,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      assetId: form.assetId || "",
      walletId: form.walletId || "",
      amount: form.amount || "",
      orderType: activeTab || "",
      assetType: "",
      entry: "",
      stoploss: "",
      takeprofit: "",
      leverage: tradeType === "leverage" || tradeType === "stoploss" ? "5" : "",
      executionType: tradeType,
    },
    validationSchema: Yup.object({
      assetId: Yup.string().required("Please Select Asset"),
      walletId: Yup.string().required("Please Select Wallet"),
      amount: Yup.string().required("Please Enter Amount"),
      assetType: Yup.string().required("Please Select Asset Type"),
      leverage: Yup.string().when("executionType", {
        is: (value) => value === "leverage" || value === "stoploss",
        then: (schema) => schema.required("Please select leverage"),
        otherwise: (schema) => schema.notRequired(),
      }),
      // entry: Yup.string().required("Please Enter Entry Point"),
      // stoploss: Yup.string().required("Please Enter Stop Loss"),
      // takeprofit: Yup.string().required("Please Enter Take Profit"),
    }),

    onSubmit: (values) => {
      console.log(values);
      mutation.mutate(values);
    },
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

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
    setForm((prev) => ({
      ...prev,
      assetId: asset._id,
      selectedAsset: asset,
    }));
    setSearchQuery(asset.name);
    setIsDropdownOpen(false);
    setSelectedAsset(asset);

    validation.setFieldValue("assetId", asset._id);
  };

  const { data: walletAnalytics } = useQuery({
    queryFn: getWalletAnalytics,
    queryKey: ["walletAnalytics"],
  });

  const { data: wallets } = useQuery({
    queryFn: getUserWallets,
    queryKey: ["wallets"],
  });

  const { data: assetResults } = useQuery({
    queryFn: () => searchAsset(debouncedQuery),
    queryKey: ["searchAsset", debouncedQuery],
    enabled: debouncedQuery.length > 0,
  });

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
    if (mutation.isSuccess) {
      const timeout = setTimeout(() => {
        mutation.reset();
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [mutation.isSuccess]);

  const availableWallets =
    wallets && wallets.filter((w) => w.name !== "automated investing");

  const allowedTypes = [
    { id: "market", label: "Market Order" },
    { id: "limit", label: "Limit Order" },
    { id: "stoploss", label: "Stop Loss Order" },
    { id: "takeprofit", label: "Take Profit Order" },
    { id: "leverage", label: "Leverage Order" },
  ];

  function handleTypeChange(e) {
    setTradeType(e.target.value);
  }

  return (
    <React.Fragment>
      <Col xl={4}>
        <Card>
          <CardHeader className="align-items-center border-0 d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Trading</h4>
            <div className="flex-shrink-0">
              <Nav
                className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0"
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "buy" })}
                    onClick={() => {
                      toggleTab("buy");
                    }}
                  >
                    Buy
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "sell" })}
                    onClick={() => {
                      toggleTab("sell");
                    }}
                  >
                    Sell
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </CardHeader>
          <div className="card-body p-0">
            <TabContent activeTab={activeTab} className="p-0">
              <TabPane tabId="buy">
                <div className="p-3 bg-primary-subtle">
                  <Col xl={5}>
                    <Input
                      style={{
                        textTransform: "capitalize",
                        border: "none",
                        backgroundColor: "transparent",
                        // color: "purple",
                        outline: "none",
                      }}
                      name="tradeType"
                      value={tradeType}
                      onChange={handleTypeChange}
                      type="select"
                    >
                      {allowedTypes.map((type) => {
                        return (
                          <option
                            style={{ textTransform: "capitalize" }}
                            key={type.id}
                            value={type.id}
                          >
                            {type.label}
                          </option>
                        );
                      })}
                    </Input>
                  </Col>
                </div>
                <div className="p-3">
                  <Row>
                    <Col xs={12}>
                      <div className="mb-3">
                        <Label htmlFor="country" className="form-label">
                          Account <span className="text-danger">*</span>
                        </Label>
                        <Input
                          id="walletId"
                          name="walletId"
                          className="form-control"
                          type="select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.walletId || ""}
                          invalid={
                            validation.touched.walletId &&
                            validation.errors.walletId
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
                                  {wallet.name}
                                </option>
                              );
                            })}
                        </Input>
                        {validation.touched.walletId &&
                        validation.errors.walletId ? (
                          <FormFeedback type="invalid">
                            {validation.errors.walletId}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="mb-3">
                        <Label htmlFor="country" className="form-label">
                          Asset Type <span className="text-danger">*</span>
                        </Label>
                        <Input
                          id="assetType"
                          name="assetType"
                          className="form-control"
                          type="select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.assetType || ""}
                          invalid={
                            validation.touched.assetType &&
                            validation.errors.assetType
                              ? true
                              : false
                          }
                        >
                          <option value="">Select Asset Type</option>
                          {["crypto", "stock"].map((asset, index) => {
                            return (
                              <option key={index} value={asset}>
                                {asset}
                              </option>
                            );
                          })}
                        </Input>
                        {validation.touched.assetType &&
                        validation.errors.assetType ? (
                          <FormFeedback type="invalid">
                            {validation.errors.assetType}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col xs={12}>
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
                              placeholder="Search Asset (BTC, ETH, etc.)"
                              onChange={handleAssetSearch}
                              onBlur={validation.handleBlur}
                              value={searchQuery}
                              invalid={
                                validation.touched.assetId &&
                                validation.errors.assetId
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
                                  key={asset._id}
                                  onClick={() => handleAssetSelect(asset)}
                                  className="d-flex justify-content-between align-items-center"
                                >
                                  <div>
                                    <img
                                      src={asset.imageUrl}
                                      alt=""
                                      width={"20px"}
                                    />{" "}
                                    <strong>{asset.symbol}</strong> -{" "}
                                    {asset.name}
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
                        {validation.touched.assetId &&
                        validation.errors.assetId ? (
                          <FormFeedback type="invalid">
                            {validation.errors.assetId}
                          </FormFeedback>
                        ) : null}

                        {/* Hidden input for formik to track the actual asset ID */}
                        <input
                          type="hidden"
                          name="assetId"
                          value={form.assetId}
                          onChange={validation.handleChange}
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <div className="input-group mb-3">
                      <Label htmlFor="amount" className="form-label">
                        Amount <span className="text-danger">*</span>
                      </Label>
                      <div className="input-group mb-3">
                        <label className="input-group-text">Price</label>
                        <Input
                          name="amount"
                          type="text"
                          placeholder="Enter Amount"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.amount || ""}
                          invalid={
                            validation.touched.amount &&
                            validation.errors.amount
                              ? true
                              : false
                          }
                        />
                        <label className="input-group-text">$</label>
                      </div>

                      {validation.touched.amount && validation.errors.amount ? (
                        <FormFeedback type="invalid">
                          {validation.errors.amount}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Row>
                  <Row
                    style={{ display: tradeType === "limit" ? "flex" : "none" }}
                  >
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
                        {validation.touched.leverage &&
                        validation.errors.leverage ? (
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
                        {validation.touched.leverage &&
                        validation.errors.leverage ? (
                          <div className="invalid-feedback d-block">
                            {validation.errors.leverage}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <div className="mt-3 pt-2">
                    <div className="d-flex mb-2">
                      <div className="flex-grow-1">
                        <p className="mb-0">
                          Transaction Fees
                          <span className="text-muted ms-1 fs-13">(0.05%)</span>
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <h6 className="mb-0">$1.08</h6>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-2">
                    <button
                      onClick={() => validation.handleSubmit()}
                      type="button"
                      className={`btn btn-primary w-100`}
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending
                        ? `Wait...`
                        : `Buy ${form?.selectedAsset?.name || "Coin"}`}
                    </button>
                  </div>
                </div>
              </TabPane>

              <TabPane tabId="sell">
                <div className="p-3 bg-warning-subtle">
                  <div className="float-end ms-2">
                    <h6 className="text-warning mb-0">
                      USD Balance :{" "}
                      <span className="text-body">$12,426.07</span>
                    </h6>
                  </div>
                  <h6 className="mb-0 text-danger">Sell Coin</h6>
                </div>
                <div className="p-3">
                  <Row>
                    <Col xs-={6}>
                      <div className="mb-3">
                        <Label htmlFor="assetId" className="form-label">
                          Asset <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="assetId"
                          type="text"
                          placeholder="Search Asset"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.assetId || ""}
                          invalid={
                            validation.touched.assetId &&
                            validation.errors.assetId
                              ? true
                              : false
                          }
                        />
                        {validation.touched.assetId &&
                        validation.errors.assetId ? (
                          <FormFeedback type="invalid">
                            {validation.errors.assetId}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col xs-={6}>
                      <div className="mb-3">
                        <label>Email :</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="example@email.com"
                        />
                      </div>
                    </Col>
                  </Row>

                  <div>
                    <div className="input-group mb-3">
                      <label className="input-group-text">Amount</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <label className="input-group-text">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="2.045585"
                      />
                      <label className="input-group-text">$</label>
                    </div>
                    <div className="input-group mb-0">
                      <label className="input-group-text">Total</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="2700.16"
                      />
                    </div>
                  </div>
                  <div className="mt-3 pt-2">
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
                    <div className="d-flex mb-2">
                      <div className="flex-grow-1">
                        <p className="mb-0">
                          Minimum Received
                          <span className="text-muted ms-1 fs-11">(2%)</span>
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <h6 className="mb-0">$7.85</h6>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <p className="mb-0">Estimated Rate</p>
                      </div>
                      <div className="flex-shrink-0">
                        <h6 className="mb-0">1 BTC ~ $34572.00</h6>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-2">
                    <button type="button" className="btn btn-danger w-100">
                      Sell Coin
                    </button>
                  </div>
                </div>
              </TabPane>
            </TabContent>
          </div>
        </Card>
      </Col>
      {/* {mutation.isPending && <Loader />} */}
      {error && (
        <ErrorToast
          isOpen={error}
          onClose={() => {
            setError("");
            mutation.reset();
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
          successMsg={`${capitalize(validation.values.orderType)} position ${
            validation.values.orderType === "buy" ? "Opened" : "Closed"
          }`}
        />
      )}
    </React.Fragment>
  );
};

export default Trading;
