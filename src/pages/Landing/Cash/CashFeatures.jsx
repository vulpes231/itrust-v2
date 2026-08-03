import React from "react";
import { Container } from "reactstrap";
import { getBodySize, getSize } from "../../../constants";
import { atm, cat, dep, deppy, keep, pay, save1 } from "../../../assets";
import { Link } from "react-router-dom";

const CashFeatures = () => {
  const cashFeats = [
    {
      id: 1,
      title: "ATM fee reimbursement",
      info: "We’ll reimburse 2 fees per month at out- of-network ATMs globally. (up to $7.50 each). You can also access 29,000+  free ATMs nationwide.",
      img: atm,
    },
    {
      id: 2,
      title: "Free cash transfers",
      info: "Transfer funds for free to title and escrow companies and accounts you own at other institutions.",
      img: deppy,
    },
    {
      id: 3,
      title: "Pay bills, send and deposit checks",
      info: "Move money and pay bills with account and routing numbers, plus send free checks and make deposits with our mobile app.",
      img: pay,
    },
  ];
  const savingsFeats = [
    {
      id: 4,
      title: "Transfer to invest in minutes",
      info: "Move cash to trading account automatically in minutes, and get your long- term money working even harder, ASAP.",
      img: save1,
    },
    {
      id: 5,
      title: "Automated savings and transfers",
      info: "Create your own automated plans and set recurring transfers to move money to your savings goals and investments with Itrust Investment.",
      img: keep,
    },
    {
      id: 6,
      title: "Cash Categories",
      info: "Easily bucket your money to stay organized and set customizable saving goals.",
      img: cat,
    },
  ];
  return (
    <React.Fragment>
      <div className="">
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div>
            <h4 className="text-center text-uppercase fw-lighter fs-16">
              Cash features
            </h4>
            <div className="row mt-5 align-items-center g-3 g-lg-5 mb-5 p-2 p-lg-0">
              {cashFeats.map((item) => {
                return (
                  <div key={item.id} className="col-12 col-lg-4">
                    <div
                      className="d-flex flex-column justify-content-between gap-2 bg-white rounded-3 p-4 shadow-lg"
                      // style={{ height: "400px" }}
                    >
                      <div>
                        <h3
                          className="font-bolder"
                          style={{ fontSize: "26px" }}
                        >
                          {item.title}
                        </h3>
                        <p className="fs-16 text-dark">{item.info}</p>
                      </div>
                      <img
                        src={item.img}
                        alt=""
                        className="img-fluid"
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="text-center text-uppercase fw-lighter fs-16 mt-4">
              savings features
            </h4>
            <div className="row mt-5 align-items-center g-3 g-lg-5 p-2 p-lg-0">
              {savingsFeats.map((item) => {
                return (
                  <div key={item.id} className="col-12 col-lg-4">
                    <div
                      className="d-flex flex-column justify-content-between gap-2 bg-white rounded-3 p-4 shadow-lg"
                      // style={{ height: "400px" }}
                    >
                      <div>
                        <h3
                          className="font-bolder"
                          style={{ fontSize: "26px" }}
                        >
                          {item.title}
                        </h3>
                        <p className="fs-16 text-dark">{item.info}</p>
                      </div>
                      <img
                        src={item.img}
                        alt=""
                        className="img-fluid"
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* foooter */}
          <div className="mt-5">
            <div className="d-flex align-items-center flex-column justify-content-center">
              <p
                style={{
                  color: "#202020",
                  fontSize: window.innerWidth >= 562 ? "35px" : "26px",
                  maxWidth: window.innerWidth >= 562 ? "520px" : "90%",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
                className="text-center"
              >
                Ready to get your money earning?
              </p>
              <Link
                style={{
                  width: window.innerWidth > 562 ? "180px" : "120px",
                  height: window.innerWidth > 562 ? "50px" : "44px",
                }}
                className="btn btn-secondary fw-bold p-1 p-lg-2 d-flex align-items-center justify-content-center mt-4"
                to="/register"
              >
                Open an account
              </Link>
            </div>

            <div className="d-flex align-items-center flex-column justify-content-center text-center mt-5">
              <h3
                className="fw-bold mb-3 mt-4"
                style={{
                  color: "#202020",
                  fontSize: window.innerWidth >= 562 ? "44px" : "30px",
                  maxWidth: window.innerWidth >= 562 ? "520px" : "90%",
                  fontWeight: 900,
                }}
              >
                Don’t just grow your savings.
              </h3>
              <span
                style={{
                  color: "#202020",
                  fontSize: window.innerWidth >= 562 ? "35px" : "26px",
                  maxWidth: window.innerWidth >= 562 ? "520px" : "90%",
                  fontWeight: 300,
                  lineHeight: 1,
                  fontStyle: "italic",
                }}
              >
                Grow your spendings too.
              </span>
              <p
                className="mb-0 mt-3 fs-16"
                style={{
                  color: "#6c757d",
                  lineHeight: 1.8,
                  maxWidth: window.innerWidth >= 992 ? "620px" : "100%",
                }}
              >
                Why pay for expenses out of a low-APY account if you don’t
                absolutely have to? With multiple ways to cover everything from
                credit card bills to aikido classes, you’ll keep earning 4.50%
                APY until your money’s out the door — without even breaking a
                sweat.
              </p>
            </div>

            {/* <div className="d-flex align-items-center flex-column justify-content-center mt-5 bg-white shadow-lg rounded-4 p-5">
              <p style={{ fontSize: "20px" }}>
                {" "}
                Money for monthly expenses:{" "}
                <span className="fw-bold fs-20">$15,000</span>
              </p>
              <h3
                className="fw-bold mb-3"
                style={{
                  color: "#202020",
                  fontSize: "2rem",
                  lineHeight: "1",
                }}
              >
                You could earn an extra{" "}
                <span className="bg-success-subtle p-2 text-success rounded-4 px-3">
                  +$322.12
                </span>{" "}
                in monthly interest.
              </h3>
              <small className="text-muted fw-medium">
                {" "}
                Calculation is an estimate and assumes 4.50% APY for 30 days and
                no withdrawals. Actual interest payments and APY can vary.{" "}
              </small>
            </div> */}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CashFeatures;
