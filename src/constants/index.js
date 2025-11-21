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

export {
  getAccessToken,
  liveUrl,
  devUrl,
  capitalizeWords,
  formatCurrency,
  formatMarketCap,
};
