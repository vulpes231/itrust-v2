import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { formatCurrency } from "../../constants";

const PortfolioCharts = ({ dataColors, series }) => {
  const getChartData = () => {
    if (!series || !series.length) return [];

    return series.map((wallet) => wallet.totalBalance);
  };

  const getChartLabels = () => {
    if (!series || !series.length) return [];

    return series.map((wallet) => wallet.name);
  };

  var donutchartportfolioColors = getChartColorsArray(dataColors);

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
                return "$" + val;
              },
            },
            total: {
              show: true,
              fontSize: "13px",
              label: "Total value",
              color: "#9599ad",
              fontWeight: 500,
              formatter: function (w) {
                const totalBalance = series.reduce(
                  (sum, wallet) => sum + wallet.totalBalance,
                  0
                );
                return formatCurrency(totalBalance);
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
    yaxis: {
      labels: {
        formatter: function (value) {
          return formatCurrency(value);
        },
      },
    },
    stroke: {
      lineCap: "round",
      width: 2,
    },
    colors: donutchartportfolioColors,
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={getChartData()} // Pass array of numbers, not objects
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

      // This line decides green or red — make it bulletproof
      const isUp = current >= previousClose * 1.00001; // tiny tolerance for floating point
      const color = isUp ? "#67b173" : "#f17171";

      // Build data points — always include at least start/end for visible line
      const data = [
        p.open || previousClose,
        p.dayLow || previousClose,
        current,
        p.dayHigh || current,
        previousClose,
      ].filter((v) => typeof v === "number" && !isNaN(v) && v > 0);

      // Fallback: at least show a flat or tiny movement line
      if (data.length < 2) {
        data.push(current);
      }

      return {
        name: asset.name || asset.symbol || "Asset",
        data: data,
        color: color, // This forces green/red correctly
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
    // Remove global colors[] — let each series define its own color
    // colors: areachartlitecoinColors,  ← Remove this line!
  };

  return (
    <React.Fragment>
      {/* {console.log("DEBUG SERIES:", convertToSeriesData(seriesData))} */}
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
