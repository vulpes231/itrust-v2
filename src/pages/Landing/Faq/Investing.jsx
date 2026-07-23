import { motion } from "framer-motion";
import React from "react";
import { fadeUp } from "../../../constants/variants";
import { MdAdd, MdClose } from "react-icons/md";

const Investing = ({ currentQue, setCurrentQue }) => {
  const faqs = [
    {
      id: 1,
      question: "I’ve opened my account, when can I start investing?",
      answer: `You can make an investment in your Stock Investing Account using the funds in your Itrust Investment Cash Account.

          Once you’ve selected the stocks or crypto you want to include in your Stock Investing Account, you can schedule an investment by tapping Buy or Sell on your account dashboard`,
    },
    {
      id: 2,
      question: "Requirements to open and invest in a Stock Investing Account",
      answer: `You will need a Itrust Cash Account to invest in a Stock Investing Account. You can invest with as little as $1. In order to ensure our clients invest aligned with their risk profile, we require that you hold a minimum of three stocks in a portfolio to invest.`,
    },
    {
      id: 3,
      question:
        "Why do I need a Cash Account to open a Stock Investing Account?",
      answer: `In order to use Itrust Stock Investing Account, you must also have a Cash Account. The funds in your Cash Account will be used to purchase securities in your Stock Investing Account, and when you sell securities, the proceeds can be transferred to your Cash Account.

          It is standard for brokerage firms to give clients a place to store their cash that they are preparing to invest. At Itrust Investment, the Cash Account serves this purpose. Your Cash Account comes with a high APY and FDIC insurance through partner banks.`,
    },
    {
      id: 4,
      question: "How do I add a stock to my Stock Investing Account?",
      answer: `To add a stock, head to Markets, where you can search and browse all of the investment options available on Itrust Investment. When you find one that you’re interested in, tap Buy or Sell to start trading. You’ll be prompted to add that stock into one of your portfolios.

          Alternatively, you can go to Trade on your dashboard and enter amount and select a stock to buy or sell.`,
    },
    {
      id: 5,
      question:
        "When and how often can I buy or sell investments in my Stock Investing Account?",
      answer: `You can make a request to buy investments as frequently as you like. However, you can only make one sale request at a time.If a given action (such as a request to sell investments) will result in being flagged for pattern day trading, you will not be able to take that action until sufficient time has passed to avoid having your account locked.If you are prevented from selling out of your whole portfolio due to pattern day trading restrictions, you may need to comply to the day trading rule to lift the restrictions.`,
    },
    {
      id: 6,
      question: "Do I own the shares I buy through Itrust Investment?",
      answer: `You own the shares you buy through Itrust as soon as your order is executed.`,
    },
    {
      id: 7,
      question: "What is an ETF?",
      answer: `An exchange-traded fund (ETF) is an investment fund that is traded on stock exchanges throughout the trading day, much like stocks and unlike mutual funds. An ETF holds assets such as stocks, commodities, or bonds, and trades close to its net asset value over the course of the trading day. Most ETFs track an index, such as the S&P 500 or MSCI EAFE. Itrust Investment evaluates thousands of ETFs for attractive investments based on their low cost, tax efficiency, and stock-like features.`,
    },
    {
      id: 8,
      question: "How much can I transfer?",
      answer: `For Automated Investing Accounts, you can transfer a minimum of $250 as long as you maintain a minimum balance of $5000 in your account.

      For Stock Investing Accounts, you can withdraw a minimum of $250 per security from your account to your Cash Account.
      
      At this time we only support a single transfer request per day.`,
    },
    {
      id: 9,
      question: "How do I close my Automated Investing Account?",
      answer: `There are two ways to withdraw funds and close your Automated Investing Account: you can liquidate the account and transfer the cash to your linked external bank account or to a Cash Account, or you can transfer out to another institution.

      To Cash Account
      
      To liquidate your account, log in and click the “Cash” button at the top of the dashboard, select to “Transfer”, then input entire amount to “Withdraw the entire account balance”. Please note that liquidating your account may incur taxes.
      
      Once you request a full withdrawal we'll automatically close your account. You'll still be able to log in after your account is closed to access your tax documents and statements.If it's an IRA account, 529 Account, or a Stock Investing Account please contact us after your withdrawal has been completed and your account balance is $0.
      
      To Another Institution
      
      To transfer your entire account to another brokerage firm, you'll need to initiate the transfer with the firm you’re transferring to.`,
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

export default Investing;
