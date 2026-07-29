import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { fund, gift, reg } from "../../../assets";
import { getBodySize, getSize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp } from "../../../constants/variants";
import { MdAdd, MdClose } from "react-icons/md";

// motion

const Frequents = () => {
  const [currentQue, setCurrentQue] = useState("");
  const faqs = [
    {
      id: 1,
      question: "Is 4.25% APY a promotional rate? Will it change on me?",
      answer: `Short answer: No, it’s not a promotional rate. And yes, it is subject to change.

      Long answer: The APY you see on this page is the rate our own employees receive. We’ll always notify you when the Cash Account rate changes — which generally happens in response to a change in the Federal Funds Rate, or when there’s a significant change in the rates our partner banks pay us to hold our clients’ deposits.`,
    },
    {
      id: 2,
      question: "When do I collect that sweet, sweet interest?",
      answer: `Your interest accrues daily based on your current balance, and pays out near the beginning of each month.`,
    },
    {
      id: 3,
      question: "But what if I want to withdraw my money?",
      answer: `It’s your money, so you can withdraw it whenever you want, with no fees. If your external account is in the RTP® Network or is a FedNow® Service Participant, it’s eligible for free same-day transfers when you request as late as 6pm PT / 9pm ET every day, even on weekends and holidays!

      For other accounts, withdrawals usually take only one business day to arrive — although if it’s from a recent deposit, it may take a few extra days to process.
      
      Crypto Withdrawals take less than an hour and up to 24 hours depending on network congestion.`,
    },
    {
      id: 4,
      question: "How hard is it to transfer from savings to investing?",
      answer: `So not hard at all! Money can usually be transferred to your Cash Account in minutes, and can also be invested in minutes when the market’s open.`,
    },
    {
      id: 5,
      question: "Is my money safe with Itrust Investment?",
      answer: `Exceptionally safe. Your money gets up to $8 million in FDIC insurance (or $16 million for joint accounts). This is possible because we aren’t a bank — we sweep your deposits to up 32 partner banks (each with its own federally-insured $250,000 limit) at any given time. As a result, you get

      32x the FDIC insurance in a Itrust Cash Account than you’d get with a regular bank account.Beyond the federal backstop provided by the FDIC, we keep your money secure by complying with the rules of our federal regulators, protecting your data with robust security practices , and conducting annual third-party accounting audits. `,
    },
    {
      id: 6,
      question: "How many fees are there?",
      answer: `None! Zilch! Nada! We’ve never charged any account fees for the Cash Account, and we never will.`,
    },
  ];
  return (
    <React.Fragment>
      <section
        className="section bg-secondary-subtle mt-5 "
        style={{
          background: "linear-gradient(to bottom, #2f176f 0%, #5126BE 100%)",
        }}
        id="plans"
      >
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
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
          <div className="row ">
            <div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.3,
              }}
              className="col-12 col-lg-4"
            >
              <div className="mb-5">
                <h3
                  className="fw-bolder mb-3 mt-4 lg-mt-0 text-white"
                  style={{
                    color: "#202020",
                    fontSize: "44px",
                  }}
                >
                  Don’t save your questions.
                </h3>
                <span
                  className="fw-light text-white"
                  style={{
                    color: "#202020",
                    fontSize: "44px",
                  }}
                >
                  We’ve got answers.
                </span>
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
                        <span className="text-secondary">
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

export default Frequents;
