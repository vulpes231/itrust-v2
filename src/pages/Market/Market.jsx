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
import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../../services/asset/asset";
import { AiOutlineStar } from "react-icons/ai";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { percent } from "feather-icons-react/build/icons.json";

const Market = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryData = {
    limit: 10,
    sortBy: "priceData.volume",
    type: "crypto",
    page: currentPage,
  };
  const token = getAccessToken();

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const { data, isLoading: getAssetsLoading } = useQuery({
    queryFn: () => getAssets(queryData),
    queryKey: ["marketAssets", currentPage],
    enabled: !!token,
  });

  const assets = data?.data;
  const pagination = data?.pagination;

  const transformedData = useMemo(() => {
    if (!assets) return [];

    return assets.map((asset) => ({
      ...asset,
      name:
        `${
          asset?.name.length > 15
            ? `${asset?.name.slice(0, 15)}...`
            : `${asset?.name} `
        }` || "Unknown",
      img: asset?.imageUrl || "/default-coin.png",
      price: formatCurrency(asset.priceData?.current) || 0,
      symbol: asset?.symbol,
      dailyHigh: formatCurrency(asset.priceData?.dayHigh) || 0,
      dailyLow: formatCurrency(asset.priceData?.dayLow) || 0,
      volume: formatMarketCap(asset.priceData?.volume) || 0,
      percentChange: asset.priceData?.changePercent?.toFixed(2) || 0,
      percentageClass:
        (asset.priceData?.changePercent || 0) > 0 ? "success" : "danger",
      icon:
        (asset.priceData?.changePercent || 0) > 0
          ? "ri-arrow-up-line"
          : "ri-arrow-down-line",
    }));
  }, [assets]);

  const columns = useMemo(
    () => [
      {
        header: "Watchlist",
        accessorKey: "watchlist",
        enableColumnFilter: false,
        cell: (cell) => (
          <span style={{ color: "#FFC84B" }}>
            <AiOutlineStar size={20} />
          </span>
        ),
      },
      {
        header: "Asset",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => (
          <div className="d-flex align-items-center fw-medium">
            <img
              src={cell.row.original.img}
              alt={cell.getValue()}
              className="avatar-xxs me-2"
              onError={(e) => {
                e.target.src = "/default-coin.png";
              }}
            />
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
        cell: () => (
          <>
            <button className="btn btn-sm btn-soft-secondary">Trade Now</button>
          </>
        ),
      },
    ],
    []
  );
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="border-bottom-dashed">
          <Row className="align-items-center">
            <Col xs={3}>
              <h4 className="card-title mb-0 flex-grow-1">Asset</h4>
            </Col>
            <div className="col-auto ms-auto">
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
            </div>
          </Row>
        </CardHeader>

        <CardBody>
          <TableContainer
            columns={columns}
            data={transformedData.length > 0 ? transformedData : []}
            isGlobalFilter={false}
            isAddUserList={false}
            customPageSize={transformedData.length}
            className="custom-header-css"
            divClass="table-responsive table-card mb-3"
            tableClass="align-middle table-nowrap"
            theadClass="table-light text-muted"
            isLoading={getAssetsLoading}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Market;
