import React, { useEffect, useMemo } from "react";
import ReactApexChart from "react-apexcharts";

import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import {
  formatCurrency,
  getTotalProfit,
  getWalletColorBySlug,
} from "../../constants";
import { capitalize } from "lodash";

const PortfolioCharts = ({
  series,
  selectedWallet,
  chartData,
  chartLabels,
  walletData,
  walletAnalytics,
  networth,
}) => {
  const getChartData = () => {
    if (!chartData || chartData.length === 0) return [100];

    const totalBalance = getTotalBalance();
    if (totalBalance === 0) return [100];

    return chartData;
  };

  const getChartLabels = () => {
    if (!chartLabels || chartLabels.length === 0) return ["No Data"];

    const totalBalance = getTotalBalance();
    if (totalBalance === 0 && chartLabels.length > 0) {
      return chartLabels;
    }

    return chartLabels;
  };

  const getTotalBalance = () => {
    if (!series || series.length === 0) return 0;
    if (!walletData) return 0;
    if (!walletAnalytics) return 0;

    if (selectedWallet === "All") {
      return networth || 0;
    } else {
      const wallet = series[0];
      if (!wallet) return 0;

      if (wallet.slug === "cash") {
        return wallet.balance.total;
      }

      return (
        wallet.balance.total + (walletData[wallet.slug]?.totalProfitLoss || 0)
      );
    }
  };

  const chartColors =
    series?.length > 0
      ? series.map(
          (wallet) =>
            getWalletColorBySlug(wallet.designTag ?? wallet.slug) || "#727cf5",
        )
      : ["#727cf5"];

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
  const chart = useMemo(() => {
    const asset = Array.isArray(seriesData) ? seriesData[0] : seriesData;

    if (!asset) return null;

    const p = asset.priceData || {};

    const current = Number(p.current || p.price || p.last || 0);

    const previousClose = Number(
      p.previousClose ||
        p.prevClose ||
        p.previousDayClose ||
        p.yesterdayClose ||
        current,
    );

    const values = [
      Number(p.open || previousClose),
      Number(p.dayLow || previousClose),
      current,
      Number(p.dayHigh || current),
      previousClose,
    ].filter((value) => Number.isFinite(value) && value > 0);

    if (values.length < 2) {
      values.push(current);
    }

    const width = 130;
    const height = 46;
    const padding = 4;

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const points = values
      .map((value, index) => {
        const x =
          padding + (index / (values.length - 1)) * (width - padding * 2);

        const y =
          height - padding - ((value - min) / range) * (height - padding * 2);

        return `${x},${y}`;
      })
      .join(" ");

    const isUp = current >= previousClose * 1.00001;

    return {
      points,
      color: isUp ? "#67b173" : "#f17171",
    };
  }, [seriesData]);

  if (!chart) return null;

  return (
    <div
      style={{
        width: "130px",
        height: "46px",
        overflow: "hidden",
      }}
    >
      <svg
        width="130"
        height="46"
        viewBox="0 0 130 46"
        style={{
          display: "block",
        }}
      >
        <polyline
          points={chart.points}
          fill="none"
          stroke={chart.color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export { PortfolioCharts, MarkerCharts, WidgetsCharts };
