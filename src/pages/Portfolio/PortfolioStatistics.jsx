import React, { useEffect } from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { getPortfolioChartData } from "../../services/user/chart";
import FootStats from "./FootStats";

const PortfolioStatistics = ({
  dataColors,
  activeWallet,
  walletData,
  cash,
  analytics,
  currentNetWorth = 0,
}) => {
  const [range, setRange] = React.useState("ALL");
  const walletId = activeWallet?._id;

  // console.log("walletId", walletId);
  const portfolioStatisticsColors = getChartColorsArray(dataColors);

  const { data: chartData } = useQuery({
    queryKey: ["chart", range, walletId],

    enabled: !!walletId,

    queryFn: () =>
      getPortfolioChartData({
        timeframe: range.toLowerCase(),
        walletId,
      }),
  });

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
      default:
        return null;
    }

    return date;
  };

  // useEffect(() => {
  //   if (range && chartData) console.log(range, chartData);
  // }, [range, chartData]);

  const filteredData = React.useMemo(() => {
    const rangeStart = getRangeStart(range);
    const now = new Date();
    const nowTime = now.getTime();

    let data = [...(chartData || [])]
      .map((item) => {
        let timestamp = item.x;
        if (typeof timestamp === "string" || typeof timestamp === "number") {
          timestamp = new Date(timestamp).getTime();
        }
        return {
          x: isNaN(timestamp) ? nowTime : timestamp,
          y: Math.max(0, Number(item.y) || 0),
          reason: item.reason,
        };
      })
      .sort((a, b) => a.x - b.x);

    // Filter by selected range
    if (rangeStart) {
      const startTime = rangeStart.getTime();
      data = data.filter((item) => item.x >= startTime && item.x <= nowTime);
    }

    const startTime = rangeStart
      ? rangeStart.getTime()
      : (data[0]?.x ?? nowTime - 3600000);
    const endTime = nowTime;

    const finalData = [];

    if (data.length === 0) {
      const value = currentNetWorth ?? 0;
      finalData.push({ x: startTime, y: value });
      finalData.push({ x: endTime, y: value });
    } else {
      finalData.push({ x: startTime, y: 0 });

      finalData.push(...data);

      const lastValue = data[data.length - 1].y;
      if (data[data.length - 1].x < endTime) {
        finalData.push({ x: endTime, y: lastValue });
      }
    }

    return finalData;
  }, [chartData, range, currentNetWorth]);

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
        zoom: { enabled: false },
        toolbar: { show: true },
      },
      colors: portfolioStatisticsColors,
      dataLabels: { enabled: false },
      stroke: {
        curve: "stepline",
        width: 3,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.05,
          stops: [0, 100],
        },
      },
      markers: {
        size: 0,
        hover: { size: 6 },
      },

      xaxis: {
        type: "datetime",
        min: range !== "ALL" ? getRangeStart(range)?.getTime() : undefined,
        max: Date.now(),

        tickAmount: range === "1H" ? 6 : range === "1D" ? 10 : undefined,

        labels: {
          datetimeUTC: false,
          show: true,
          rotate: 90,
          style: {
            colors: "#a3a3a3",
            fontSize: "12px",
          },
          minHeight: 50,
          maxHeight: 70,
          formatter: (value, timestamp) => {
            const d = new Date(timestamp || value);

            switch (range) {
              case "1H":
                return d.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              case "1D":
                return d.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                });
              case "1W":
                return d.toLocaleDateString([], {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                });
              case "1M":
                return d.toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                });
              case "1Y":
                return d.toLocaleDateString([], {
                  month: "short",
                  year: "numeric",
                });
              default:
                return d.toLocaleDateString([], {
                  month: "short",
                  year: "2-digit",
                });
            }
          },
        },

        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
      },

      yaxis: {
        min: 0,
        forceNiceScale: true,
        labels: {
          formatter: (value) => {
            if (value >= 1000000) {
              return `$${(value / 1000000).toFixed(1)}M`;
            }

            if (value >= 1000) {
              return `$${(value / 1000).toFixed(1)}K`;
            }

            return `$${Math.round(value)}`;
          },
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
    [range, portfolioStatisticsColors],
  );

  return (
    <React.Fragment>
      <Col>
        <Card>
          <CardHeader>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <h5 className="card-title mb-0">Statistics</h5>
              </div>
              <div className="toolbar d-flex align-items-start justify-content-center flex-wrap gap-2">
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
                options={options}
                series={series}
                type="area"
                height="320"
                className="apex-charts"
              />
            </div>
          </CardBody>
          <FootStats
            activeWallet={activeWallet}
            walletData={walletData}
            cashAccount={cash}
          />
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default PortfolioStatistics;
