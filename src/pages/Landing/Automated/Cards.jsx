import React from "react";
import { Container } from "reactstrap";
import { getBodySize } from "../../../constants";
import { card1, card2, card3, inny } from "../../../assets";
import { Link } from "react-router-dom";

const Cards = () => {
  const cardItems = [
    {
      id: 1,
      title: "Choose how you want to invest",
      info: "Pick one of our diversified portfolios that interests you. They’re built by experts using low-cost exchange-traded funds.",
      path: "/register",
      img: card1,
    },
    {
      id: 2,
      title: "We put your money to work",
      info: "Automated trading, rebalancing, and dividend reinvestment, we put our technology behind every dollar you invest.",
      path: "/register",
      img: card2,
    },
    {
      id: 3,
      title: "Investing for you, Managed by us",
      info: "Everyone’s financial situation is different. Get personal recommendations based on what you want to accomplish, whether that’s retirement or simply building wealth.",
      path: "/register",
      img: card3,
    },
  ];
  return (
    <React.Fragment>
      <div className="bg-secondary-subtle p-2 p-lg-5">
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="row mt-5 align-items-center gx-3 gx-lg-5">
            {cardItems.map((item) => {
              return (
                <div key={item.id} className="col-12 col-lg-4 gy-4">
                  <div
                    className="d-flex flex-column justify-content-between gap-2 bg-white rounded-4 p-3"
                    style={{ height: "400px" }}
                  >
                    <div>
                      <img
                        src={item.img}
                        alt=""
                        className="img-fluid"
                        style={{
                          width: "100%",
                        }}
                      />
                      <h3 className="font-normal text-secondary fs-18 mt-3">
                        {item.title}
                      </h3>
                      <p className="text-muted">{item.info}</p>
                    </div>
                    <Link
                      style={{
                        width: window.innerWidth > 562 ? "120px" : "89px",
                        height: window.innerWidth > 562 ? "44px" : "48px",
                      }}
                      className="btn btn-secondary fw-bold p-1 p-lg-2 d-flex align-items-center justify-content-center"
                      to={item.path}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Cards;
