import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { formatCurrency } from "../../constants";
import { capitalize } from "lodash";

const PortfolioCharts = ({
  dataColors,
  series,
  selectedWallet,
  chartData,
  chartLabels,
}) => {
  const getChartData = () => {
    // When there's no data or all values are zero, return [100] to show full circle
    if (!chartData || chartData.length === 0) return [100];

    // Check if all balances are zero
    const totalBalance = getTotalBalance();
    if (totalBalance === 0) return [100];

    return chartData;
  };

  const getChartLabels = () => {
    if (!chartLabels || chartLabels.length === 0) return ["No Data"];

    // When balance is zero but we have wallets, show wallet names
    const totalBalance = getTotalBalance();
    if (totalBalance === 0 && chartLabels.length > 0) {
      return chartLabels;
    }

    return chartLabels;
  };

  const getTotalBalance = () => {
    if (!series || series.length === 0) return 0;

    if (selectedWallet === "All") {
      return series.reduce((sum, wallet) => sum + wallet.totalBalance, 0);
    } else {
      return series.length > 0 ? series[0].totalBalance : 0;
    }
  };

  var donutchartportfolioColors = getChartColorsArray(dataColors);

  // Ensure we have at least one color for the chart
  const chartColors =
    donutchartportfolioColors.length > 0
      ? donutchartportfolioColors
      : ["#727cf5"]; // Fallback color

  var options = {
    labels: getChartLabels(),
    chart: {
      type: "donut",
      height: 224,
    },
    plotOptions: {
      pie: {
        size: 100,
        offsetX: 0,
        offsetY: 0,
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "18px",
              offsetY: -5,
            },
            value: {
              show: true,
              fontSize: "20px",
              color: "#343a40",
              fontWeight: 500,
              offsetY: 5,
              formatter: function (val) {
                const totalBalance = getTotalBalance();
                if (totalBalance === 0) {
                  return "$0.00";
                }
                if (selectedWallet === "All") {
                  return "$" + val;
                }
                return formatCurrency(getTotalBalance());
              },
            },
            total: {
              show: true,
              fontSize: "13px",
              label:
                selectedWallet === "All"
                  ? "Total value"
                  : capitalize(selectedWallet),
              color: "#9599ad",
              fontWeight: 500,
              formatter: function (w) {
                return formatCurrency(getTotalBalance());
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      lineCap: "round",
      width: 2,
    },
    colors: chartColors,
  };

  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={getChartData()}
        type="donut"
        height="224"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

const MarkerCharts = ({ dataColors, series }) => {
  var MarketchartColors = getChartColorsArray(dataColors);
  // const MarketchartColors = ["#67b173", "#f17171"];

  var options = {
    chart: {
      type: "candlestick",
      height: 294,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: MarketchartColors[0],
          downward: MarketchartColors[1],
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
    tooltip: {
      shared: true,
      y: [
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
          },
        },
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return "$" + y.toFixed(2) + "k";
            }
            return y;
          },
        },
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " Sales";
            }
            return y;
          },
        },
      ],
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        // series={series}
        series={series && series.length ? series : [{ data: [] }]}
        type="candlestick"
        height="294"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

const WidgetsCharts = ({ seriesData }) => {
  const convertToSeriesData = (assetsArray) => {
    if (!assetsArray) return [];
    if (!Array.isArray(assetsArray)) assetsArray = [assetsArray];

    return assetsArray.map((asset) => {
      const p = asset.priceData || {};

      // Normalize common field names
      const current = Number(p.current || p.price || p.last || 0);
      const previousClose = Number(
        p.previousClose ||
          p.prevClose ||
          p.previousDayClose ||
          p.yesterdayClose ||
          current
      );

      const isUp = current >= previousClose * 1.00001;
      const color = isUp ? "#67b173" : "#f17171";

      const data = [
        p.open || previousClose,
        p.dayLow || previousClose,
        current,
        p.dayHigh || current,
        previousClose,
      ].filter((v) => typeof v === "number" && !isNaN(v) && v > 0);

      if (data.length < 2) {
        data.push(current);
      }

      return {
        name: asset.name || asset.symbol || "Asset",
        data: data,
        color: color,
      };
    });
  };

  const series = convertToSeriesData(seriesData);

  const options = {
    chart: {
      width: 130,
      height: 46,
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
  };

  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="area"
        height="46"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export { PortfolioCharts, MarkerCharts, WidgetsCharts };
