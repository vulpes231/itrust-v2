import React from "react";
import { getBodySize } from "../../../constants";
import { Container } from "reactstrap";
import { about } from "../../../assets";

const Safety = () => {
  return (
    <React.Fragment>
      <div
        className="bg-secondary position-relative"
        style={{
          background: "linear-gradient(to bottom, #2f176f 0%, #5126BE 100%)",
        }}
      >
        <img
          src="https://itrustinvestment.com/_nuxt/tiktik.0ZPUXRl6.svg"
          alt=""
          style={{ position: "absolute", top: "220px", left: 0 }}
        />
        <img
          src="https://itrustinvestment.com/_nuxt/tiktik.0ZPUXRl6.svg"
          alt=""
          // className="position-absolute top-0 right-0"
          style={{ position: "absolute", top: 0, right: 0 }}
        />
        <img
          src="https://itrustinvestment.com/_nuxt/tiktik.0ZPUXRl6.svg"
          alt=""
          className="d-none d-lg-flex"
          style={{ position: "absolute", top: "500px", right: "40%" }}
        />
        <Container
          fluid
          className="px-lg-4 py-5"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="row">
            <div className="col-12 col-lg-6">
              <img
                src={about}
                alt=""
                loading="lazy"
                className="img-fluid"
                style={{ maxWidth: window.innerWidth > 562 ? "390px" : "100%" }}
              />
            </div>
            <div className="col-12 col-lg-6 text-white">
              <p className="text-uppercase fw-bold">– Safety First</p>
              <h3
                className="fw-bold mb-3"
                style={{
                  color: "white",
                  fontSize: "32px",
                  maxWidth: window.innerWidth > 562 ? "450px" : "100%",
                }}
              >
                Itrust is a safety-first company
              </h3>
              <p className="fs-16">
                The reliability of our platform takes precedence over all else,
                so that we can be there for our customers when they need us the
                most. We relentlessly protect our customers’ security and
                privacy, and we only share with our counter parties what they
                need to fulfil our customers’
              </p>
              <p className="fs-16">
                financial needs, nothing more. We build safeguards and provide
                education so that our customers are in the best position to
                succeed. We have high quality timely customer support, and when
                things aren’t right, wefix them. We work closely with regulators
                and lawmakers to protect our customers and the broader financial
                system.
              </p>
              <p className="fs-16">
                We speak simply, plainly, and truthfully, even if it’s not what
                others want to hear. We hold ourselves and our colleagues to the
                highest ethical standards.
              </p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 col-lg-6">
              <img
                src={about}
                alt=""
                loading="lazy"
                className="img-fluid"
                style={{ maxWidth: window.innerWidth > 562 ? "390px" : "100%" }}
              />
            </div>
            <div className="col-12 col-lg-6 text-white">
              <p className="text-uppercase fw-bold">– Participation is Power</p>
              <h3
                className="fw-bold mb-3"
                style={{
                  color: "white",
                  fontSize: "32px",
                  maxWidth: window.innerWidth > 562 ? "450px" : "100%",
                }}
              >
                At Itrust, the rich don’t get a better deal
              </h3>
              <p
                className="fs-16"
                // style={{ maxWidth: window.innerWidth > 562 ? "450px" : "100%" }}
              >
                We founded Itrust in the wake of the financial crisis because we
                identified a gap - the more you had, the better deal you g
              </p>
              <p className="fs-16">
                We aim to give everyone access to the financial system,
                regardless of their background or bank account balance. That’s
                why we have uniform interest rates, no account minimums, and a
                product that was designed from the ground up for small accounts.
              </p>
              <p
                className="fs-16"
                // style={{ maxWidth: window.innerWidth > 562 ? "450px" : "100%" }}
              >
                We would rather serve many small customers over a few large
                ones. We reflect the world around us, and we elevate and embrace
                all voices so everyone feels at home at Itrust.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Safety;
