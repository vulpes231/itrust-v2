import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserWallets } from "../../services/user/wallet";
import {
  formatCurrency,
  getAccessToken,
  getWalletColor,
  getWalletIcon,
} from "../../constants";
import { Label } from "reactstrap";
import { GoDotFill } from "react-icons/go";
import { capitalize } from "lodash";

const AccountList = () => {
  const token = getAccessToken();

  const { data: wallets } = useQuery({
    queryFn: getUserWallets,
    queryKey: ["wallets"],
    enabled: !!token,
  });

  return (
    <React.Fragment>
      <div>
        <Label
          className="pt-3 px-3"
          style={{
            fontSize: "16px",
            fontWeight: "600",
            // lineHeight: "0",
            // backgroundColor: "red",
          }}
        >
          Accounts
        </Label>
        <hr style={{ color: "#000" }} className="p-0" />
        <div>
          {wallets &&
            wallets.length > 0 &&
            wallets.map((wallet) => {
              return (
                <div
                  className="d-flex align-items-start gap-2 justify-content-between px-4 py-2"
                  // gap-2
                  key={wallet._id}
                >
                  <div className="d-flex align-items-start gap-2">
                    <img src={getWalletIcon(wallet.name)} alt="" width={20} />
                    <span className="d-flex flex-column">
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
                          color: "#878A99",
                          fontWeight: 300,
                          fontSize: "13px",
                        }}
                        className="d-flex align-items-center"
                      >
                        <GoDotFill
                          style={{ color: getWalletColor(wallet.name) }}
                        />
                        {capitalize(wallet.name)}
                      </span>
                    </span>
                  </div>
                  <span
                    style={{
                      color: "#495057",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    {formatCurrency(wallet.availableBalance)}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AccountList;
