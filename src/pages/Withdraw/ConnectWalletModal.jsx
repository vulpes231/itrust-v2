import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import {
  binance,
  coinbase,
  ledger,
  metamask,
  trust,
  walletconn,
} from "../../assets";

const wallets = [
  {
    id: "walletconnect",
    label: "Wallet Connect",
    info: "Scan to connect",
    img: walletconn,
  },
  {
    id: "metamask",
    label: "Metamask",
    info: "Connect your Metamask Wallet",
    img: metamask,
  },
  {
    id: "coinbase",
    label: "Coinbase",
    info: "Connect your Coinbase Wallet",
    img: coinbase,
  },
  {
    id: "trust",
    label: "Trust Wallet",
    info: "Connect your Trust Wallet",
    img: trust,
  },
  {
    id: "ledger",
    label: "Ledger Live",
    info: "Connect your Ledger Wallet",
    img: ledger,
  },
  {
    id: "binance",
    label: "Binance",
    info: "Connect your Binance Wallet",
    img: binance,
  },
];

const ConnectWalletModal = ({ isOpen, toggle, handleForm }) => {
  const [selectedConnection, setSelectedConnection] = useState("");
  const [error, setError] = useState("");

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} toggle={toggle} centered={true} size="md">
        <div className="d-flex flex-column align-items-center px-2 pt-4 gap-2">
          <span className="text-uppercase fw-bold">Connect Wallet</span>
          <span className="fw-light">
            Choose your preferred wallet to connect
          </span>
        </div>
        <ModalBody>
          <div className="p-2 d-flex flex-column gap-3">
            {wallets.map((wallet) => {
              return (
                <div
                  key={wallet.id}
                  className={`d-flex align-items-center gap-4 px-4 py-2 ${
                    selectedConnection.id === wallet.id
                      ? "bg-primary-subtle"
                      : ""
                  }`}
                  style={{
                    border:
                      selectedConnection.id === wallet.id
                        ? "1px solid #5156be"
                        : "1px solid #dedede",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedConnection(wallet)}
                >
                  <img src={wallet.img} alt="wll" width={30} />
                  <div className="d-flex flex-column">
                    <span
                      style={{
                        color: "#495057",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {wallet.label}
                    </span>
                    <span
                      style={{
                        color: "#212529",
                        fontSize: "14px",
                        fontWeight: 300,
                      }}
                    >
                      {wallet.info}
                    </span>
                  </div>
                </div>
              );
            })}
            <span className="d-flex align-items-center justify-content-center mt-4">
              {" "}
              <button
                style={{ backgroundColor: "#E5E7F5", color: "#5156be" }}
                className="btn btn-primary-subtle"
                onClick={() => {
                  if (selectedConnection) {
                    console.log(selectedConnection);
                    sessionStorage.setItem(
                      "connectMethod",
                      JSON.stringify(selectedConnection)
                    );
                  } else {
                    setError("Select a connection method");
                    return;
                  }
                  handleForm();
                }}
              >
                Connect Wallet
              </button>
            </span>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default ConnectWalletModal;
