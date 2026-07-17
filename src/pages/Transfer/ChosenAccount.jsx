import React from "react";
import {
  formatCurrency,
  getWalletColorBySlug,
  getWalletLogoBySlug,
} from "../../constants";
import { capitalize } from "lodash";
import { GoDotFill } from "react-icons/go";

const ChoseAccount = ({
  chosenAccount,
  setSelectedAccount,
  selectedAccount,
  setAccountSelected,
  accountSelected,
  setToAccount,
}) => {
  return (
    <div>
      {chosenAccount.map((wallet) => {
        return (
          <div
            className={`d-flex align-items-center gap-2 justify-content-between px-4 py-2 rounded border border-1 ${
              selectedAccount._id === wallet._id
                ? "bg-primary-subtle border-secondary"
                : ""
            }`}
            key={wallet._id}
            onClick={() => {
              setAccountSelected(!accountSelected);
              setSelectedAccount("");
              setToAccount("");
            }}
          >
            <div className={`d-flex align-items-center gap-3`}>
              <div className="flex-shrink-0 avatar-xs">
                <span
                  style={{
                    backgroundColor: wallet.designTag
                      ? `${getWalletColorBySlug(wallet.designTag)}33`
                      : `${getWalletColorBySlug(wallet.slug)}33`,
                  }}
                  className="avatar-title text-muted p-1 rounded-circle"
                >
                  <i
                    style={{
                      color: getWalletColorBySlug(
                        wallet.designTag ?? wallet.slug,
                      ),
                    }}
                    className={getWalletLogoBySlug(
                      wallet.designTag ?? wallet.slug,
                    )}
                  />
                </span>
              </div>
              <div className="d-flex flex-column gap-1">
                <span
                  style={{
                    // color: "#495057",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {capitalize(wallet.name)}
                </span>

                <span
                  style={{
                    // color: "#212529",
                    fontWeight: 300,
                    fontSize: "14px",
                  }}
                  className="text-muted"
                >
                  Balance: {formatCurrency(wallet.balance.available)}
                </span>
              </div>
            </div>
            <div
              style={{
                border:
                  selectedAccount._id === wallet._id
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
                  display: selectedAccount._id === wallet._id ? "flex" : "none",
                  color:
                    selectedAccount._id === wallet._id ? "#5156be" : "none",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChoseAccount;
