import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  Col,
  FormFeedback,
  Input,
  Label,
  Row,
  TabContent,
  TabPane,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";
import classnames from "classnames";
import { getUserWallets } from "../../services/user/wallet";
import { searchAsset } from "../../services/asset/asset";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formatCurrency } from "../../constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { openPosition } from "../../services/user/trade";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import { capitalize } from "lodash";
import numeral from "numeral";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

const allowedTypes = [
  { id: "market", label: "Market Order" },
  // { id: "limit", label: "Limit Order" },
  // { id: "stoploss", label: "Stop Loss Order" },
  // { id: "takeprofit", label: "Take Profit Order" },
  { id: "leverage", label: "Leverage Order" },
];

const TradeCard = ({ walletData, tradingAccounts }) => {
  const [activeTab, setActiveTab] = useState("buy");

  const [tradeType, setTradeType] = useState({
    id: "market",
    label: "Market Order",
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  function handleTypeChange(type) {
    setTradeType(type);
  }

  return (
    <Card>
      <CardHeader className="d-flex flex-column gap-2">
        <Row className="bg-secondary-subtle">
          <Col>
            <div>
              <UncontrolledDropdown direction="start">
                <DropdownToggle
                  tag="button"
                  className="btn btn-soft-primary btn-sm"
                >
                  <span className="text-uppercase">
                    {tradeType.label}
                    <i className="mdi mdi-chevron-down align-middle ms-1"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu dropdown-menu-end">
                  {allowedTypes.map((type) => {
                    return (
                      <DropdownItem
                        key={type.id}
                        onClick={() => handleTypeChange(type)}
                        className={tradeType.id === type.id ? "active" : ""}
                      >
                        {capitalize(type.label)}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            {" "}
            <button
              className={`${
                activeTab === "buy"
                  ? "btn btn-success"
                  : "btn btn-light text-muted"
              } w-100 text-capitalize`}
              onClick={() => {
                toggleTab("buy");
              }}
              style={{ height: "45px" }}
            >
              buy
            </button>
          </Col>
          <Col>
            <button
              className={`${
                activeTab === "sell"
                  ? "btn btn-danger"
                  : " btn bg-light text-muted"
              } w-100 text-capitalize`}
              onClick={() => {
                toggleTab("sell");
              }}
              style={{ height: "45px" }}
            >
              sell
            </button>
          </Col>
        </Row>
      </CardHeader>
      <div className="card-body p-0">
        <TabContent activeTab={activeTab} className="p-0">
          <TabPane tabId="buy">
            <BuyForm
              tradeType={tradeType}
              wallets={tradingAccounts}
              activeTab={activeTab}
            />
          </TabPane>

          <TabPane tabId="sell">
            <SellForm
              tradeType={tradeType}
              wallets={tradingAccounts}
              activeTab={activeTab}
              walletData={walletData}
            />
          </TabPane>
        </TabContent>
      </div>
    </Card>
  );
};

export default TradeCard;
