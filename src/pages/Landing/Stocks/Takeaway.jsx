import React from "react";
import { Container } from "reactstrap";
import { getSize } from "../../../constants";

const Takeaway = () => {
  return (
    <React.Fragment>
      <div className="mt-5">
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div>
            <p
              className="pt-4"
              style={{
                color: "#202020",
                fontSize: "44px",
                lineHeight: 1,
                fontStyle: "italic",
                paddingTop: "80px",
                //   maxWidth: window.innerWidth > 562 ? "00px" : "100%",
              }}
            >
              Not sold on individual stocks?
            </p>
            <hr className="mt-4" />
          </div>
          <div className="row g-4 mt-4">
            <div className="col-12 col-lg-6">
              <h3
                className="fw-bold mb-3"
                style={{
                  color: "#202020",
                  fontSize: "41px",
                  lineHeight: 1,
                  maxWidth: window.innerWidth > 562 ? "560px" : "100%",
                }}
              >
                Diversify your portfolio with the Automated Investing
                Account.{" "}
              </h3>
              <p
                className="mb-0 mt-3 fs-16"
                style={{
                  color: "#6c757d",
                  lineHeight: 1.5,
                  //   maxWidth: window.innerWidth > 562 ? "370px" : "100%",
                }}
              >
                Grow your long-term wealth with a portfolio of diversified,
                low-cost index funds. We’ll handle all the investment decisions,
                rebalancing, and other busy work for the low, annual fee of just
                0.25%. And that’s almost nothing considering our automated
                Tax-Loss Harvesting covered our fee more than 6x over, on
                average
              </p>
            </div>
            <div className="col-12 col-lg-6">
              <h3
                className="fw-bold mb-3"
                style={{
                  color: "#202020",
                  fontSize: "41px",
                  lineHeight: 1,
                  maxWidth: window.innerWidth > 562 ? "560px" : "100%",
                }}
              >
                Earn 4.50% APY with the Cash Account.
              </h3>
              <p
                className="mb-0 mt-3 fs-16"
                style={{
                  color: "#6c757d",
                  lineHeight: 1.5,
                  //   maxWidth: window.innerWidth > 562 ? "370px" : "100%",
                }}
              >
                Pay bills, save money, or invest in minutes during market hours.
                Our technology lets you automate your paycheck and organize cash
                effortlessly, while earning 9x the average national interest
                rate.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Takeaway;
