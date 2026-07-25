import React from "react";
import { Container } from "reactstrap";
import { getBodySize } from "../../../constants";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { fadeUp } from "../../../constants/variants";
// motion
const When = () => {
  const answers = [
    "How do I build an investment strategy?",
    "What kinds of investment vehicles would work best for me?",
    "What kind of asset allocation should I choose?",
    "How should I balance my investments and protect against risk?",
    "What sectors are the most attractive right now?",
    "Am I particularly interested in investing in a specific geographic area?",
    "Am I interested in socially responsible investing?",
    "What’s my risk tolerance? If I incur losses, when I should change direction",
  ];

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
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.3,
            }}
          >
            <div className="row">
              <div className="col-12 col-lg-4">
                <h3 style={{ fontSize: "44px", fontWeight: "bolder" }}>
                  How do I build an investment strategy?
                </h3>
              </div>
              <div className="col-12 col-lg-8">
                <p className="fs-16 text-dark">
                  Just as you can’t build a house without a blueprint, you
                  should formulate a strategy before you start investing. First,
                  set aside some money to invest in your future. Begin investing
                  now and educate yourself so you can take the calculated risks
                  necessary to get a desirable return on your investment.
                </p>
                <h5 style={{ fontWeight: "bolder" }} className="fs-20">
                  How do I build an investment strategy?
                </h5>
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
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default When;
