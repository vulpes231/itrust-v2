import React, { useState } from "react";
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

const DepositForm = () => {
  const [activeTab, setActiveTab] = useState("crypto");

  const toggleTab = (type) => {
    setActiveTab(type);
  };

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
            <Crypto />
          </TabPane>

          <TabPane tabId={"bank"}>
            <Bank />
          </TabPane>
        </TabContent>
      </div>
    </form>
  );
};

export default DepositForm;
