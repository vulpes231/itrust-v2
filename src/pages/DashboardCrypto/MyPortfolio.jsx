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
import { useQuery } from "@tanstack/react-query";
import { getUserWallets } from "../../services/user/wallet";
import { capitalize } from "lodash";
import { formatCurrency } from "../../constants";

const MyPortfolio = () => {
  const { data: wallets, loading: isWalletLoading } = useQuery({
    queryFn: getUserWallets,
    queryKey: ["wallet"],
  });

  // Add "All" as default selection
  const [selectedWallet, setSelectedWallet] = useState("All");

  const onWalletChange = (wallet) => {
    setSelectedWallet(wallet);
  };

  // Filter wallets based on selection
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
      return filteredWallets.map((wallet) => wallet.totalBalance);
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

  // useEffect(() => {
  //   if (wallets) console.log(wallets);
  // }, [wallets]);

  return (
    <React.Fragment>
      <Col xl={4}>
        <div className="card card-height-100">
          <div className="card-header border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">My Portfolio</h4>
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
                series={getFilteredWallets()}
                selectedWallet={selectedWallet}
                chartData={getChartData()}
                chartLabels={getChartLabels()}
                dataColors='["--vz-primary", "--vz-info", "--vz-warning", "--vz-success"]'
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
                  return (
                    <div
                      key={wallet._id}
                      className={`list-group-item px-0 ${
                        index === getFilteredWallets().length - 1 ? "pb-0" : ""
                      }`}
                    >
                      <div className="d-flex">
                        <div className="flex-shrink-0 avatar-xs">
                          <span className="avatar-title bg-light p-1 rounded-circle">
                            <img
                              src={
                                wallet.name === "cash"
                                  ? cash
                                  : wallet.name === "brokerage"
                                  ? broke
                                  : auto
                              }
                              className="img-fluid"
                              alt=""
                            />
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          <h6 className="mb-1">{capitalize(wallet.name)}</h6>
                          <p className="fs-13 mb-0 text-muted">
                            <i
                              className={`mdi mdi-circle fs-10 align-middle  ${
                                wallet.name === "cash"
                                  ? "text-primary"
                                  : wallet.name === "brokerage"
                                  ? "text-warning"
                                  : "text-info"
                              }  me-1`}
                            ></i>
                            {wallet.name === "cash"
                              ? "cash"
                              : wallet.name === "brokerage"
                              ? "brokerage"
                              : "auto"}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-end">
                          <h6 className="mb-1">
                            {formatCurrency(wallet.totalBalance)}
                          </h6>
                          <p className="text-success fs-13 mb-0">
                            {formatCurrency(wallet.availableBalance)}
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
