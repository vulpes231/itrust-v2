import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

import { getSize } from "../../../constants";

import General from "./General";
import Cash from "./Cash";
import Investing from "./Investing";
import Savings from "./Savings";
import Settings from "./Settings";

// motion

const tabs = [
  { id: "general", label: "general" },
  { id: "cash", label: "cash" },
  { id: "investing", label: "investing" },
  { id: "savings", label: "savings & retirement" },
  { id: "account", label: "account settings" },
];

const Content = () => {
  const [currentQue, setCurrentQue] = useState("");
  const [tab, setTab] = useState("general");

  return (
    <React.Fragment>
      <section className="section bg-light-subtle mt-5 " id="plans">
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="row">
            <div className="col-12">
              <div className="mb-5">
                <h3
                  style={{
                    // color: "#6c757d",
                    lineHeight: 1,
                    fontSize: window.innerWidth >= 562 ? "40px" : "36px",
                  }}
                  className="mb-3 fw-bold"
                >
                  Frequently Asked <br className="d-none d-lg-block" />{" "}
                  Questions
                </h3>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="mb-5 d-flex flex-column gap-3 text-capitalize text-dark">
                {tabs.map((tb) => {
                  return (
                    <span
                      key={tb.id}
                      className="d-flex gap-2 align-items-center"
                      onClick={() => setTab(tb.id)}
                    >
                      <span
                        style={{ width: "35px", height: "5px" }}
                        className={
                          tb.id === tab ? "bg-secondary rounded-4" : ""
                        }
                      ></span>
                      <span
                        className={`fs-16 ${tb.id === tab ? "text-secondary" : ""}`}
                      >
                        {" "}
                        {tb.label}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
            {tab === "general" && (
              <General currentQue={currentQue} setCurrentQue={setCurrentQue} />
            )}
            {tab === "cash" && (
              <Cash currentQue={currentQue} setCurrentQue={setCurrentQue} />
            )}
            {tab === "investing" && (
              <Investing
                currentQue={currentQue}
                setCurrentQue={setCurrentQue}
              />
            )}
            {tab === "savings" && (
              <Savings currentQue={currentQue} setCurrentQue={setCurrentQue} />
            )}
            {tab === "account" && (
              <Settings currentQue={currentQue} setCurrentQue={setCurrentQue} />
            )}
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Content;
