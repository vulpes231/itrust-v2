import { useFormik } from "formik";
import numeral from "numeral";
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Row,
  Spinner,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import { formatMarketCap } from "../../constants";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { openPosition } from "../../services/user/trade";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import { capitalize } from "lodash";
import MarketBuy from "./MarketBuy";
import SellForm from "../Portfolio/SellForm";
import { getAssetInfo } from "../../services/asset/asset";
import { addToWatchList } from "../../services/watchlist/watchlist";
import { getUserInfo } from "../../services/user/user";

const execTypes = [
  { id: "market", label: "Market Order" },
  // { id: "limit", label: "Limit Order" },
  // { id: "stoploss", label: "Stop Loss Order" },
  // { id: "takeprofit", label: "Take Profit Order" },
  { id: "leverage", label: "Leverage Order" },
];

const TradeSection = ({ asset, accounts, walletData }) => {
  const [activeOrder, setActiveOrder] = useState("buy");
  const [error, setError] = useState("");

  const [tradeType, setTradeType] = useState({
    id: "market",
    label: "Market Order",
  });

  const toggleActiveOrder = (type) => {
    setActiveOrder(type);
  };

  const handleTradeType = (type) => {
    setTradeType(type);
  };

  const { data: user, isLoading: getUserLoading } = useQuery({
    queryFn: () => getUserInfo(),
    queryKey: ["user"],
  });

  const watchlistIds = useMemo(() => {
    return new Set(
      user?.watchList?.map((item) => item.assetId?.toString()) || [],
    );
  }, [user?.watchList]);

  const addAssetToWatchList = useMutation({
    mutationFn: addToWatchList,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });

  return (
    <Row>
      <Col md={8}>
        <Card>
          <Col className="border rounded-2">
            <h5 className="py-2 px-4 mt-2">Place Trade</h5>
            <div className="bg-secondary-subtle w-100 py-2">
              <Col xs={3}>
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
                      {execTypes.map((type) => {
                        return (
                          <DropdownItem
                            key={type.id}
                            onClick={() => handleTradeType(type)}
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
            </div>
            <Col className="p-3 d-flex gap-2">
              <button
                onClick={() => toggleActiveOrder("buy")}
                className={`btn w-100 text-capitalize ${
                  activeOrder === "buy" ? "btn-success" : "btn-light text-muted"
                }`}
                style={{ height: "45px" }}
              >
                buy
              </button>
              <button
                onClick={() => toggleActiveOrder("sell")}
                className={`btn w-100 text-capitalize ${
                  activeOrder === "sell" ? "btn-danger" : "btn-light text-muted"
                }`}
                style={{ height: "45px" }}
              >
                sell
              </button>
            </Col>
            <hr />
            <Col>
              {activeOrder === "buy" && (
                <MarketBuy
                  accounts={accounts}
                  activeOrder={activeOrder}
                  asset={asset}
                  tradeType={tradeType}
                />
              )}
              {activeOrder === "sell" && (
                <SellForm
                  wallets={accounts}
                  activeTab={activeOrder}
                  walletData={walletData}
                  tradeType={tradeType}
                />
              )}
            </Col>
          </Col>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
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
                  ({parseFloat(asset?.priceData?.changePercent).toFixed(2)}
                  %)
                </span>
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span className="d-flex flex-column">
                <Label className="text-muted fw-light">Market Cap</Label>
                <span className="fw-medium fs-15 text-capitalize">
                  {formatMarketCap(asset?.fundamentals?.marketCap) || "-"}
                </span>
              </span>
              <span className="d-flex flex-column align-items-end">
                <Label className="text-muted fw-light">Volume</Label>
                <span className="fw-medium fs-15">
                  {formatMarketCap(asset?.priceData?.volume) || "-"}
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
              <button
                type="button"
                onClick={() => {
                  if (!asset) {
                    setError("Missing data!");
                    return;
                  }
                  addAssetToWatchList.mutate(asset._id);
                }}
                className={`btn ${watchlistIds.has(asset?._id) ? "btn-danger" : "btn-secondary"} w-100 d-flex gap-2 justify-content-center`}
                disabled={addAssetToWatchList.isPending}
              >
                {addAssetToWatchList.isPending && <Spinner size={"sm"} />}{" "}
                {watchlistIds.has(asset?._id)
                  ? "Remove from watchlist"
                  : " Add to Watchlist"}
              </button>
            </div>
          </div>
        </Card>
      </Col>
      {addAssetToWatchList.isSuccess && (
        <SuccessToast
          successMsg={"Watchlist Updated"}
          isOpen={addAssetToWatchList.isSuccess}
          onClose={() => addAssetToWatchList.reset()}
        />
      )}
    </Row>
  );
};

export default TradeSection;
