import React, { useEffect } from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";

import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import TopStats from "./TopStats";
import BottomStats from "./BottomStats";
import { getDashboardChartData } from "../../services/user/chart";

const Statistics = ({
  dataColors,
  analytics,
  walletData,
  currentNetWorth = 0,
}) => {
  const [range, setRange] = React.useState("ALL");
  const portfolioStatisticsColors = getChartColorsArray(dataColors);

  const { data: chartData } = useQuery({
    queryFn: () => getDashboardChartData({ timeframe: range.toLowerCase() }),
    queryKey: ["chart", range],
  });

  const getTickAmount = (range) => {
    switch (range) {
      case "1D":
        return 24;
      case "1W":
        return 8;
      case "1M":
        return 15;
      case "1Y":
        return 12;
      case "ALL":
        return 12;
      default:
        return undefined;
    }
  };

  const getRangeStart = (range) => {
    const now = new Date();
    const date = new Date(now);

    switch (range) {
      case "1H":
        date.setHours(date.getHours() - 1);
        break;

      case "1D":
        date.setDate(date.getDate() - 1);
        break;

      case "1W":
        date.setDate(date.getDate() - 7);
        break;

      case "1M":
        date.setMonth(date.getMonth() - 1);
        break;

      case "1Y":
        date.setFullYear(date.getFullYear() - 1);
        break;

      case "ALL":
        date.setFullYear(date.getFullYear() - 1);
        break;
      default:
        return null;
    }

    return date;
  };

  const { filteredData, yAxisMin, yAxisMax } = React.useMemo(() => {
    const rangeStart = getRangeStart(range);
    const now = new Date();
    const nowTime = now.getTime();

    let data = [...(chartData || [])]
      .map((item) => ({
        x: new Date(item.x).getTime(),
        y: Math.max(0, Number(item.y) || 0),
        reason: item.reason,
      }))
      .sort((a, b) => a.x - b.x);

    if (rangeStart) {
      data = data.filter(
        (item) => item.x >= rangeStart.getTime() && item.x <= nowTime,
      );
    }

    let minY = 0;
    let maxY = 0;

    if (data.length > 0) {
      minY = data.reduce((min, point) => Math.min(min, point.y), Infinity);
      maxY = data.reduce((max, point) => Math.max(max, point.y), 0);
    }

    // Carry forward last value
    const finalData = [{ x: rangeStart?.getTime() ?? nowTime, y: 0 }, ...data];
    if (data.length > 0) {
      const lastValue = data[data.length - 1].y;
      finalData.push({ x: nowTime, y: lastValue });
    }

    // Minimum span
    const rangeSpan = maxY - minY;
    if (rangeSpan < 100) {
      const center = (minY + maxY) / 2;
      minY = Math.max(0, Math.floor(center - 50));
      maxY = Math.ceil(center + 50);
    }

    // Smart step
    const getNiceStep = (span) => {
      if (span <= 200) return 50;
      if (span <= 600) return 100;
      if (span <= 2000) return 250;
      if (span <= 5000) return 500;
      return 1000;
    };

    const step = getNiceStep(rangeSpan);

    minY = Math.floor(minY / step) * step;
    maxY = Math.ceil(maxY / step) * step;

    // Prefer exact max when possible
    const actualMax = data.length > 0 ? data[data.length - 1].y : 0;
    if (maxY > actualMax && maxY - actualMax > step * 0.4) {
      maxY = actualMax;
    }

    if (maxY - minY < 100) {
      maxY = minY + 100;
    }

    // === ADD PADDING ===
    const paddingBottom = Math.max(50, (maxY - minY) * 0.05); // 5% or min 50
    const paddingTop = (maxY - minY) * 0.08; // 8% on top

    const finalMin = Math.max(
      0,
      Math.floor((minY - paddingBottom) / step) * step,
    );
    const finalMax = Math.ceil((maxY + paddingTop) / step) * step;

    return {
      filteredData: finalData,
      yAxisMin: finalMin,
      yAxisMax: finalMax,
    };
  }, [chartData, range]);

  const series = React.useMemo(
    () => [
      {
        name: "Portfolio Balance",
        data: filteredData.map((item) => ({
          x: item.x,
          y: item.y,
        })),
        color: "#5162be",
      },
    ],
    [filteredData],
  );

  const options = React.useMemo(
    () => ({
      chart: {
        id: "portfolio-chart",
        type: "area",
        height: 350,
        zoom: {
          enabled: true,
          type: "xy",
          autoScaleYaxis: true,
        },
        toolbar: {
          show: true,
          // tools: { zoom: true, zoomin: true, zoomout: true, reset: true },
        },
      },
      colors: portfolioStatisticsColors,
      dataLabels: { enabled: false },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [0, 90],
        },
        colors: ["#5162be"],
      },

      stroke: {
        curve: "stepline",
        width: 3,
        colors: ["#5162be"],
      },

      grid: {
        show: true,
        xaxis: {
          lines: { show: false },
        },
        yaxis: {
          lines: { show: true },
        },
      },
      markers: {
        size: 0,
        hover: { size: 6 },
      },

      xaxis: {
        type: "datetime",
        min: getRangeStart(range)?.getTime(),
        max: Date.now(),

        tickAmount: getTickAmount(range),

        labels: {
          datetimeUTC: false,
          show: true,
          rotate: -45,
          rotateAlways: true, // important
          trim: false,
          style: {
            colors: "#a3a3a3",
            fontSize: "12px",
          },
          minHeight: 50,
          maxHeight: 80,
          hideOverlappingLabels: false,
          showDuplicates: false,

          formatter: (value, timestamp) => {
            const d = new Date(timestamp || value);

            switch (range) {
              case "1D":
                return d
                  .toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: false,
                  })
                  .replace(":00", "");

              case "1W":
                return d.toLocaleDateString([], {
                  day: "numeric",
                  month: "short",
                  // year: "2-digit",
                });
              case "1M":
                return d.toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                });

              case "1Y":
              case "ALL":
                return d.toLocaleDateString([], {
                  month: "short",

                  year: range === "ALL" ? "numeric" : "2-digit",
                });

              default:
                return d.toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                });
            }
          },
        },
        axisBorder: { show: true },
        axisTicks: { show: true },
      },
      yaxis: {
        min: yAxisMin,
        max: yAxisMax,
        tickAmount: 2,
        forceNiceScale: false,
        labels: {
          formatter: (value) => {
            if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
            if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
            return `$${Math.round(value)}`;
          },
          style: { fontSize: "12px" },
        },
      },

      tooltip: {
        x: {
          formatter: (val) =>
            new Date(val).toLocaleString([], {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
        },
        y: {
          formatter: (val) => `$${Number(val).toLocaleString()}`,
        },
      },

      noData: {
        text: "No portfolio history in this period",
      },
    }),
    [range, portfolioStatisticsColors, yAxisMin, yAxisMax],
  );

  return (
    <React.Fragment>
      <Col>
        <Card>
          <TopStats walletAnalytics={analytics} networth={currentNetWorth} />
          <CardHeader>
            <div className="d-flex flex-column gap-2 gap-md-0 flex-md-row align-items-md-center">
              <div className="flex-grow-1">
                <h5 className="card-title mb-0">Statistics</h5>
              </div>
              <div className="toolbar d-flex align-items-start justify-content-md-center flex-wrap gap-2">
                {["1D", "1W", "1M", "1Y", "ALL"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`${
                      range === r ? "btn-primary" : "btn-soft-primary"
                    } btn timeline-btn btn-sm`}
                    onClick={() => setRange(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="apex-charts" dir="ltr">
              <ReactApexChart
                key={range}
                options={options}
                series={series}
                type="area"
                height="320"
                className="apex-charts"
              />
            </div>
          </CardBody>
          <BottomStats walletAnalytics={analytics} walletData={walletData} />
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Statistics;
