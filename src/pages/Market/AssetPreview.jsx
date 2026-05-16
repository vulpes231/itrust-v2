import React from "react";
import { Card, CardBody, CardHeader, Col, Label, Row } from "reactstrap";
import { formatMarketCap } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { getAssetInfo } from "../../services/asset/asset";
import numeral from "numeral";

const AssetPreview = ({ asset, handleSubmit }) => {
  //   console.log(asset);

  const { data: assetInfo } = useQuery({
    queryFn: () => getAssetInfo({ assetId: asset?._id }),
    queryKey: ["assetInfo", asset?._id],
    enabled: !!asset?._id,
  });

  //   console.log(assetInfo);
  return (
    <React.Fragment>
      <Row>
        <Col lg={4}>
          <Card className="p-4">
            <div className="d-flex flex-column gap-3">
              <Col className="d-flex align-items-center justify-content-between">
                <span>
                  <span style={{ color: "#495057" }} className="fs-15 fw-bold">
                    {assetInfo?.symbol}
                  </span>
                  <h4
                    style={{ color: "#212529" }}
                    className="fs-14 fw-normal text-capitalize"
                  >
                    {assetInfo?.name}
                  </h4>
                </span>
                <span className="bg-light p-1 rounded-circle">
                  <img src={assetInfo?.imageUrl} alt="" width={25} />
                </span>
              </Col>
              <Col className="d-flex flex-column">
                <span
                  style={{ color: "#495057" }}
                  className="fs-21 fw-semibold"
                >
                  {numeral(assetInfo?.priceData?.current).format("$0,0.0")}
                </span>
                <span
                  className={`fs-13 fw-normal ${assetInfo?.priceData?.change < 0 ? "text-danger" : "text-success"} d-flex align-items-center gap-1`}
                >
                  <small>
                    {numeral(assetInfo?.priceData?.change).format("$0,0.0")}
                  </small>
                  <small>
                    (
                    {parseFloat(assetInfo?.priceData?.changePercent).toFixed(2)}
                    )%
                  </small>
                </span>
              </Col>
              <Row>
                <Col xs={6}>
                  <Label
                    className="fs-14 fw-normal"
                    style={{ color: "#878A99" }}
                  >
                    MarketCap
                  </Label>
                  <p className="fs-15 fw-semibold" style={{ color: "#495057" }}>
                    {formatMarketCap(assetInfo?.fundamentals?.marketCap)}
                  </p>
                </Col>
                <Col xs={6}>
                  <Label
                    className="fs-14 fw-normal"
                    style={{ color: "#878A99" }}
                  >
                    Volume
                  </Label>
                  <p className="fs-15 fw-semibold" style={{ color: "#495057" }}>
                    {formatMarketCap(assetInfo?.priceData?.volume)}
                  </p>
                </Col>
                <Col xs={6}>
                  <Label
                    className="fs-14 fw-normal"
                    style={{ color: "#878A99" }}
                  >
                    24 High
                  </Label>
                  <p className="fs-15 fw-semibold" style={{ color: "#495057" }}>
                    {numeral(assetInfo?.priceData?.dayHigh).format("$0,0.0")}
                  </p>
                </Col>
                <Col xs={6}>
                  <Label
                    className="fs-14 fw-normal"
                    style={{ color: "#878A99" }}
                  >
                    24 Low
                  </Label>
                  <p className="fs-15 fw-semibold" style={{ color: "#495057" }}>
                    {numeral(assetInfo?.priceData?.dayLow).format("$0,0.0")}
                  </p>
                </Col>
                <Col xs={6}>
                  <Label
                    className="fs-14 fw-normal"
                    style={{ color: "#878A99" }}
                  >
                    P.E Ratio
                  </Label>
                  <p className="fs-15 fw-semibold" style={{ color: "#495057" }}>
                    {assetInfo?.fundamentals?.pe || "-"}
                  </p>
                </Col>
                <Col xs={6}>
                  <Label
                    className="fs-14 fw-normal"
                    style={{ color: "#878A99" }}
                  >
                    52 Weeks Range
                  </Label>
                  <p className="fs-15 fw-semibold" style={{ color: "#495057" }}>
                    {numeral(assetInfo?.historical?.yearHigh).format("$0,0.0")}{" "}
                    - {numeral(assetInfo?.historical?.yearLow).format("$0,0.0")}
                  </p>
                </Col>
              </Row>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-secondary"
              >
                Trade
              </button>
            </div>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardHeader>
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="card-title">Market Statistics</h4>
                <div>
                  <button>1H</button>
                  <button>1D</button>
                  <button>7D</button>
                  <button>1Y</button>
                  <button>ALL</button>
                </div>
              </div>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AssetPreview;
