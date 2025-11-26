import React, { useEffect } from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { topPerformers } from "../../common/data";
import { getAssets } from "../../services/asset/asset";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatMarketCap } from "../../constants";

const TopPerformers = () => {
  const queryData = {
    limit: 6,
    sortBy: "priceData.changePercent",
    type: "crypto",
  };

  const { data: assets } = useQuery({
    queryKey: ["topPerformers"],
    queryFn: () => getAssets(queryData),
  });

  return (
    <React.Fragment>
      <Col xxl={4} lg={6}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Top Performers</h4>
            <div className="d-flex gap-1">
              <button type="button" className="btn btn-soft-info btn-sm">
                1H
              </button>
              <button type="button" className="btn btn-soft-info btn-sm">
                1D
              </button>
              <button type="button" className="btn btn-soft-info btn-sm">
                7D
              </button>
              <button type="button" className="btn btn-soft-primary btn-sm">
                1M
              </button>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="list-group list-group-flush border-dashed mb-0">
              {assets &&
                assets.data &&
                assets.data.map((item, key) => (
                  <li
                    className="list-group-item d-flex align-items-center"
                    key={key}
                  >
                    <div className="flex-shrink-0">
                      <img src={item.imageUrl} className="avatar-xs" alt="" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="fs-15 mb-1">{item.name}</h6>
                      <p className="text-muted mb-0">
                        {formatMarketCap(item.fundamentals.marketCap)}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-end">
                      <h6 className="fs-15 mb-1">
                        {formatCurrency(item.priceData.current)}
                      </h6>
                      <p
                        className={`fs-13 mb-0 ${
                          item.priceData.changePercent >= 0
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {formatCurrency(item.priceData.change)} (
                        {item.priceData.changePercent.toFixed(2)})
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default TopPerformers;
