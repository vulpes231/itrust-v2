import React from "react";
import { Container } from "reactstrap";
import { getBodySize } from "../../../constants";
import { motion } from "framer-motion";
import { fadeUp } from "../../../constants/variants";

const Tile = () => {
  const footersItems = [
    {
      id: 1,
      title: "A more human way to learn",
      info: "We’re redefining what it means to learn about finance—and that means education resources that are built for today.",
    },
    {
      id: 2,
      title: "Truly digestible financial news",
      info: "Investing news—made for today. Robinhood Snacks is revolutionizing how we talk about the markets",
    },
    {
      id: 3,
      title: "See how it all works",
      info: "We believe everyone has the right to know the cost of a trade—so we’re showing you how our business works.",
    },
    {
      id: 4,
      title: "Quality execution on every trade",
      info: "See the stats and standards behind how we seek a quality execution on each order.",
    },
  ];
  // motion
  return (
    <React.Fragment>
      <div>
        <Container
          fluid
          className="px-lg-4 py-5"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div>
            <div className="justify-content-center d-flex ">
              <motion.h3
                className="text-center mb-4 "
                style={{
                  maxWidth: window.innerWidth > 562 ? "560px" : "100%",
                  fontWeight: "bolder",
                  fontSize: "28px",
                }}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
              >
                We believe the financial system should be built to work for
                everyone. That’s why we create products that let you start
                investing at your own pace, on your own terms.
              </motion.h3>
            </div>
            <div className="row mt-4">
              {footersItems.map((foot) => {
                return (
                  <div key={foot.id} className="col-12 col-lg-3">
                    <div className="d-flex flex-column gap-2 align-items-center justify-content-between text-center">
                      <h3 style={{ fontWeight: "bolder" }}>{foot.title}</h3>
                      <p className="fs-16 text-dark">{foot.info}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Tile;
