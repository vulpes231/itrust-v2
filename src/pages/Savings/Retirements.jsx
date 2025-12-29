import React, { useState } from "react";
import { Card, Col } from "reactstrap";
import { IoShieldOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { formatCurrency } from "../../constants";
import { Link } from "react-router-dom";

const Retirements = ({ analytics }) => {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(!show);
  }

  return (
    <React.Fragment>
      <Col className="">
        <Card className="py-3 px-4">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <span
                className="p-1 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "#5156be",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                }}
              >
                <i class="ri-shield-line fs-20 text-light"></i>
              </span>
              <span className="d-flex flex-column">
                <span className="fw-bold fs-15" style={{ color: "#495057" }}>
                  Retirement Accounts
                </span>
                <span className="fw-regular fs-15" style={{ color: "#212529" }}>
                  {analytics?.retireAcctLength || 0} Accounts <GoDotFill />{" "}
                  {formatCurrency(analytics?.retirementBalance || 0)}
                </span>
              </span>
            </div>
            <div onClick={handleShow}>
              {show ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div>
          <div style={{ display: show ? "block" : "none" }}>
            <div className="d-flex align-items-center justify-content-center flex-column gap-2 p-4">
              <span className="fw-bold fs-16" style={{ color: "#495057" }}>
                No Accounts Found
              </span>
              <span className="fw-regular fs-14" style={{ color: "#878A99" }}>
                Open a new account and start building your retirement portfolio
              </span>
              <Link to={"/open-account"} className="btn btn-primary">
                Open an Account
              </Link>
            </div>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Retirements;
