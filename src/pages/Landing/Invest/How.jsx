import React from "react";
import { Container } from "reactstrap";
import { getBodySize } from "../../../constants";
import { fadeUp } from "../../../constants/variants";
import { motion } from "framer-motion";

const How = () => {
  return (
    <React.Fragment>
      <section className="section">
        <Container
          fluid
          className="px-lg-4 "
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="bg-white">
            <div className="d-flex align-items-center justify-content-center flex-column mb-5">
              <h3
                style={{
                  fontWeight: "bolder",
                  fontSize: "30px",
                  maxWidth: window.innerWidth > 562 ? "560px" : "100%",
                }}
                className="text-center"
              >
                The building blocks of your financial journey
              </h3>
              <p style={{ fontSize: "25px" }} className="text-dark ">
                What you need to know about investing from thget-go.
              </p>
            </div>

            <div className="row">
              <div className="col-12 col-lg-4">
                <h3 style={{ fontSize: "44px", fontWeight: "bolder" }}>
                  When should I start investing?
                </h3>
              </div>
              <div className="col-12 col-lg-8 fs-16 text-dark">
                <p>
                  If you invest now, you’ll have a better chance to realizing a
                  return on your investment. According to the Social Security
                  Administration, Social Security benefits will only cover about
                  33% of the cost of the average American’s retirement. The rest
                  will have to be filled in by personal savings and return on
                  investments.{" "}
                </p>
                <p>
                  There’s more to invest for than retirement. Investing can also
                  help you buy a home, travel, start a dream project or even pay
                  your bills in the future. If you invest in the stock market,
                  you’ll have a better chance of watching your investment grow
                  over the long term. And if you invest in bonds, you can
                  benefit from a steady stream of income. Investing is a
                  long-term venture. Short-term profits are elusive – and often
                  illusory. The longer investment horizon you’re willing to
                  cultivate, the better chance you will have to realize extended
                  annualized returns on your investments.{" "}
                </p>
                p If you invest now, you’ll have a better chance to realizing a
                return on your investment. According to the Social Security
                Administration, Social Security benefits will only cover about
                33% of the cost of the average American’s retirement. The rest
                will have to be filled in by personal savings and return on
                investments. There’s more to invest for than retirement.
                Investing can also help you buy a home, travel, start a dream
                project or even pay your bills in the future. If you invest in
                the stock market, you’ll have a better chance of watching your
                investment grow over the long term. And if you invest in bonds,
                you can benefit from a steady stream of income. Investing is a
                long-term venture. Short-term profits are elusive – and often
                illusory. The longer investment horizon you’re willing to
                cultivate, the better chance you will have to realize extended
                annualized returns on your investments. When you’re at different
                stages of your life, you will likely have different investment
                goals. When you’re young and have most of your earnings years
                ahead, you may want to build up capital to safeguard your
                future. Later, if you get married and have children, you may
                prioritize supporting your family as well as planning for your
                children’s college educations. As you get older, you’ll likely
                focus on financing your retirement. When mapping out your
                investment plans, consider which primary goals you want to focus
                on at your current age
              </div>
            </div>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default How;
