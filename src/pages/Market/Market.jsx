import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";
import { Price, Pairs, HighPrice, LowPrice, MarketVolume } from "./MarketCol";
import {
  formatCurrency,
  formatMarketCap,
  getAccessToken,
} from "../../constants";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAssets } from "../../services/asset/asset";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import {
  addToWatchList,
  getUserWatchList,
  removeFromWatchList,
} from "../../services/watchlist/watchlist";
import { getUserInfo } from "../../services/user/user";

const Market = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [assetFilter, setAssetFilter] = useState("stock");
  const [sort, setSort] = useState("volume");
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const queryData = {
    sortBy: sort,
    type: assetFilter,
    page: currentPage,
  };

  const token = getAccessToken();

  // Fetch assets (only when not in watchlist mode)
  const {
    data: dbAssets,
    isLoading: getAssetsLoading,
    refetch: refetchAssets,
  } = useQuery({
    queryFn: () => getAssets(queryData),
    queryKey: ["assets", assetFilter, sort, currentPage],
    enabled: !showWatchlistOnly,
  });

  // Fetch watchlist data
  const {
    data: watchlistData,
    isLoading: getWatchlistLoading,
    refetch: refetchWatchlist,
  } = useQuery({
    queryFn: () => getUserWatchList(),
    queryKey: ["watchlist"],
  });

  // Fetch user info
  const { data: user, isLoading: getUserLoading } = useQuery({
    queryFn: () => getUserInfo(),
    queryKey: ["user"],
  });

  // Create a Set of watchlist asset IDs for quick lookup
  const watchlistIds = useMemo(() => {
    return new Set(
      user?.watchList?.map((item) => item.assetId?.toString()) || [],
    );
  }, [user?.watchList]);

  // Determine which assets to display
  const displayedAssets = useMemo(() => {
    if (showWatchlistOnly) {
      // Return watchlist assets
      return watchlistData || [];
    }
    // Return all assets from API
    return dbAssets?.data || [];
  }, [showWatchlistOnly, watchlistData, dbAssets?.data]);

  const pagination = showWatchlistOnly
    ? { total: watchlistData?.data?.length || 0, page: 1, pages: 1 }
    : dbAssets?.pagination;

  // Transform data for table display
  const transformedData = useMemo(() => {
    if (!displayedAssets || displayedAssets.length === 0) return [];

    return displayedAssets.map((asset) => {
      const assetId = asset.id || asset._id;
      const isInWatchlist = watchlistIds.has(assetId);

      return {
        ...asset,
        id: assetId,
        isInWatchlist,
        name: asset?.name
          ? asset.name.length > 15
            ? `${asset.name.slice(0, 15)}...`
            : asset.name
          : "Unknown",
        img: asset?.imageUrl || "/default-coin.png",
        price: formatCurrency(asset?.priceData?.current) || 0,
        symbol: asset?.symbol || "",
        dailyHigh: formatCurrency(asset?.priceData?.dayHigh) || 0,
        dailyLow: formatCurrency(asset?.priceData?.dayLow) || 0,
        volume: formatMarketCap(asset?.priceData?.volume) || 0,
        percentChange: asset?.priceData?.changePercent?.toFixed(2) || 0,
        percentageClass:
          (asset?.priceData?.changePercent || 0) > 0 ? "success" : "danger",
        icon:
          (asset?.priceData?.changePercent || 0) > 0
            ? "ri-arrow-up-line"
            : "ri-arrow-down-line",
      };
    });
  }, [displayedAssets, watchlistIds]);

  // Add to watchlist mutation
  const addAssetToWatchList = useMutation({
    mutationFn: addToWatchList,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      // Invalidate and refetch queries
      queryClient.invalidateQueries(["watchlist"]);
      queryClient.invalidateQueries(["user"]);

      if (showWatchlistOnly) {
        refetchWatchlist();
      }
    },
  });

  // Remove from watchlist mutation
  const removeAssetFromWatchList = useMutation({
    mutationFn: removeFromWatchList,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      // Invalidate and refetch queries
      queryClient.invalidateQueries(["watchlist"]);
      queryClient.invalidateQueries(["user"]);

      if (showWatchlistOnly) {
        refetchWatchlist();
      }
    },
  });

  // Handle watchlist toggle
  const handleWatchlistToggle = (assetId, isInWatchlist) => {
    if (isInWatchlist) {
      removeAssetFromWatchList.mutate(assetId);
    } else {
      addAssetToWatchList.mutate(assetId);
    }
  };

  // Handle watchlist filter button
  const handleWatchlistFilter = () => {
    if (showWatchlistOnly) {
      setShowWatchlistOnly(false);
      setCurrentPage(1);
      refetchAssets();
    } else {
      setShowWatchlistOnly(true);
      setCurrentPage(1);
    }
  };

  // Handle asset filter change
  const handleAssetFilterChange = (value) => {
    setAssetFilter(value);
    setShowWatchlistOnly(false);
    setSort("volume");
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (sortType) => {
    setSort(sortType);
    setShowWatchlistOnly(false);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const isLoading = getAssetsLoading || getWatchlistLoading || getUserLoading;

  // Define table columns with watchlist star functionality
  const columns = useMemo(
    () => [
      {
        header: "Watchlist",
        accessorKey: "isInWatchlist",
        enableColumnFilter: false,
        cell: (cell) => {
          const assetId = cell.row.original.id;
          const isInWatchlist = cell.row.original.isInWatchlist;
          const isMutating =
            addAssetToWatchList.isLoading || removeAssetFromWatchList.isLoading;

          return (
            <button
              onClick={() => handleWatchlistToggle(assetId, isInWatchlist)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
              disabled={isMutating}
            >
              {isInWatchlist ? (
                <AiFillStar size={20} color="#FFC84B" />
              ) : (
                <AiOutlineStar size={20} color="#FFC84B" />
              )}
            </button>
          );
        },
      },
      {
        header: "Asset",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => (
          <div className="d-flex align-items-center fw-medium gap-2">
            <span className="bg-light p-2 rounded-circle">
              <img
                src={cell.row.original.img || "https://via.placeholder.com/32"}
                alt={cell.getValue()}
                className="avatar-xxs rounded-circle"
                style={{ width: "24px", height: "24px" }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/32";
                }}
              />
            </span>

            <Link to="#" className="currency_name d-flex flex-column ">
              <span className="fw-medium"> {cell.getValue()}</span>
              <span className="fs-13"> {cell.row.original.symbol}</span>
            </Link>
          </div>
        ),
      },
      {
        header: "Price",
        accessorKey: "price",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Price {...cell} />;
        },
      },
      {
        header: "24 High",
        accessorKey: "dailyHigh",
        enableColumnFilter: false,
        cell: (cell) => {
          return <HighPrice {...cell} />;
        },
      },
      {
        header: "24 Low",
        accessorKey: "dailyLow",
        enableColumnFilter: false,
        cell: (cell) => {
          return <LowPrice {...cell} />;
        },
      },
      {
        header: "Market Volume ",
        accessorKey: "volume",
        enableColumnFilter: false,
        cell: (cell) => {
          return <MarketVolume {...cell} />;
        },
      },
      {
        header: "24 P&L %",
        accessorKey: "percentChange",
        enableColumnFilter: false,
        cell: (cell) => {
          const percent = cell.row.original.percentChange;
          return (
            <h6
              className={`d-flex gap-2 align-items-center ${
                percent < 0 ? "text-danger" : "text-success"
              }`}
            >
              <span>
                {percent < 0 ? <FaArrowTrendDown /> : <FaArrowTrendUp />}
              </span>
              <span>{cell.getValue()}%</span>
            </h6>
          );
        },
      },
      {
        header: "Action",
        cell: (cell) => (
          <Link
            to={`/trade/${cell.row.original.id}`}
            className="btn btn-sm btn-soft-secondary"
          >
            Trade Now
          </Link>
        ),
      },
    ],
    [addAssetToWatchList.isLoading, removeAssetFromWatchList.isLoading],
  );

  return (
    <React.Fragment>
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show m-3"
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

      <Card>
        <CardHeader className="border-bottom-dashed">
          <Row className="align-items-center">
            <Col xs={3}>
              <h4 className="card-title mb-0 flex-grow-1">
                {showWatchlistOnly
                  ? "My Watchlist"
                  : `${assetFilter.charAt(0).toUpperCase() + assetFilter.slice(1)}s`}
              </h4>
            </Col>
            <div className="col-auto ms-auto">
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
                  {"Watchlist"}
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
            </div>
          </Row>
        </CardHeader>

        <CardBody>
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">
                {showWatchlistOnly
                  ? "Loading watchlist..."
                  : `Loading ${assetFilter}s...`}
              </p>
            </div>
          ) : transformedData.length > 0 ? (
            <TableContainer
              columns={columns}
              data={transformedData}
              isGlobalFilter={false}
              isAddUserList={false}
              customPageSize={10}
              className="custom-header-css"
              divClass="table-responsive table-card mb-3"
              tableClass="align-middle table-nowrap"
              theadClass="table-light text-muted"
              isLoading={getAssetsLoading}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          ) : (
            <div className="text-center py-5">
              <p className="text-muted mb-2">
                {showWatchlistOnly
                  ? "Your watchlist is empty"
                  : `No ${assetFilter}s found`}
              </p>
              {showWatchlistOnly && (
                <button
                  onClick={() => setShowWatchlistOnly(false)}
                  className="btn btn-sm btn-primary mt-2"
                >
                  Browse Assets
                </button>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Market;
