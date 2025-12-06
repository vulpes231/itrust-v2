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

// import Bank from "./Bank";
import Crypto from "./Crypto";

const TransferForm = () => {
  const [activeTab, setActiveTab] = useState("crypto");

  const toggleTab = (type) => {
    setActiveTab(type);
  };

  return (
    <form action="">
      <ModalBody className="p-6">
        <Crypto />
      </ModalBody>
      <div className="modal-body"></div>
    </form>
  );
};

export default TransferForm;
