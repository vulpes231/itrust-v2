import { auto, broke, cash } from "../assets";

function getAccessToken() {
  return sessionStorage.getItem("token") || null;
}

const liveUrl = "https://trustserver.cloud";
const devUrl = "http://localhost:5000";

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatCurrency(amount, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

const formatMarketCap = (marketCap) => {
  if (marketCap >= 1e12) {
    return (marketCap / 1e12).toFixed(1) + " trillion";
  } else if (marketCap >= 1e9) {
    return (marketCap / 1e9).toFixed(1) + " billion";
  } else if (marketCap >= 1e6) {
    return (marketCap / 1e6).toFixed(1) + " million";
  } else {
    return marketCap.toFixed(1);
  }
};

const getWalletColor = (name) => {
  switch (name) {
    case "brokerage":
      return "#5126BE";
    case "automated investing":
      return "#F1CF24";
    case "cash":
      return "#29BADB";
    default:
      return null;
  }
};
const getWalletBg = (name) => {
  switch (name) {
    case "brokerage":
      return "#E8EBFD";
    case "automated investing":
      return "#FFF7E4";
    case "cash":
      return "#DFF5FA";
    default:
      return null;
  }
};

const getWalletIcon = (name) => {
  switch (name) {
    case "brokerage":
      return broke;
    case "automated investing":
      return auto;
    case "cash":
      return cash;
    default:
      return null;
  }
};

const getIconColor = (name) => {
  switch (name) {
    case "Traditional IRA":
      return "#261CB6";
    case "Health Savings":
      return "#F17171";
    case "High Yield Savings":
      return "#3AB67A";
    default:
      return null;
  }
};

const getIconBg = (name) => {
  switch (name) {
    case "Traditional IRA":
      return "#E4EDFF";
    case "Health Savings":
      return "#FDEAEA";
    case "High Yield Savings":
      return "#E8F3EA";
    default:
      return null;
  }
};

export {
  getAccessToken,
  liveUrl,
  devUrl,
  capitalizeWords,
  formatCurrency,
  formatMarketCap,
  getWalletColor,
  getWalletIcon,
  getWalletBg,
  getIconColor,
  getIconBg,
};
