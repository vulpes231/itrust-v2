import { motion } from "framer-motion";
import React from "react";
import { fadeUp } from "../../../constants/variants";
import { MdAdd, MdClose } from "react-icons/md";

const Cash = ({ currentQue, setCurrentQue }) => {
  const faqs = [
    {
      id: 1,
      question: "What is the Itrust Cash Account?",
      answer: `We offer Individual Cash Accounts for managing all your cash.

      Our Individual Cash Account combines checking and savings features in one account. You can deposit your pay check, pay bills, and earn interest on your entire balance. You can open this account in just a couple minutes.`,
    },
    {
      id: 2,
      question: "How do I transfer funds to and from Itrust Investment?",
      answer: `How to deposit

      To transfer funds between Itrust Investment and your bank or crypto wallet, log in and select “Cash” on your dashboard. To transfer funds into Itrust Investment, select “Deposit”. To transfer funds out, select “Withdraw”.
      
      Transfer minimums
      
      For Itrust investment accounts, each deposit can be a minimum of $1000 and each withdrawal a minimum of $250. For Itrust cash accounts, you can deposit and withdraw a minimum of $1. Transfer minimum and maximums may vary by transfer type
      
      Expected arrival times
      
      Bank deposits and withdrawals typically take 1–2 business days from cash accounts. You’ll receive an email confirmation when you request the transfer.
      
      Crypto transfers typically take less than 1 hour but might delay up to 24 hours due to blockchain network congestion.
      
      For security purposes, withdrawals may be delayed a few days if you recently made a deposit or are withdrawing to a different bank account than the one used for initial funding.`,
    },
    {
      id: 3,
      question: "How do I fund my account?",
      answer: `We currently offer two funding methods
      Bank Deposit: To obtain the instructions, please log into your dashboard and click Cash => Deposit => Bank Deposit and Use Same-day wire to the details provided.
      
      After completing payment, input amount and click on “I have made payment” to automatically process your deposit.
      
      Crypto Deposits: To get your crypto deposit address, please log into your dashboard and click Cash => Deposit => Select Crypto Deposit.
      
      We currently accept Bitcoin, Ethereum and USDT(ERC20 and TRC20) deposits.
      
      Select the coin you want to deposit and your address will be generated with instructions to make payment. After completing payment, input amount and click on “I have made payment” to automatically process your deposit. We do not charge any fees for deposits`,
    },
    {
      id: 4,
      question: "Is 4.25% APY a promotional rate? Will it change on me?",
      answer: `Short answer: No, it’s not a promotional rate. And yes, it is subject to change.

      Long answer: The APY you see on this page is the rate our own employees receive. We’ll always notify you when the Cash Account rate changes — which generally happens in response to a change in the Federal Funds Rate, or when there’s a significant change in the rates our partner banks pay us to hold our clients’ deposits`,
    },
    {
      id: 5,
      question: "When do I collect that sweet, sweet interest?",
      answer: `Your interest accrues daily based on your current balance, and pays out near the beginning of each month.`,
    },
    {
      id: 6,
      question: "But what if I want to withdraw my money?",
      answer: `It’s your money, so you can withdraw it whenever you want, with no fees. If your external account is in the RTP® Network or is a FedNow® Service Participant, it’s eligible for free same-day transfers when you request as late as 6pm PT / 9pm ET every day, even on weekends and holidays!

      For other accounts, withdrawals usually take only one business day to arrive — although if it’s from a recent deposit, it may take a few extra days to process.
      
      Crypto Withdrawals take less than an hour and up to 24 hours depending on network congestion.`,
    },
    {
      id: 7,
      question: "How hard is it to transfer from savings to investing?",
      answer: `So not hard at all! Money can usually be transferred to your Cash Account in minutes, and can also be invested in minutes when the market’s open.`,
    },
    {
      id: 8,
      question: "Is my money safe with Itrust Investment?",
      answer: `Exceptionally safe. Your money gets up to $8 million in FDIC insurance (or $16 million for joint accounts). This is possible because we aren’t a bank — we sweep your deposits to up 32 partner banks (each with its own federally-insured $250,000 limit) at any given time. As a result, you get

      32x the FDIC insurance in a Itrust Cash Account than you’d get with a regular bank account.Beyond the federal backstop provided by the FDIC, we keep your money secure by complying with the rules of our federal regulators, protecting your data with robust security practices , and conducting annual third-party accounting audits. `,
    },
    {
      id: 9,
      question: "How many fees are there?",
      answer: `None! Zilch! Nada! We’ve never charged any account fees for the Cash Account, and we never will.`,
    },
  ];
  return (
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
                <span>{currentQue === que.id ? <MdClose /> : <MdAdd />}</span>
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
  );
};

export default Cash;
