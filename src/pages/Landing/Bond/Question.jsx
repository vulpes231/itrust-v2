import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { fund, gift, reg } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp } from "../../../constants/variants";
import { MdAdd, MdClose } from "react-icons/md";

// motion

const Question = () => {
  const [currentQue, setCurrentQue] = useState("");
  const faqs = [
    {
      id: 1,
      question: "What exactly is a bond ladder?",
      answer: `We’re glad you asked! (And everyone does.) A bond ladder is a portfolio of bonds with varying maturities, designed to minimize your exposure to interest rate fluctuations — in any rate environment. Bond ladders include monthly “rungs,” like steps in the ladder. Each rung represents one or more bonds that mature over time at certain intervals. As those bonds, or rungs, mature, you’ll get your principal back, which can then be reinvested into existing or new rungs.

      Thus, a bond ladder can offer predictable cash flow through interest payments and maturing principal, with reduced interest rate risk compared to buying one individual bond. In other words, it can be a great way to earn a steady yield — and preserve your principal — over a long period of time`,
    },
    {
      id: 2,
      question: "So, how does your Automated Bond Ladder work?",
      answer: `We’ll keep it simple: The Automated Bond Ladder is composed entirely of US Treasuries (a mix of bills and notes), which offer principal protection as long as the Treasuries are held to maturity. Our Automated Bond Ladder can help you take home a higher yield than holding funds in cash, while safeguarding your principal. We’ll compare hundreds of Treasuries to prioritize high coupon payments and liquidity, and keep your ladder balanced as they mature`,
    },
    {
      id: 3,
      question: "No state income taxes? For Treasuries? Really!?",
      answer: `Really, really. The interest you earn from Treasuries is exempt from state and local income taxes. That means, if you live in a state with state income taxes, you can keep more of the interest you earn. Looking at you, California.`,
    },
    {
      id: 4,
      question:
        "How is the Automated Bond Ladder different from the Automated Bond Portfolio?",
      answer: `No. Unlike a CD, you can easily withdraw your money at any time. However, in order to earn the full yield from your bond ladder, you’ll need to hold it to maturity. If you sell a Treasury before it reaches maturity, you could lose some of your principal.`,
    },
    {
      id: 5,
      question: "How do I know if this product is right for me?",
      answer: `The Automated Bond Ladder is designed for investors who want to earn a steady yield with very little risk. A ladder can be a great way to save for important expenses down the road, like a down payment, a child’s tuition or a soonish retirement. If you’re OK with more risk for potentially higher returns, then the Automated Bond Portfolio might be a better fit.`,
    },
  ];
  return (
    <React.Fragment>
      <section className="section bg-secondary-subtle mt-5 " id="plans">
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="row ">
            <div className="col-12 col-lg-4">
              <div className="mb-5">
                <h3 className="mb-3 fw-bold">
                  A good investment starts with asking good questions.
                </h3>
              </div>
            </div>
            <div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className="col-12 col-lg-8"
            >
              <div className="d-flex flex-column gap-3">
                {faqs.map((que) => {
                  return (
                    <motion.div
                      key={que.id}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{
                        once: false,
                        amount: 0.3,
                      }}
                      className="d-flex flex-column bg-white  p-3 rounded-4 text-dark"
                    >
                      <div
                        onClick={() => {
                          if (currentQue === que.id) {
                            setCurrentQue("");
                          } else {
                            setCurrentQue(que.id);
                          }
                        }}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <span>{que.id}.</span>
                          <span className="fs-16">{que.question}</span>
                        </div>
                        <span>
                          {currentQue === que.id ? <MdClose /> : <MdAdd />}
                        </span>
                      </div>
                      {currentQue === que.id && (
                        <p className="fs-14 text-muted fw-light px-4 mt-3">
                          {que.answer}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Question;
