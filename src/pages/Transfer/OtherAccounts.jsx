import React from "react";
import { formatCurrency, getWalletBg, getWalletIcon } from "../../constants";
import { capitalize } from "lodash";
import { GoDotFill } from "react-icons/go";

const OtherAccounts = ({ otherAccts, setToAccount, toAccount }) => {
  return (
    <div className="d-flex flex-column gap-2">
      {otherAccts.map((wallet) => {
        return (
          <div
            className={`d-flex align-items-center gap-2 justify-content-between px-4 py-2 rounded  ${
              toAccount._id === wallet._id ? "bg-primary-subtle" : ""
            }`}
            style={{
              border:
                toAccount._id === wallet._id
                  ? "1px solid #5156be"
                  : "1px solid #dedede",
            }}
            key={wallet._id}
            onClick={() => setToAccount(wallet)}
          >
            <div className={`d-flex align-items-center gap-3`}>
              <figure
                style={{
                  backgroundColor: getWalletBg(wallet.slug),
                  // color: getWalletColor(wallet.name),
                }}
                className="p-1 d-flex align-items-center justify-content-center rounded"
              >
                <img src={getWalletIcon(wallet.slug)} alt="" width={20} />
              </figure>
              <div className="d-flex flex-column gap-1">
                <span
                  style={{
                    color: "#495057",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {capitalize(wallet.name)}
                </span>

                <span
                  style={{
                    color: "#212529",
                    fontWeight: 300,
                    fontSize: "14px",
                  }}
                >
                  Balance: {formatCurrency(wallet.availableBalance)}
                </span>
              </div>
            </div>
            <div
              style={{
                border:
                  toAccount._id === wallet._id
                    ? "3px solid #5156be"
                    : "3px solid #505050",
                borderRadius: "50%",
                width: "16px",
                height: "16px",
              }}
              className="d-flex align-items-center justify-content-center"
            >
              <GoDotFill
                style={{
                  display: toAccount._id === wallet._id ? "flex" : "none",
                  color: toAccount._id === wallet._id ? "#5156be" : "none",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OtherAccounts;
