import React, { useEffect } from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";

import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import TopStats from "./TopStats";
import BottomStats from "./BottomStats";
import { getChartData } from "../../services/user/chart";

const Statistics = ({ dataColors, analytics }) => {
  const [range, setRange] = React.useState("ALL");
  const portfolioStatisticsColors = getChartColorsArray(dataColors);

  const { data: chartData } = useQuery({
    queryFn: () => getChartData({ timeframe: range.toLowerCase() }),
    queryKey: ["chart", range],
  });

  const filteredData = React.useMemo(() => {
    if (!chartData?.length) return [];

    const sorted = [...chartData].sort(
      (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime(),
    );

    const withBalance = sorted.map((item) => ({
      x: new Date(item.x), // Ensure it's a Date object
      y: item.y, // Directly use the portfolio value
      reason: item.reason,
    }));

    // Date filtering
    const now = new Date();
    let cutoffDate = null;

    switch (range) {
      case "1H":
        cutoffDate = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case "1D":
        cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "1W":
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "1M":
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "1Y":
        cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      case "ALL":
        cutoffDate = null;
        break;
      default:
        cutoffDate = null;
    }

    const filtered = cutoffDate
      ? withBalance.filter((item) => item.x >= cutoffDate)
      : withBalance;

    // console.log(`Range: ${range}, Points: ${filtered.length}`, filtered);
    return filtered;
  }, [chartData, range]);

  const series = React.useMemo(
    () => [
      {
        name: "Portfolio Balance",
        data: filteredData.map((item) => ({
          x: item.x.getTime(),
          y: Math.max(0, item.y),
        })),
      },
    ],
    [filteredData],
  );

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: { autoScaleYaxis: true },
      toolbar: {
        show: true,
        tools: {
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    colors: portfolioStatisticsColors,
    dataLabels: { enabled: false },
    markers: {
      size: 4,
      style: "hollow",
      colors: portfolioStatisticsColors,
      strokeWidth: 2,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm",
        formatter: (val) => {
          const date = new Date(val);
          return date.toLocaleString();
        },
      },
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        formatter: (val) => {
          const date = new Date(val);

          if (isNaN(date.getTime())) return "";

          switch (range) {
            case "1H":
              return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
            case "1D":
              return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
            case "1W":
              return date.toLocaleDateString([], {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
            case "1M":
              return date.toLocaleDateString([], {
                month: "short",
                day: "numeric",
              });
            case "1Y":
            case "ALL":
            default:
              return date.toLocaleDateString([], {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
          }
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => {
          if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
          if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
          return `$${val.toLocaleString()}`;
        },
      },
    },
  };

  // useEffect(() => {
  //   if (chartData) {
  //     console.log("Chart data received:", chartData);
  //     console.log("Date range:", range);
  //   }
  // }, [chartData, range]);

  return (
    <React.Fragment>
      <Col>
        <Card>
          <TopStats walletAnalytics={analytics} />
          <CardHeader>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <h5 className="card-title mb-0">Statistics</h5>
              </div>
              <div className="toolbar d-flex align-items-start justify-content-center flex-wrap gap-2">
                {["1H", "1D", "1W", "1M", "1Y", "ALL"].map((r) => (
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
                key={range} // Add key to force re-render when range changes
                options={options}
                series={series}
                type="area"
                height="320"
                className="apex-charts"
              />
            </div>
          </CardBody>
          <BottomStats walletAnalytics={analytics} />
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Statistics;
