import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { getUserWallets, getWalletAnalytics } from "../../services/user/wallet";
import { searchAsset } from "../../services/asset/asset";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "../../constants";
import { useFormik } from "formik";
import * as Yup from "yup";

const Trading = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchQuery, setSearchQuery] = useState("");

  const [form, setForm] = useState({
    assetId: "",
    walletId: "",
    amount: "",
    type: "",
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      assetId: form.assetId || "",
      walletId: form.walletId || "",
      amount: form.amount || "",
      type: form.type || "",
    },
    validationSchema: Yup.object({}),
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
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
    queryFn: searchAsset,
    queryKey: ["wallets"],
  });

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
                  <h6 className="mb-0 text-danger">Buy Coin</h6>
                </div>
                <div className="p-3">
                  <Row>
                    <Col xs-={6}>
                      <div className="mb-3">
                        <label>Asset :</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Asset"
                        />
                      </div>
                    </Col>
                    <Col xs-={6}>
                      <div className="mb-3">
                        <label>Payment Method :</label>
                        <select className="form-select">
                          <option>Select Wallet</option>
                          {wallets &&
                            wallets.length > 0 &&
                            wallets.map((wallet) => {
                              return (
                                <option key={wallet._id} value={wallet._id}>
                                  {wallet.name}
                                </option>
                              );
                            })}
                        </select>
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
                        <h6 className="mb-0">1 BTC ~ $34572.00</h6>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-2">
                    <button type="button" className="btn btn-primary w-100">
                      Buy Coin
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
                        <label>Currency :</label>
                        <select className="form-select">
                          <option>BTC</option>
                          <option>ETH</option>
                          <option>LTC</option>
                        </select>
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
    </React.Fragment>
  );
};

export default Trading;
