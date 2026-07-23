import { motion } from "framer-motion";
import React from "react";
import { fadeUp } from "../../../constants/variants";
import { MdAdd, MdClose } from "react-icons/md";

const General = ({ currentQue, setCurrentQue }) => {
  const faqs = [
    {
      id: 1,
      question: "Who may open an account on Itrust Investment?",
      answer: `Any individual 18 years old or older, residing in and outside of the U.S., including U.S. citizens residing abroad for regulatory reasons.. We also require clients to have a phone number that can accept SMS for security verification purposes.`,
    },
    {
      id: 2,
      question:
        "What types of accounts does Itrust Investment currently support?",
      answer: `Itrust Investment supports individual high interest cash accounts, automated investing accounts, taxable brokerage account and other retirement savings accounts:`,
    },
    {
      id: 3,
      question: "Account minimums to invest with Itrust Investment",
      answer: `Stock Investing Accounts

      The minimum investment you can schedule in a Stock Investing Account is $1. The Stock Investing Account does not have rebalancing or Tax-Loss Harvesting services.
      
      Automated Investing Accounts
      
      You’ll need to deposit at least $5000 to open an Automated Investing Account. You’ll get a periodically rebalanced, diversified portfolio of low-cost index funds enhanced with our Tax-Loss Harvesting service. As of November 2024, your portfolio will also be optimised to your estimated tax level (for taxable accounts).
      
      Account minimums for Itrust Investment exclusives (US Direct Indexing and Smart Beta) To invest in US Direct Indexing you’ll need to deposit at least $100,000 in your account. Should your account with US Direct Indexing approach $500,000, you will automatically receive Smart Beta.
      
      A Classic recommended portfolio won’t automatically contain US Direct Indexing when your balance reaches the minimum. To learn more about adding US Direct Indexing to your account, contact support.`,
    },
    {
      id: 4,
      question: "Where is my money held?",
      answer: `Your assets are held in a brokerage account in your name at Itrust Investment LLC, a subsidiary as a subsidiary of Itrust Asset Management a member of the Financial Industry Regulatory Authority (FINRA). With FINRA number is 164193, and the SEC number is 801-115048. Please note that Itrust Investment LLC has partnered with RBC Clearing & Custody (RBC CC) for many clearing functions such as trade settlement. We use Forge Trust as the custodian for all IRA accounts`,
    },
    {
      id: 5,
      question: "How much should I invest on Itrust Investment?",
      answer: `We believe you should set aside a “rainy day fund” in cash to cover at least six months of expenses to handle any unforeseen emergencies that might arise in your life and if you are fortunate enough, a discretionary fund to invest in opportunities in which you have high conviction like a particular stock or angel investment. The rest of your money should be invested for the long term in a responsible, diversified strategy of the type offered by Itrust Investment . However, we understand if you want to start with less.`,
    },
    {
      id: 6,
      question:
        "How does Itrust Investment trade my Automated Investing Account?",
      answer: `Itrust Investment places trades in your Automated Investing. Account when we invest a deposit, sell securities to satisfy a withdrawal, rebalance your portfolio, harvest tax losses, and more. When these trades are placed, we route them through one of our Executing brokers and signal providers. These brokers comply with FINRAs best execution practices`,
    },
    {
      id: 7,
      question: "How do I contact customer support?",
      answer: `You can contact our support team from the live chat on the website. We’re available 24/7 by email for all inquiries.

        For timely concerns, including account security, bank transfer issues, equities trading, restrictions, and options, you can also request phone support in the app from 8 AM to 8 PM ET, Monday through Friday. We offer 24-hour coverage on trading days for options.
        
        Please note that we’re unable to service customers at our office locations and we don’t have an inbound number for phone support.`,
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

export default General;
