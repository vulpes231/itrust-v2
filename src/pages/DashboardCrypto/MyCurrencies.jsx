import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";
import { Price, Pairs, HighPrice, LowPrice, MarketVolume } from "./DashCol";
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
} from "../../services/watchlist/watchlist";
import { getUserInfo } from "../../services/user/user";
import SuccessToast from "../../components/Common/SuccessToast";

const MyCurrencies = () => {
  const [assetFilter, setAssetFilter] = useState("stock");
  const [sort, setSort] = useState("market_cap");
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const queryData = {
    sortBy: sort,
    type: assetFilter,
  };

  const token = getAccessToken();

  const {
    data: dbAssets,
    isLoading: getAssetsLoading,
    refetch: refetchAssets,
  } = useQuery({
    queryKey: ["assets", assetFilter, sort],
    queryFn: () => getAssets(queryData),
    enabled: !showWatchlistOnly,

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
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

  const watchlistIds = useMemo(() => {
    return new Set(
      user?.watchList?.map((item) => item.assetId?.toString()) || [],
    );
  }, [user?.watchList]);

  const displayedAssets = useMemo(() => {
    if (showWatchlistOnly) {
      return watchlistData || [];
    }

    return dbAssets?.data || [];
  }, [showWatchlistOnly, watchlistData, dbAssets?.data]);

  const pagination = showWatchlistOnly
    ? { total: watchlistData?.data?.length || 0, page: 1, pages: 1 }
    : dbAssets?.pagination;

  // console.log(pagination);

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

  const handleWatchlistToggle = (assetId) => {
    if (addAssetToWatchList.isLoading) {
      console.log("Loading please wait...");
      return;
    }
    addAssetToWatchList.mutate(assetId);
  };

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

  const handleAssetFilterChange = (value) => {
    setAssetFilter(value);
    setShowWatchlistOnly(false);
    setSort("volume");
    setCurrentPage(1);
  };

  const handleSortChange = (sortType) => {
    setSort(sortType);
    setShowWatchlistOnly(false);
    setCurrentPage(1);
  };

  const isLoading = getAssetsLoading || getWatchlistLoading || getUserLoading;

  const columns = useMemo(
    () => [
      {
        header: "Watchlist",
        accessorKey: "isInWatchlist",
        enableColumnFilter: false,
        cell: (cell) => {
          const assetId = cell.row.original.id;
          const isInWatchlist = cell.row.original.isInWatchlist;
          const isMutating = addAssetToWatchList.isLoading;

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
        header: "Assets",
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
    [addAssetToWatchList.isLoading],
  );

  return (
    <React.Fragment>
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
              <div className="d-flex align-items-center gap-2 flex-wrap ">
                <span style={{ color: "#878A99" }}>Filter by:</span>

                <select
                  className="btn btn-soft-primary btn-sm text-capitalize"
                  name="assetFilter"
                  onChange={(e) => handleAssetFilterChange(e.target.value)}
                  value={assetFilter}
                >
                  <option value="stock">Stocks</option>
                  <option value="crypto">Cryptos</option>
                  <option value="etf">ETFs</option>
                </select>

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

                <button
                  type="button"
                  onClick={handleWatchlistFilter}
                  className={`btn btn-sm text-capitalize ${
                    showWatchlistOnly ? "btn-primary" : "btn-soft-primary"
                  }`}
                >
                  Watchlist
                </button>

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
            <div
              className="text-center py-5 gap-2 d-flex align-items-center justify-content-center"
              style={{ height: "500px" }}
            >
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
              customPageSize={10}
              tableClass="align-middle table-nowrap"
              theadClass="table-light text-muted"
              divClass="table-responsive table-card mb-3"
              isLoading={getAssetsLoading}
              isGlobalFilter={false}
              pageParam={"asset"}
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
      {addAssetToWatchList.isSuccess && (
        <SuccessToast
          successMsg={"Watchlist updated."}
          isOpen={addAssetToWatchList.isSuccess}
          onClose={() => addAssetToWatchList.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default MyCurrencies;
