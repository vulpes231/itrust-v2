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
        return 24; // ~hourly
      case "1W":
        return 8; // daily-ish for a week
      case "1M":
        return 15; // daily for a month
      case "1Y":
        return 12; // monthly
      case "ALL":
        return 12; // monthly
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

  useEffect(() => {
    if (range && chartData) console.log(range, chartData);
  }, [range, chartData]);

  const { filteredData, yAxisMax } = React.useMemo(() => {
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

    const finalData = [{ x: rangeStart?.getTime() ?? nowTime, y: 0 }, ...data];

    const maxY = finalData.reduce((max, point) => Math.max(max, point.y), 0);

    return {
      filteredData: finalData,
      yAxisMax: Math.max(500, Math.ceil(maxY / 500) * 500),
    };
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

      markers: {
        size: 4,
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
        min: 0,
        max: yAxisMax,
        tickAmount: yAxisMax / 1000,
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
    [range, portfolioStatisticsColors, yAxisMax],
  );

  return (
    <React.Fragment>
      <Col>
        <Card>
          <TopStats walletAnalytics={analytics} networth={currentNetWorth} />
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
