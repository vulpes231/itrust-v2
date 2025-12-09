import React, { useEffect, useState } from "react";
import {
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

import Bank from "./Bank";
import Crypto from "./Crypto";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/user/settings";
import { getAccessToken } from "../../constants";

const DepositForm = () => {
  const [activeTab, setActiveTab] = useState("crypto");

  const toggleTab = (type) => {
    setActiveTab(type);
  };

  const token = getAccessToken();

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    enabled: !!token,
  });

  return (
    <form action="">
      <ModalBody className="p-0">
        <div className="step-arrow-nav">
          <Nav className="nav-pills nav-justified custom-nav" role="tablist">
            <NavItem>
              <NavLink
                href="#"
                className={classnames(
                  {
                    active: activeTab === "crypto",
                  },
                  "p-3"
                )}
                onClick={() => {
                  toggleTab("crypto");
                }}
              >
                Crypto Deposit
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                className={classnames(
                  {
                    active: activeTab === "bank",
                  },
                  "p-3"
                )}
                onClick={() => {
                  toggleTab("bank");
                }}
              >
                Bank Deposit
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </ModalBody>
      <div className="modal-body">
        <TabContent activeTab={activeTab}>
          <TabPane tabId={"crypto"}>
            <Crypto settings={settings} />
          </TabPane>

          <TabPane tabId={"bank"}>
            <Bank settings={settings} />
          </TabPane>
        </TabContent>
      </div>
    </form>
  );
};

export default DepositForm;
