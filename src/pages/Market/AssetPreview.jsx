import React, { useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Col, Label, Row } from "reactstrap";
import { formatMarketCap } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { getAssetInfo } from "../../services/asset/asset";
import numeral from "numeral";

const AssetPreview = ({ asset, handleSubmit }) => {
  const chartContainerRef = useRef(null);
  const widgetRef = useRef(null);
  const scriptRef = useRef(null);

  const { data: assetInfo, isLoading } = useQuery({
    queryFn: () => getAssetInfo({ assetId: asset?._id }),
    queryKey: ["assetInfo", asset?._id],
    enabled: !!asset?._id,
  });

  useEffect(() => {
    if (!assetInfo?.symbol || !chartContainerRef.current) return;

    if (widgetRef.current) {
      try {
        widgetRef.current.remove();
      } catch (error) {
        console.warn("Error removing widget:", error);
      }
      widgetRef.current = null;
    }

    if (chartContainerRef.current) {
      chartContainerRef.current.innerHTML = "";
    }

    const getTradingViewSymbol = () => {
      const symbol = assetInfo.symbol;
      const type = assetInfo.type;

      if (type === "crypto") {
        return `${symbol}USD`;
      } else if (type === "stock") {
        return assetInfo.exchange ? `${assetInfo.exchange}:${symbol}` : symbol;
      } else {
        return symbol;
      }
    };

    if (window.TradingView) {
      createWidget(getTradingViewSymbol());
      return;
    }

    if (!scriptRef.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => createWidget(getTradingViewSymbol());
      script.onerror = () => console.error("Failed to load TradingView script");
      document.head.appendChild(script);
      scriptRef.current = script;
    } else if (window.TradingView) {
      createWidget(getTradingViewSymbol());
    }

    function createWidget(symbol) {
      if (!chartContainerRef.current || !window.TradingView) return;

      setTimeout(() => {
        if (!chartContainerRef.current) return;

        try {
          widgetRef.current = new window.TradingView.widget({
            container_id: chartContainerRef.current.id,
            symbol: symbol,
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            hide_top_toolbar: false,
            hide_legend: false,
            save_image: false,
            width: "100%",
            height: "100%",
            studies: [
              "MASimple@tv-basicstudies",
              "RSI@tv-basicstudies",
              "MACD@tv-basicstudies",
            ],
            show_popup_button: true,
            popup_width: "1000",
            popup_height: "650",
            loading_screen: { backgroundColor: "#ffffff" },
            overrides: {
              "mainSeriesProperties.style": 1,
            },
          });
        } catch (error) {
          console.error("Error creating TradingView widget:", error);
        }
      }, 100);
    }

    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch (error) {
          console.warn("Error removing widget during cleanup:", error);
        }
        widgetRef.current = null;
      }

      if (chartContainerRef.current) {
        chartContainerRef.current.innerHTML = "";
      }
    };
  }, [assetInfo?.symbol, assetInfo?.type, assetInfo?.exchange, asset?._id]);

  const chartContainerId = `tradingview_chart_${asset?._id || Date.now()}`;

  if (isLoading) {
    return (
      <Row>
        <Col lg={4}>
          <Card className="p-4">
            <div className="text-center py-5">Loading asset data...</div>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody className="p-5 text-center">
              Loading chart data...
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <React.Fragment>
      <Row className="mb-5">
        <Col lg={4}>
          <Card className="p-4">
            <div className="d-flex flex-column gap-3">
              <Col className="d-flex align-items-center justify-content-between">
                <span>
                  <span className="fs-15 fw-bold">{assetInfo?.symbol}</span>
                  <h4 className="fs-14 fw-normal text-capitalize text-muted">
                    {assetInfo?.name}
                  </h4>
                </span>
                <span className="bg-light p-1 rounded-circle">
                  <img src={assetInfo?.imageUrl} alt="" width={25} />
                </span>
              </Col>
              <Col className="d-flex flex-column">
                <span className="fs-21 fw-semibold">
                  {numeral(assetInfo?.priceData?.current).format("$0,0.00")}
                </span>
                <span
                  className={`fs-13 fw-normal ${assetInfo?.priceData?.change < 0 ? "text-danger" : "text-success"} d-flex align-items-center gap-1`}
                >
                  <small>
                    {numeral(assetInfo?.priceData?.change).format("$0,0.00")}
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
                  <p className="fs-15 fw-semibold">
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
                  <p className="fs-15 fw-semibold">
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
                  <p className="fs-15 fw-semibold">
                    {numeral(assetInfo?.priceData?.dayHigh).format("$0,0.00")}
                  </p>
                </Col>
                <Col xs={6}>
                  <Label
                    className="fs-14 fw-normal"
                    style={{ color: "#878A99" }}
                  >
                    24 Low
                  </Label>
                  <p className="fs-15 fw-semibold">
                    {numeral(assetInfo?.priceData?.dayLow).format("$0,0.00")}
                  </p>
                </Col>
                <Col xs={6}>
                  <Label
                    className="fs-14 fw-normal"
                    style={{ color: "#878A99" }}
                  >
                    P.E Ratio
                  </Label>
                  <p className="fs-15 fw-semibold">
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
                  <p className="fs-15 fw-semibold">
                    {numeral(assetInfo?.historical?.yearHigh).format("$0,0.00")}{" "}
                    -{" "}
                    {numeral(assetInfo?.historical?.yearLow).format("$0,0.00")}
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
          <Card className="h-100 d-flex flex-column">
            <CardHeader>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <h4 className="card-title mb-0">Market Statistics</h4>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn bg-secondary-subtle text-secondary fs-12">
                    1H
                  </button>
                  <button className="btn bg-secondary-subtle text-secondary fs-12">
                    1D
                  </button>
                  <button className="btn bg-secondary-subtle text-secondary fs-12">
                    7D
                  </button>
                  <button className="btn bg-secondary-subtle text-secondary fs-12">
                    1Y
                  </button>
                  <button className="btn bg-secondary-subtle text-secondary fs-12">
                    ALL
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-0 flex-grow-1 d-flex flex-column">
              <div className="d-flex align-items-center justify-content-between bg-light p-3 flex-wrap gap-3">
                <Col>
                  <span className="fs-20 fw-semibold">
                    {numeral(assetInfo?.priceData?.current).format("$0,0.00")}
                  </span>
                  <p className="d-flex align-items-center gap-1 text-muted mb-0">
                    <span style={{ whiteSpace: "nowrap" }}>
                      {" "}
                      {assetInfo?.name}
                    </span>{" "}
                    <span>({assetInfo?.symbol})</span>
                    <span
                      className={`${assetInfo?.priceData?.changePercent < 0 ? "text-danger bg-danger-subtle" : "text-success bg-success-subtle"} fs-10 fw-normal px-2 rounded-2 py-1`}
                    >
                      {" "}
                      {parseFloat(assetInfo?.priceData?.changePercent).toFixed(
                        2,
                      )}
                      %
                    </span>
                  </p>
                </Col>
                <Col className="d-flex align-items-center flex-wrap gap-3">
                  <div>
                    <Label className="fs-14 text-muted fw-semibold mb-0">
                      High
                    </Label>
                    <p className="fs-17 text-success fw-semibold mb-0">
                      {numeral(assetInfo?.priceData?.dayHigh).format("$0,0.00")}
                    </p>
                  </div>
                  <div>
                    <Label className="fs-14 text-muted fw-semibold mb-0">
                      Low
                    </Label>
                    <p className="fs-17 text-danger fw-semibold mb-0">
                      {numeral(assetInfo?.priceData?.dayLow).format("$0,0.00")}
                    </p>
                  </div>
                  <div>
                    <Label className="fs-14 text-muted fw-semibold mb-0">
                      Market Cap
                    </Label>
                    <p className="fs-17 fw-semibold text-capitalize mb-0">
                      {formatMarketCap(assetInfo?.fundamentals?.marketCap)}
                    </p>
                  </div>
                </Col>
              </div>
              <div
                id={chartContainerId}
                ref={chartContainerRef}
                style={{
                  height: "500px",
                  width: "100%",
                  minHeight: "400px",
                  flex: 1,
                }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AssetPreview;
