import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../../services/asset/asset";
import { formatCurrency } from "../../constants";
import numeral from "numeral";

const MyCurrencies = () => {
  const [assetFilter, setAssetFilter] = useState("crypto");
  const queryData = {
    sortBy: "priceData.volume",
    type: "crypto",
  };

  const { data: assets, isLoading: getAssetsLoading } = useQuery({
    queryFn: () => getAssets(queryData),
    queryKey: ["assets"],
  });

  useEffect(() => {
    if (assets) {
      console.log(assets);
    }
  }, [assets]);

  return (
    <React.Fragment>
      <Col>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Most Active</h4>
            <div className="flex-shrink-0 d-flex align-items-center gap-2 ">
              <span style={{ color: "#878A99" }}>Filter by:</span>
              <select
                className="btn btn-soft-primary btn-sm text-capitalize"
                name=""
              >
                <option value="">Crypto</option>
                <option value="">Stock</option>
                <option value="">ETF</option>
              </select>
              <button className="btn btn-soft-primary btn-sm text-capitalize">
                24H
              </button>
              <button className="btn btn-soft-primary btn-sm text-capitalize">
                watchlist
              </button>
              <button className="btn btn-soft-primary btn-sm text-capitalize">
                top gainers
              </button>
              <button className="btn btn-soft-primary btn-sm text-capitalize">
                top losers
              </button>
              <button className="btn btn-soft-primary btn-sm text-capitalize">
                market cap
              </button>
            </div>
          </CardHeader>
          <div className="card-body">
            <div className="table-responsive table-card">
              <table className="table table-hover table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted bg-light-subtle">
                  <tr>
                    <th>Watchlist</th>
                    <th>Asset</th>
                    <th>Price</th>
                    <th>24 High</th>
                    <th>24 Low</th>
                    <th>Market Volume</th>
                    <th>24h Change</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    (assets &&
                      assets.data?.length > 0 &&
                      assets.data.slice(0, 14)) ||
                    []
                  ).map((asset, key) => (
                    <tr key={key}>
                      <td>
                        <span style={{ color: "#FFC84B" }}>
                          <AiOutlineStar size={20} />
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="me-2">
                            <img
                              src={asset.imageUrl}
                              alt=""
                              className="avatar-xxs"
                            />
                          </div>
                          <div>
                            <h6 className="mb-0">
                              {asset.name.slice(0, 14)}
                              {asset.name.length > 14 ? "..." : ""}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>{formatCurrency(asset.priceData.current)}</td>

                      <td>{formatCurrency(asset.priceData.dayHigh)}</td>
                      <td>{formatCurrency(asset.priceData.dayLow)}</td>
                      <td>
                        {numeral(asset.priceData.volume)
                          .format("$0.00a")
                          .toUpperCase()}
                      </td>
                      <td>
                        <h6
                          className={`mb-0 ${
                            asset.priceData.changePercent > 0
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          <i
                            className={`align-middle me-1 ${
                              asset.priceData.changePercent > 0
                                ? "mdi mdi-trending-up"
                                : "mdi mdi-trending-down"
                            }`}
                          ></i>
                          <span>
                            {" "}
                            {numeral(asset.priceData.change).format("$0,0.00")}
                          </span>
                          <span>
                            {" "}
                            (
                            {parseFloat(asset.priceData.changePercent).toFixed(
                              2
                            )}
                            %)
                          </span>
                        </h6>
                      </td>
                      <td>
                        <Link
                          to="/apps-crypto-buy-sell"
                          className="btn btn-sm btn-soft-secondary"
                        >
                          Trade
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default MyCurrencies;
