import { motion } from "framer-motion";
import React from "react";
import { fadeUp } from "../../../constants/variants";
import { MdAdd, MdClose } from "react-icons/md";

const Settings = ({ currentQue, setCurrentQue }) => {
  const faqs = [
    {
      id: 1,
      question:
        "How do I update my information on my Itrust Investment account?",
      answer: `How to update personal information

      You can edit your details in the top right corner of your dashboard and selecting “Settings.” Then click on “Profile” from the menu on the left and you can request the change under “Personal Information.”
      
      How do I change my address?
      
      You can change your address on our full website by clicking on your name at the top of your dashboard and selecting "Settings". Click on "Profile" from the menu on the left and you can update your address under "Contact Information".
      
      Keep in mind that all of our documents (statements, tax forms, etc.) are delivered electronically.`,
    },
    {
      id: 2,
      question: "I forgot my password, how do I recover my account?",
      answer: `You can reset your password with the email you used in registration, click on forget password when you try to sign in to you account and follow the prompt on your email to create a new password for your account.`,
    },
    {
      id: 3,
      question: "How does Itrust Investment secure my account information?",
      answer: `To connect your account, we partner with third-party providers to establish and maintain secure, read-only links on your behalf. These providers specialize in tracking financial data; they employ robust, bank-grade security and follow data protection best practices. Itrust Investment does not store your account password.

      We use this data to provide you with financial advice, including recommendations on how to best manage your cash and investments. We will not share your data with anyone.`,
    },
    {
      id: 4,
      question: "How are my funds protected at Itrust Investment?",
      answer: `We are committed to protecting your money and privacy with the highest standards of insurance and security available. We maximise the protection of your assets by doing the following:

      We protect your cash with FDIC insurance through our partner banks.
      
      Your cash is insured by the Federal Deposit Insurance Corporation (FDIC). This coverage protects your cash in the event that a bank goes out of business. Itrust Investment uses multiple partner banks to ensure FDIC coverage of up to $8 million for your cash deposits. FDIC insurance coverage is limited to $250,000 per qualified customer account per banking institution
      
      FDIC insurance is not provided until the funds arrive at the Program Banks. While funds are at Itrust Investment Brokerage, and before they are swept to the Program Banks, they are subject to SIPC’s protection limit of $250,000 for cash.
      
      We protect your investments with SIPC insurance.
      
      Your investments are insured by the Securities Investor Protection Corporation (SIPC). This protects assets up to $500,000 (including $250,000 in claims for cash). As with all securities firms, this coverage provides protection against the failure of a broker-dealer, not against a decline in the market value of your securities.
      
      We work around the clock to protect your data.
      
      Our internal security team evaluates risks across our company and platform, and our external security firms test our security controls to ensure we’re following the industry’s best practices.
      
      Finally, a third party audits our policies, procedures, and processes on an annual basis. `,
    },
    {
      id: 5,
      question: "What is SIPC Insurance?",
      answer: `Your investment account(s) is insured by the Securities Investor Protection Corporation (SIPC)

      ● An individual account with $450,000 in securities and $10,000 in cash. SIPC insurance fully covers both the value of the securities, as well as all of the cash.
      
      ● Two accounts in the same name, each with $50,000 in securities and $200,000 in cash. The total value of securities is $100,000 and the total value of cash is $400,000. SIPC insurance covers the entire equity balance of both accounts of $100,000, but only $250,000 of the cash balance. $150,000 in cash would not be covered by SIPC in this scenario.
      
      Please visit sipc.org for more information.`,
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

export default Settings;
