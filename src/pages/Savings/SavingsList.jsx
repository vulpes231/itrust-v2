import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { formatCurrency } from "../../constants";
import { GoDotFill } from "react-icons/go";

const SavingsList = ({ accts }) => {
  const getIcon = (name) => {
    switch (name) {
      case "Traditional IRA":
        return (
          <i style={{ color: "#495057" }} className="ri-shield-line fs-22"></i>
        );
      case "Health Savings":
        return (
          <i style={{ color: "#495057" }} className="ri-service-line fs-22"></i>
        );

      default:
        return null;
    }
  };

  const getIconColor = (name) => {
    switch (name) {
      case "Traditional IRA":
        return "#261CB6";
      case "Health Savings":
        return "#F17171";
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <Col>
        <Card className="">
          <CardHeader className="fs-16 fw-semibold">Accounts</CardHeader>
          <CardBody>
            {accts && accts.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {accts.map((acct) => {
                  return (
                    <div
                      key={acct._id}
                      className="d-flex align-items-center justify-content-between"
                    >
                      <span className="d-flex align-items-center gap-2">
                        <span className="bg-light rounded-2 px-1">
                          {getIcon(acct.name)}
                        </span>
                        <span className="d-flex flex-column">
                          <span>{acct.name}</span>
                          <span className="d-flex align-items-center gap-2">
                            {" "}
                            <GoDotFill
                              style={{ color: getIconColor(acct.name) }}
                            />{" "}
                            {acct.symbol}
                          </span>
                        </span>
                      </span>
                      <span>{formatCurrency(acct.analytics.balance)}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <span className="fw-regular fs-13" style={{ color: "#878A99" }}>
                You have no accounts.
              </span>
            )}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default SavingsList;
