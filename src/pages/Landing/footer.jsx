import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { logo } from "../../assets";
import { getBodySize } from "../../constants";
import { motion } from "framer-motion";
import { fadeUp } from "../../constants/variants";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="py-5 position-relative text-dark">
        <Container
          fluid
          className="px-lg-4 py-5"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div>
            <img src={logo} alt="logo light" height="30" loading="lazy" />
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.3,
            }}
          >
            <Row className="border-bottom">
              <Col lg={4} className="">
                <div>
                  <div className="mt-4 fs-13">
                    <h4 style={{ fontWeight: "bold" }}>Join the Community</h4>
                    <p className="ff-secondary fs-15">
                      We aim to give everyone access to the financial system,
                      regardless of their background or bank account balance.
                    </p>
                  </div>
                </div>
              </Col>

              <Col lg={7} className="ms-lg-auto ">
                <Row>
                  <Col sm={4} className="mt-4 ">
                    <h5 className="text-black mb-0">Need Help?</h5>
                    <div className="text-muted mt-3">
                      <ul className="list-unstyled ff-secondary d-flex flex-column gap-3 fs-15">
                        <li>
                          <Link className="text-muted" to="">
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link className="text-muted" to="">
                            F.A.Q
                          </Link>
                        </li>
                        <li>
                          <Link className="text-muted" to="">
                            Our Blog
                          </Link>
                        </li>
                        <li>
                          <Link className="text-muted" to="">
                            Term of Use
                          </Link>
                        </li>
                        <li>
                          <Link className="text-muted" to="">
                            Privacy Policy
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col sm={4} className="mt-4">
                    <h5 className="text-black mb-0">Learn More</h5>
                    <div className="text-muted mt-3">
                      <ul className="list-unstyled ff-secondary d-flex flex-column gap-3 fs-15">
                        <li>
                          <Link className="text-muted" to="">
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link className="text-muted" to="">
                            How to Invest
                          </Link>
                        </li>
                        <li>
                          <Link className="text-muted" to="">
                            Automated Investing
                          </Link>
                        </li>
                        <li>
                          <Link className="text-muted" to="">
                            Stocks
                          </Link>
                        </li>
                        <li>
                          <Link className="text-muted" to="#">
                            Crypto Investing
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col sm={4} className="mt-4">
                    <h5 className="text-black mb-0">Get in Touch</h5>
                    <div className="text-muted mt-3">
                      <address>
                        3320 Tates Creek Rd, Lexington, KY 40502, United States
                      </address>
                      <Link
                        className="text-muted"
                        to="mailto:support@itrustinvestment.com"
                      >
                        support@itrustinvestment.com
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </motion.div>

          <Row className="text-center text-sm-start align-items-center mt-5">
            <Col>
              <div>
                <p className="copy-rights mb-0 fs-15">
                  {new Date().getFullYear()} &copy; Itrust Investments. All
                  rights reserved. Itrust means Itrust Markets and web
                  experiences with its family of wholly owned subsidiaries which
                  includes Itrust investment, Itrust Securities, and Itrust
                  Crypto. All investments involve risk and loss of capital.
                  Securities trading is offered to self-directed customers by
                  Itrust Investment. Itrust Investment operates as a subsidiary
                  of Itrust Asset Management a member of the Financial Industry
                  Regulatory Authority (FINRA). With FINRA number is 164193, and
                  the SEC number is 801-115048.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
