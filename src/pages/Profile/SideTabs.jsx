import React, { useState } from "react";
import { Card, Col } from "reactstrap";
import { FiUser } from "react-icons/fi";
import { RiContactsBookLine, RiShieldKeyholeLine } from "react-icons/ri";
import { AiOutlineDollar } from "react-icons/ai";
import { GoGear } from "react-icons/go";

const tabs = [
  { id: "profile", label: "My Profile" },
  { id: "contact", label: "Contact Details" },
  { id: "investing", label: "Investing" },
  { id: "security", label: "Security" },
  { id: "settings", label: "Settings" },
];

const SideTabs = ({ activeTab, setActiveTab }) => {
  const getIcon = (id) => {
    switch (id) {
      case "profile":
        return <FiUser />;
      case "contact":
        return <RiContactsBookLine />;
      case "investing":
        return <AiOutlineDollar />;
      case "security":
        return <RiShieldKeyholeLine />;
      case "settings":
        return <GoGear />;

      default:
        return null;
    }
  };
  return (
    <Card className="py-3">
      <Col className="d-flex flex-column gap-2">
        {tabs.map((tb) => {
          return (
            <span
              onClick={() => setActiveTab(tb.id)}
              key={tb.id}
              style={{ color: "#878A99" }}
              className={`${
                activeTab === tb.id
                  ? "text-secondary bg-secondary-subtle fw-medium"
                  : ""
              } cursor-pointer py-2 px-4 fw-light fs-15 d-flex align-items-center gap-2`}
            >
              {getIcon(tb.id)}
              {tb.label}
            </span>
          );
        })}
      </Col>
    </Card>
  );
};

export default SideTabs;
