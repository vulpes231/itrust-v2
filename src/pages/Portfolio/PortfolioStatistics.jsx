import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { getChartData } from "../../services/user/chart";
import FootStats from "./FootStats";

const PortfolioStatistics = ({ dataColors, activeWallet }) => {
  const [range, setRange] = React.useState("ALL");
  const portfolioStatisticsColors = getChartColorsArray(dataColors);

  const { data: chartData } = useQuery({
    queryFn: getChartData,
    queryKey: ["chart"],
  });

  const filteredData = React.useMemo(() => {
    if (!chartData?.data) return [];
    const now = new Date();

    let cutoffDate;
    switch (range) {
      case "1D":
        cutoffDate = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
        break;
      case "1W":
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "1M":
        cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "6M":
        cutoffDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case "1Y":
        cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        cutoffDate = null;
    }

    let filtered = cutoffDate
      ? chartData.data.filter((item) => new Date(item.date) >= cutoffDate)
      : [...chartData.data];

    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [chartData, range]);

  const series = [
    {
      name: "Balance",
      data: filteredData.map((item) => ({
        x: new Date(item.date).getTime(),
        y: item.balance,
      })),
    },
  ];

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
      curve: "stepline",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        formatter: (val) => {
          const date = new Date(val);
          switch (range) {
            case "1D":
              return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
            case "1W":
            case "1M":
              return date.toLocaleDateString([], {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
            case "6M":
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
      tickAmount: undefined,
    },
    yaxis: {
      min: 0,
      labels: {
        formatter: (val) => {
          if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
          if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
          return `$${val.toLocaleString()}`;
        },
      },
    },
  };

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
                {["1D", "1W", "1M", "6M", "1Y", "ALL"].map((r) => (
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
          <FootStats activeWallet={activeWallet} />
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default PortfolioStatistics;
