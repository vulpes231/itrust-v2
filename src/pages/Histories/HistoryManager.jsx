import React, { useState } from "react";
import { Col, Input, Row } from "reactstrap";

const btns = [
  { id: "trade", label: "trade orders" },
  { id: "dividend", label: "dividends" },
  { id: "deposit", label: "deposits" },
  { id: "withdrawal", label: "withdrawals" },
  { id: "transfer", label: "transfers" },
  { id: "savings", label: "savings & contributions" },
  { id: "all", label: "transactions" },
];

const HistoryManager = ({ activeHistoryTab, setActiveHistoryTab }) => {
  return (
    <React.Fragment>
      <Col className="d-flex flex-column gap-3">
        <Col className="d-flex justify-content-end gap-2 ">
          {btns.map((btn) => {
            return (
              <button
                className={`btn text-capitalize fs-13 ${
                  activeHistoryTab === btn.id
                    ? "btn-secondary"
                    : "bg-secondary-subtle text-secondary"
                }`}
                key={btn.id}
                type="button"
                onClick={() => setActiveHistoryTab(btn.id)}
              >
                {btn.label}
              </button>
            );
          })}
        </Col>
        <Row>
          <Col className="d-flex align-items-center gap-2" md={4}>
            <span className="text-capitalize" style={{ whiteSpace: "nowrap" }}>
              sort by:
            </span>
            <Input type="select">
              <option value="">Select Account</option>
              <option value="">Cash</option>
              <option value="">Automated Investing</option>
              <option value="">Brokerage</option>
            </Input>
            <Input type="select">
              <option value="">Select Status</option>
              <option value="completed">Processed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </Input>
          </Col>
          <Col md={5} />
          <Col className="d-flex align-items-center gap-2" md={3}>
            <Input type="text" placeholder="Search for transactions..." />
            <button className="btn btn-secondary">filter</button>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  );
};

export default HistoryManager;
