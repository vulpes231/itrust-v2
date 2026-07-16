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
  if (!marketCap) return;
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
    case "individual brokerage":
      return "text-warning";
    case "automated investing":
      return "text-info";
    case "cash account":
      return "text-secondary";
    default:
      return null;
  }
};

const getWalletBg = (name) => {
  switch (name) {
    case "brokerage":
      return "#E8EBFD";
    case "auto":
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
    case "auto":
      return auto;
    case "cash":
      return cash;
    default:
      return null;
  }
};

const getIconColor = (name) => {
  switch (name) {
    case "traditional ira":
      return "#261CB6";
    case "health savings":
      return "#F17171";
    case "high yield savings":
      return "#3AB67A";
    default:
      return null;
  }
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const getIconBg = (name) => {
  switch (name) {
    case "traditional ira":
      return "#E4EDFF";
    case "health savings":
      return "#FDEAEA";
    case "high yield savings":
      return "#E8F3EA";
    default:
      return null;
  }
};

const getTotalProfit = (wallet, walletData) => {
  if (!walletData) return 0;
  const slug = wallet.slug;

  // console.log(walletData);

  if (walletData[slug] && walletData[slug].totalProfitLoss !== undefined) {
    return walletData[slug].totalProfitLoss;
  }
  return 0;
};

const allowedRoutesIfNotVerified = [
  "/dashboard",
  "/cash",
  "/deposit",
  "/transfer",
  "/withdraw",
  "/profile",
  "/contact",
  "/personal",
];

const validateFileSize = (file) => {
  const maxSize = 10 * 1024 * 1024;

  if (file.size > maxSize) {
    return false;
  }

  return true;
};

export {
  getAccessToken,
  validateFileSize,
  allowedRoutesIfNotVerified,
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
  formatBytes,
  getTotalProfit,
};
