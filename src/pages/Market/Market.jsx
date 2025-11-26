import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { market } from "../../common/data";
import TableContainer from "../../components/Common/TableContainer";
import { Price, Pairs, HighPrice, LowPrice, MarketVolume } from "./MarketCol";
import {
  formatCurrency,
  formatMarketCap,
  getAccessToken,
} from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { getUserTrades } from "../../services/user/trade";
import { getAssets } from "../../services/asset/asset";

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
            : `${asset?.name} (${asset.symbol})`
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
            <Link to="#" className="currency_name">
              {cell.getValue()}
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
        header: "Pairs",
        accessorKey: "symbol",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Pairs {...cell} />;
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
        header: "Volume %",
        accessorKey: "percentChange",
        enableColumnFilter: false,
        cell: (cell) => (
          <h6
            className={
              "text-" + cell.row.original.percentageClass + " fs-13 mb-0"
            }
          >
            <i className={cell.row.original.icon + " align-middle me-1"}></i>
            {cell.getValue()}%
          </h6>
        ),
      },
      {
        header: "Action",
        cell: () => (
          <>
            <button className="btn btn-sm btn-soft-info">Trade Now</button>
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
              <h5 className="card-title mb-0">Markets</h5>
            </Col>
            <div className="col-auto ms-auto">
              <div className="d-flex gap-2">
                <button className="btn btn-success">
                  <i className="ri-equalizer-line align-bottom me-1"></i>{" "}
                  Filters
                </button>
              </div>
            </div>
          </Row>
        </CardHeader>
        <CardBody className="p-0 border-bottom border-bottom-dashed">
          <div className="search-box">
            <input
              type="text"
              className="form-control search border-0 py-3"
              placeholder="Search to currency..."
            />
            <i className="ri-search-line search-icon"></i>
          </div>
        </CardBody>
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
