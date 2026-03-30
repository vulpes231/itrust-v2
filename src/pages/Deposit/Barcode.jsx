import React, { useEffect } from "react";
import QRCode from "react-qr-code";

const Barcode = ({ method, network, amount, address }) => {
  const generateQRValue = () => {
    if (!address) return "";

    const m = method?.toLowerCase();
    const n = network?.toLowerCase();

    if (m === "btc" || n === "bitcoin") {
      return `bitcoin:${address}${amount ? `?amount=${amount}` : ""}`;
    }

    if (m === "eth") {
      return `ethereum:${address}${amount ? `?value=${amount}` : ""}`;
    }

    if (m === "usdt") {
      if (n === "trc20") {
        return address;
      }

      if (n === "erc20") {
        return `ethereum:${address}`;
      }
    }

    return address;
  };

  const qrValue = generateQRValue();

  useEffect(() => {
    if (address) console.log(`${method} ${address}`);
  }, [address]);

  return (
    <div className="d-flex flex-column align-items-center gap-2">
      {qrValue ? (
        <>
          <div className="p-2 bg-white rounded">
            <QRCode value={qrValue} size={180} />
          </div>

          <small className="text-muted text-center">
            Scan to pay{" "}
            {amount
              ? `${amount} ${method?.toUpperCase()}`
              : method?.toUpperCase()}
          </small>
        </>
      ) : (
        <span className="text-muted">No coin selected.</span>
      )}
    </div>
  );
};

export default Barcode;
