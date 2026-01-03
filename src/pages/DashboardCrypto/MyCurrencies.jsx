import React, { useEffect } from "react";
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

import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../../services/asset/asset";
import { formatCurrency } from "../../constants";

const MyCurrencies = () => {
  const queryData = {
    sortBy: "priceData.volume",
    type: "crypto",
  };

  const { data: assets, isLoading: getAssetsLoading } = useQuery({
    queryFn: () => getAssets(queryData),
    queryKey: ["assets"],
  });

  // useEffect(() => {
  //   if (assets) {
  //     console.log(assets);
  //   }
  // }, [assets]);

  return (
    <React.Fragment>
      <Col xl={8}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">My Currencies</h4>
            <div className="flex-shrink-0">
              <button className="btn btn-soft-primary btn-sm">24H</button>
            </div>
            <div className="flex-shrink-0 ms-2">
              <UncontrolledDropdown
                className="card-header-dropdown"
                direction="start"
              >
                <DropdownToggle
                  className="btn btn-soft-primary btn-sm"
                  role="button"
                  tag="a"
                >
                  Get Report
                  <i className="mdi mdi-chevron-down align-middle ms-1"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu dropdown-menu-end">
                  <DropdownItem>Download Report</DropdownItem>
                  <DropdownItem>Export</DropdownItem>
                  <DropdownItem>Import</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </CardHeader>
          <div className="card-body">
            <div className="table-responsive table-card">
              <table className="table table-hover table-borderless table-centered align-middle table-nowrap mb-0">
                <thead className="text-muted bg-light-subtle">
                  <tr>
                    <th>Coin Name</th>
                    <th>Price</th>
                    <th>24h Change</th>
                    <th>Daily High</th>
                    <th>Daily Low</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    (assets &&
                      assets.data?.length > 0 &&
                      assets.data.slice(0, 7)) ||
                    []
                  ).map((asset, key) => (
                    <tr key={key}>
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
                            <h6 className="mb-0">{asset.name}</h6>
                          </div>
                        </div>
                      </td>
                      <td>{formatCurrency(asset.priceData.current)}</td>
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
                          {parseFloat(asset.priceData.changePercent).toFixed(2)}
                        </h6>
                      </td>
                      <td>{formatCurrency(asset.priceData.dayHigh)}</td>
                      <td>{formatCurrency(asset.priceData.dayLow)}</td>
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
