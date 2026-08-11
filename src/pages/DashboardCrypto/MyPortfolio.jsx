import React, { useState, useEffect } from "react";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

import { PortfolioCharts } from "./DashboardCryptoCharts";
import { auto, broke, btc, cash, dash, eth, ltc } from "../../assets";

import { capitalize } from "lodash";
import {
  formatCurrency,
  getTotalProfit,
  getWalletColorBySlug,
  getWalletLogoBySlug,
} from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/user/user";

const MyPortfolio = ({ wallets, walletData, walletAnalytics, networth }) => {
  const [selectedWallet, setSelectedWallet] = useState("All");

  const onWalletChange = (wallet) => {
    setSelectedWallet(wallet);
  };

  const { data: user } = useQuery({
    queryFn: getUserInfo,
    queryKey: ["user"],
  });

  const planTotal =
    user?.activePlans?.reduce((sum, plan) => {
      return sum + plan.balance.total;
    }, 0) ?? 0;

  const getFilteredWallets = () => {
    if (!wallets || wallets.length === 0) return [];

    if (selectedWallet === "All") {
      return wallets;
    }

    return wallets.filter((wallet) => wallet.name === selectedWallet);
  };

  const getChartData = () => {
    const filteredWallets = getFilteredWallets();
    if (!filteredWallets || filteredWallets.length === 0) return [100];

    if (selectedWallet === "All") {
      return filteredWallets.map((wallet) => wallet.balance.total);
    } else {
      return [100];
    }
  };

  const getChartLabels = () => {
    const filteredWallets = getFilteredWallets();
    if (!filteredWallets || filteredWallets.length === 0) return [];

    if (selectedWallet === "All") {
      return filteredWallets.map((wallet) => capitalize(wallet.name));
    } else {
      return [capitalize(selectedWallet)];
    }
  };

  return (
    <React.Fragment>
      <Col>
        <div className="card card-height-100">
          <div className="card-header border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">My Accounts</h4>
            <div>
              <UncontrolledDropdown direction="start">
                <DropdownToggle
                  tag="button"
                  className="btn btn-soft-primary btn-sm"
                >
                  <span className="text-uppercase">
                    {selectedWallet}
                    <i className="mdi mdi-chevron-down align-middle ms-1"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu dropdown-menu-end">
                  {/* Add "All" option */}
                  <DropdownItem
                    onClick={() => onWalletChange("All")}
                    className={selectedWallet === "All" ? "active" : ""}
                  >
                    All
                  </DropdownItem>
                  {wallets &&
                    wallets.length > 0 &&
                    wallets.map((wallet) => {
                      return (
                        <DropdownItem
                          key={wallet._id}
                          onClick={() => onWalletChange(wallet.name)}
                          className={
                            selectedWallet === wallet.name ? "active" : ""
                          }
                        >
                          {capitalize(wallet.name)}
                        </DropdownItem>
                      );
                    })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
          <div className="card-body">
            <div id="portfolio_donut_charts" className="apex-charts" dir="ltr">
              <PortfolioCharts
                walletData={walletData}
                series={getFilteredWallets()}
                selectedWallet={selectedWallet}
                chartData={getChartData()}
                chartLabels={getChartLabels()}
                walletAnalytics={walletAnalytics}
                networth={networth}
              />
            </div>

            {/* Scrollable list container */}
            <div
              className="list-group-flush mb-2 mt-3 pt-2"
              style={{
                maxHeight: wallets && wallets.length > 3 ? "200px" : "auto",
                overflowY: wallets && wallets.length > 3 ? "scroll" : "visible",
                paddingRight: wallets && wallets.length > 3 ? "5px" : "0",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {wallets &&
                wallets.length > 0 &&
                getFilteredWallets().map((wallet, index) => {
                  const totalAccountBalance =
                    wallet.balance.total + getTotalProfit(wallet, walletData);
                  return (
                    <div
                      key={wallet._id}
                      className={`list-group-item px-0 ${
                        index === getFilteredWallets().length - 1 ? "pb-0" : ""
                      }`}
                    >
                      <div className="d-flex">
                        <div className="flex-shrink-0 avatar-xs">
                          <span
                            style={{
                              backgroundColor: wallet.designTag
                                ? `${getWalletColorBySlug(wallet.designTag)}33`
                                : `${getWalletColorBySlug(wallet.slug)}33`,
                            }}
                            className="avatar-title text-muted p-1 rounded-circle"
                          >
                            <i
                              style={{
                                color: wallet.designTag
                                  ? getWalletColorBySlug(wallet.designTag)
                                  : getWalletColorBySlug(wallet.slug),
                              }}
                              className={
                                wallet.designTag
                                  ? getWalletLogoBySlug(wallet.designTag)
                                  : getWalletLogoBySlug(wallet.slug)
                              }
                            />
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h6 className="mb-1 text-capitalize">
                            {wallet.name}
                          </h6>
                          <p className="fs-10 mb-0 text-muted text-uppercase">
                            <i
                              style={{
                                color: wallet.designTag
                                  ? getWalletColorBySlug(wallet.designTag)
                                  : getWalletColorBySlug(wallet.slug),
                              }}
                              className={`mdi mdi-circle fs-10 align-middle me-1`}
                            ></i>
                            {wallet.slug}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-end">
                          <h6 className="mb-1">
                            {formatCurrency(totalAccountBalance)}
                          </h6>
                          <p className="text-success fs-13 mb-0">
                            {wallet.slug === "auto"
                              ? formatCurrency(
                                  wallet.balance.available - planTotal,
                                )
                              : formatCurrency(wallet.balance.available)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

export default MyPortfolio;
