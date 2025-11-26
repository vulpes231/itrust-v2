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

const Trading = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timeoutRef = useRef(null);

  const [form, setForm] = useState({
    assetId: "",
    walletId: "",
    amount: "",
    orderType: "",
    selectedAsset: null,
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
    },
    validationSchema: Yup.object({
      assetId: Yup.string().required("Please Select Asset"),
      walletId: Yup.string().required("Please Select Wallet"),
      amount: Yup.string().required("Please Enter Amount"),
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

    // Update formik values
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
                <div className="p-3 bg-warning-subtle">
                  <div className="float-end ms-2">
                    <h6 className="text-warning mb-0">
                      USD Balance :{" "}
                      <span className="text-body">
                        {formatCurrency(walletAnalytics?.totalBalance || 0)}
                      </span>
                    </h6>
                  </div>
                  <h6 className="mb-0 text-danger">
                    Buy {form?.selectedAsset?.name || "Coin"}
                  </h6>
                </div>
                <div className="p-3">
                  <Row>
                    <Col xs={6}>
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
                    <Col xs={6}>
                      <div className="mb-3">
                        <Label htmlFor="country" className="form-label">
                          Wallet <span className="text-danger">*</span>
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
                          <option value="">Select Wallet</option>
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
                  </Row>
                  <div>
                    <div className="input-group mb-3">
                      <Label htmlFor="amount" className="input-group-text">
                        Amount <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="amount"
                        type="text"
                        placeholder="Enter Amount"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.amount || ""}
                        invalid={
                          validation.touched.amount && validation.errors.amount
                            ? true
                            : false
                        }
                      />

                      {validation.touched.amount && validation.errors.amount ? (
                        <FormFeedback type="invalid">
                          {validation.errors.amount}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="input-group mb-3">
                      <label className="input-group-text">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={"0.00"}
                        value={form?.selectedAsset?.priceData?.current || ""}
                        readOnly
                      />
                      <label className="input-group-text">$</label>
                    </div>

                    <div className="input-group mb-0">
                      <label className="input-group-text">Total</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0.00"
                        value={
                          form.selectedAsset?.priceData.current &&
                          validation.values.amount
                            ? (
                                parseFloat(validation.values.amount).toFixed(
                                  2
                                ) / form.selectedAsset.priceData.current
                              ).toFixed(6)
                            : ""
                        }
                        readOnly
                      />
                    </div>
                  </div>
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
                    <div className="d-flex mb-2">
                      <div className="flex-grow-1">
                        <p className="mb-0">
                          Minimum Received
                          <span className="text-muted ms-1 fs-13">(2%)</span>
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
                        <h6 className="mb-0">
                          {form.selectedAsset
                            ? `1 ${
                                form.selectedAsset.symbol
                              } ~ ${formatCurrency(
                                form.selectedAsset.priceData.current
                              )}`
                            : "Select an asset"}
                        </h6>
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
    </React.Fragment>
  );
};

export default Trading;
