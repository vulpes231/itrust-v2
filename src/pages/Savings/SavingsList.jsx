import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import {
  formatCurrency,
  getWalletColorBySlug,
  getWalletLogoBySlug,
} from "../../constants";
import { GoDotFill } from "react-icons/go";
import { upperCase } from "lodash";

const SavingsList = ({ accts }) => {
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
                        <div className="flex-shrink-0 avatar-xs">
                          <span
                            style={{
                              backgroundColor: `${getWalletColorBySlug(acct.designTag)}33`,
                            }}
                            className="avatar-title text-muted p-1 rounded-circle"
                          >
                            <i
                              style={{
                                color: getWalletColorBySlug(acct.designTag),
                              }}
                              className={getWalletLogoBySlug(acct.designTag)}
                            />
                          </span>
                        </div>
                        <span className="d-flex flex-column">
                          <span className="fs-14 fw-semibold text-capitalize">
                            {acct.name.includes("ira")
                              ? `${acct.name.split(" ")[0]} ${upperCase(acct.name.split(" ")[1])}`
                              : acct.name}
                          </span>
                          <span
                            style={{ color: "#878A99" }}
                            className="d-flex align-items-center gap-2 text-uppercase"
                          >
                            {" "}
                            <GoDotFill
                              style={{
                                color: getWalletColorBySlug(acct.designTag),
                              }}
                            />{" "}
                            {acct.slug}
                          </span>
                        </span>
                      </span>
                      <span className="fs-14 fw-semibold">
                        {formatCurrency(acct.balance.available)}
                      </span>
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
