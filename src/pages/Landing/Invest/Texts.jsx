import React from "react";
import { Container } from "reactstrap";
import { getBodySize } from "../../../constants";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { fadeUp } from "../../../constants/variants";

const Texts = () => {
  const answers = [
    "Select the appropriate application to open your Itrust account, such as opening an investment account. If you don’t see the form or application you need, please contact us.",
    "Complete your application, review it with your financial professional, Make a deposit using a preferred deposit method by your financial professional",
  ];

  const texts = [
    "Have I weighed my available options? Have I considered the full range of investment solutions?",
    "Do I understand both the risks and rewards associated with a particular investment?",
    "What’s my risk tolerance? How much am I willing to lose?",
    "Have I read the prospectuses of the products I’m interested in investing in, so I understand all of the ins and outs?",
    "Have I discussed any ideas or concerns I have about investing or about a certain product with an investment professional? Did I take notes during the meeting for future reference? ",
  ];
  //   motion

  return (
    <React.Fragment>
      <section>
        <Container
          fluid
          className="px-lg-4 py-5"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className="row mb-5"
            >
              <div className="col-12 col-lg-4">
                <h3 style={{ fontSize: "40px", fontWeight: "bolder" }}>
                  How much do I need to start investing?
                </h3>
              </div>
              <div className="col-12 col-lg-8">
                <p className="fs-16 text-dark">
                  You can invest in stocks, crypto, options and ETF’s for less
                  than $100, while mutual funds often ask you to invest at least
                  $1,000. A share of stock can range in price from a few dollars
                  to several thousand dollars. Mote thats you’ll need a minimum
                  of $25,000 for day trading. Mutual funds and ETFs can be wise
                  long-term investments; since they both invest in many
                  companies, risk is spread out and you’re exposed to a wider
                  range of asset allocation.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className="row mb-5"
            >
              <div className="col-12 col-lg-4">
                <h3 style={{ fontSize: "40px", fontWeight: "bolder" }}>
                  How to invest with Itrust Investment
                </h3>
              </div>
              <div className="col-12 col-lg-8">
                <p className="fs-16 text-dark">
                  At Itrust Investment, we partner with financial professionals
                  across the World to ensure they have the proper tools and
                  materials to assist you in building a financial plan and
                  investment portfolio suited to your goals. We strongly
                  encourage you to work with a financial professional. Contact
                  our support to get connected to a legal financial advisor
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className="row mb-5"
            >
              <div className="col-12 col-lg-4">
                <h3 style={{ fontSize: "40px", fontWeight: "bolder" }}>
                  How to open an Itrust Investment account
                </h3>
              </div>
              <div className="col-12 col-lg-8">
                <div className="d-flex flex-column gap-3">
                  {answers.map((an, index) => {
                    return (
                      <span
                        key={index}
                        className="d-flex align-items-center gap-2"
                      >
                        <span
                          style={{ width: "20px", height: "20px" }}
                          className="p-1 bg-secondary-subtle rounded-circle text-secondary justify-content-center align-items-center d-flex"
                        >
                          <FaArrowRight size={10} />
                        </span>
                        <span className="text-dark fs-16"> {an}</span>
                      </span>
                    );
                  })}
                </div>
                <p className="fs-16 text-dark">
                  Your account will be set up automatically, verify your account
                  by submitting ID and make a deposit to your cash account to
                  start investing with us.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className="row mb-5"
            >
              <div className="col-12 col-lg-4">
                <h3 style={{ fontSize: "40px", fontWeight: "bolder" }}>
                  How to open an Itrust Investment account
                </h3>
              </div>
              <div className="col-12 col-lg-8">
                <p className="fs-16 text-dark">
                  When you’re considering your options for investing with Itrust
                  Investment, either through a financial professional or direct
                  access, it’s important to consider the benefits associated
                  with each option. Review this investing checklist before you
                  make your final decision:
                </p>
                <div className="d-flex flex-column gap-3">
                  {texts.map((an, index) => {
                    return (
                      <span
                        key={index}
                        className="d-flex align-items-center gap-2"
                      >
                        <span
                          style={{ width: "20px", height: "20px" }}
                          className="p-1 bg-secondary-subtle rounded-circle text-secondary justify-content-center align-items-center d-flex"
                        >
                          <FaArrowRight size={10} />
                        </span>
                        <span className="text-dark fs-16"> {an}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Texts;
