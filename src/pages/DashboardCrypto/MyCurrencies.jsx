import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, Col, Spinner } from "reactstrap";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAssets } from "../../services/asset/asset";
import { formatCurrency } from "../../constants";
import numeral from "numeral";
import {
  addToWatchList,
  getUserWatchList,
  removeFromWatchList,
} from "../../services/watchlist/watchlist";
import { getUserInfo } from "../../services/user/user";

const MyCurrencies = () => {
  const [assetFilter, setAssetFilter] = useState("stock");
  const [sort, setSort] = useState("volume");
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const queryData = {
    sortBy: sort,
    type: assetFilter,
  };

  const {
    data: assets,
    isLoading: getAssetsLoading,
    refetch: refetchAssets,
  } = useQuery({
    queryFn: () => getAssets(queryData),
    queryKey: ["assets", assetFilter, sort],
    enabled: !showWatchlistOnly,
  });

  const {
    data: watchlistData,
    isLoading: getWatchlistLoading,
    refetch: refetchWatchlist,
  } = useQuery({
    queryFn: () => getUserWatchList(),
    queryKey: ["watchlist"],
  });

  const { data: user, isLoading: getUserLoading } = useQuery({
    queryFn: () => getUserInfo(),
    queryKey: ["user"],
  });

  const watchlistIds = new Set(
    user?.watchList?.map((asset) => asset.assetId) || [],
  );

  // console.log(watchlistIds);

  const displayedAssets = showWatchlistOnly
    ? watchlistData || []
    : assets?.data || [];

  const addAssetToWatchList = useMutation({
    mutationFn: addToWatchList,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries(["watchlist"]);
      queryClient.invalidateQueries(["user"]);

      if (showWatchlistOnly) {
        refetchWatchlist();
      }
    },
  });

  const removeAssetFromWatchList = useMutation({
    mutationFn: removeFromWatchList,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries(["watchlist"]);
      queryClient.invalidateQueries(["user"]);

      if (showWatchlistOnly) {
        refetchWatchlist();
      }
    },
  });

  const handleWatchlistToggle = (assetId, isInWatchlist) => {
    if (isInWatchlist) {
      removeAssetFromWatchList.mutate(assetId);
    } else {
      addAssetToWatchList.mutate(assetId);
    }
  };

  const handleWatchlistFilter = () => {
    if (showWatchlistOnly) {
      setShowWatchlistOnly(false);

      refetchAssets();
    } else {
      setShowWatchlistOnly(true);
      // Reset sort when showing watchlist (optional)
      // setSort("");
    }
  };

  const handleAssetFilterChange = (value) => {
    setAssetFilter(value);
    setShowWatchlistOnly(false);
    setSort("volume");
  };

  const handleSortChange = (sortType) => {
    setSort(sortType);
    setShowWatchlistOnly(false);
  };

  const isLoading = getAssetsLoading || getWatchlistLoading || getUserLoading;

  return (
    <React.Fragment>
      <Col>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">
              {showWatchlistOnly
                ? "My Watchlist"
                : `${assetFilter.charAt(0).toUpperCase() + assetFilter.slice(1)}s`}
            </h4>
            <div className="flex-shrink-0 d-flex align-items-center gap-2 ">
              <span style={{ color: "#878A99" }}>Filter by:</span>

              {/* Asset Type Filter */}
              <select
                className="btn btn-soft-primary btn-sm text-capitalize"
                name="assetFilter"
                onChange={(e) => handleAssetFilterChange(e.target.value)}
                value={assetFilter}
              >
                <option value="stock">Stock</option>
                <option value="crypto">Crypto</option>
                <option value="etf">ETF</option>
              </select>

              {/* 24H Change Button */}
              <button
                type="button"
                onClick={() => handleSortChange("24h_change")}
                className={`btn btn-sm text-capitalize ${
                  sort === "24h_change" && !showWatchlistOnly
                    ? "btn-primary"
                    : "btn-soft-primary"
                }`}
              >
                24H
              </button>

              {/* Watchlist Toggle Button */}
              <button
                type="button"
                onClick={handleWatchlistFilter}
                className={`btn btn-sm text-capitalize ${
                  showWatchlistOnly ? "btn-primary" : "btn-soft-primary"
                }`}
              >
                Watchlist
              </button>

              {/* Top Gainers Button */}
              <button
                type="button"
                onClick={() => handleSortChange("top_gainers")}
                className={`btn btn-sm text-capitalize ${
                  sort === "top_gainers" && !showWatchlistOnly
                    ? "btn-primary"
                    : "btn-soft-primary"
                }`}
              >
                Top Gainers
              </button>

              {/* Top Losers Button */}
              <button
                type="button"
                onClick={() => handleSortChange("top_losers")}
                className={`btn btn-sm text-capitalize ${
                  sort === "top_losers" && !showWatchlistOnly
                    ? "btn-primary"
                    : "btn-soft-primary"
                }`}
              >
                Top Losers
              </button>

              {/* Market Cap Button */}
              <button
                type="button"
                onClick={() => handleSortChange("market_cap")}
                className={`btn btn-sm text-capitalize ${
                  sort === "market_cap" && !showWatchlistOnly
                    ? "btn-primary"
                    : "btn-soft-primary"
                }`}
              >
                Market Cap
              </button>
            </div>
          </CardHeader>
          <div className="card-body">
            {error && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                {error}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setError("")}
                ></button>
              </div>
            )}
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
                  {isLoading ? (
                    <tr>
                      <td colSpan="8">
                        <div className="p-5 d-flex align-items-center justify-content-center w-100">
                          <Spinner color="primary" />
                          <span className="fs-14 fw-semibold text-muted ms-2">
                            {showWatchlistOnly
                              ? "Loading watchlist..."
                              : `Fetching ${assetFilter}s...`}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    displayedAssets.slice(0, 14).map((asset) => {
                      const assetId = asset.id || asset._id;
                      const isInWatchlist = watchlistIds.has(assetId);
                      const value = Number(asset.priceData?.change) || 0;
                      const safeValue = Math.abs(value) < 0.005 ? 0 : value;

                      return (
                        <tr key={assetId}>
                          <td>
                            <button
                              onClick={() =>
                                handleWatchlistToggle(assetId, isInWatchlist)
                              }
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                              }}
                              disabled={
                                addAssetToWatchList.isLoading ||
                                removeAssetFromWatchList.isLoading
                              }
                            >
                              {isInWatchlist ? (
                                <AiFillStar size={20} color="#FFC84B" />
                              ) : (
                                <AiOutlineStar size={20} color="#FFC84B" />
                              )}
                            </button>
                          </td>
                          <td>
                            <span className="d-flex align-items-center">
                              <span className="me-2 bg-light p-2 rounded-circle">
                                <img
                                  src={
                                    asset.imageUrl ||
                                    "https://via.placeholder.com/32"
                                  }
                                  alt="HS"
                                  className="avatar-xxs rounded-circle"
                                  style={{ width: "24px", height: "24px" }}
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/32";
                                  }}
                                />
                              </span>
                              <span>
                                <h6 className="mb-0">
                                  {asset.name?.slice(0, 14)}
                                  {asset.name?.length > 14 ? "..." : ""}
                                </h6>
                                <small className="text-muted">
                                  {asset.symbol}
                                </small>
                              </span>
                            </span>
                          </td>
                          <td>
                            {formatCurrency(asset.priceData?.current || 0)}
                          </td>
                          <td>
                            {formatCurrency(asset.priceData?.dayHigh || 0)}
                          </td>
                          <td>
                            {formatCurrency(asset.priceData?.dayLow || 0)}
                          </td>
                          <td>
                            {numeral(asset.priceData?.volume || 0)
                              .format("$0.00a")
                              .toUpperCase()}
                          </td>
                          <td>
                            <h6
                              className={`mb-0 ${
                                asset.priceData?.changePercent > 0
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              <i
                                className={`align-middle me-1 ${
                                  asset.priceData?.changePercent > 0
                                    ? "mdi mdi-trending-up"
                                    : "mdi mdi-trending-down"
                                }`}
                              ></i>
                              <span>
                                {" "}
                                {numeral(safeValue).format("$0,0.00")}
                              </span>
                              <span>
                                {" "}
                                (
                                {parseFloat(
                                  asset.priceData?.changePercent || 0,
                                ).toFixed(2)}
                                %)
                              </span>
                            </h6>
                          </td>
                          <td>
                            <Link
                              to={`/trade/${assetId}`}
                              className="btn btn-sm btn-soft-secondary"
                            >
                              Trade
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  )}

                  {!isLoading && displayedAssets.length === 0 && (
                    <tr>
                      <td colSpan="8">
                        <div className="p-5 d-flex align-items-center justify-content-center w-100 flex-column">
                          <span className="fs-14 fw-semibold text-muted mb-2">
                            {showWatchlistOnly
                              ? "Your watchlist is empty"
                              : `No ${assetFilter}s found`}
                          </span>
                          {showWatchlistOnly && (
                            <button
                              onClick={() => setShowWatchlistOnly(false)}
                              className="btn btn-sm btn-primary"
                            >
                              Browse Assets
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
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
