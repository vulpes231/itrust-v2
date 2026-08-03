import React from "react";
import { Container } from "reactstrap";
import { getBodySize } from "../../../constants";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { fadeUp } from "../../../constants/variants";

// motion

const Commission = () => {
  const answers = [
    "Stocks are shares in the ownership of a company. Also known as equities, they’re heavily regulated by the government and most can be bought and sold on stock exchanges.",
    "Cryptos are digital currencies that can be exchanged online for goods and services. Many companies have issued their own currencies, often called tokens, and these can be traded specifically for the good or service that the company provides. Think of them as you would arcade tokens or casino chips. You’ll need to exchange real currency for the cryptocurrency to access the good or service.",
    "Cryptocurrencies work using a technology called blockchain. Blockchain is a decentralized technology spread across many computers that manages and records transactions. Part of the appeal of this technology is its security. ",
    "Bonds are based on debt, and they’re created when an investor loans money to a company or governmental entity to finance projects and operations. They’re known as fixed income instruments because typically they pay out a regular (fixed) amount (income) to investors.",
    "Mutual funds are investment funds that take money from many investors and put it into stocks, bonds, money-market funds or other securities or assets. When you buy a mutual fund share, you own a piece of the fund’s investment portfolio. ",
    "Exchange traded funds (ETFs), like mutual funds, are invested in stocks, bonds, money-market funds or other securities or assets, but investors don’t own direct shares of these funds. Only authorized participants (financial institutions who double as broker-dealers) own direct shares of these investment funds. But these authorized participants in turn offer shares to investors that can be bought on a stock exchange. To learn about the net asset and issuance flows of mutual funds and ETFs, visit the Investment Company Institute. ",
    "Popular investment options today include stocks, crypto, gold, bonds and ETFs, which are all registered with the U.S. Securities and Exchange ",
    ,
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
            <div className="row p-2 p-lg-0">
              <div className="col-12 col-lg-4">
                <h3
                  style={{
                    color: "#202020",
                    fontSize: window.innerWidth >= 562 ? "36px" : "22px",
                    maxWidth: window.innerWidth >= 562 ? "520px" : "100%",
                    fontWeight: 900,
                  }}
                >
                  How do I build an investment strategy?
                </h3>
              </div>
              <div className="col-12 col-lg-8">
                <p className="fs-16 text-dark">
                  Popular investment options today include stocks, crypto, gold,
                  bonds and ETFs, which are all registered with the U.S.
                  Securities and Exchange
                </p>
                <h5 style={{ fontWeight: "bolder" }} className="fs-20">
                  Commission (SEC)
                </h5>
                <div className="d-flex flex-column gap-3">
                  {answers.map((an, index) => {
                    return (
                      <span
                        key={index}
                        className="d-flex align-items-start gap-2"
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
                <div className="mt-5">
                  <p className="fs-16 text-dark">
                    Popular investment options today include stocks, crypto,
                    gold, bonds and ETFs, which are all registered with the U.S.
                    Securities and Exchange
                  </p>
                  <h5 style={{ fontWeight: "bolder" }} className="fs-20">
                    Commission (SEC)
                  </h5>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Commission;
