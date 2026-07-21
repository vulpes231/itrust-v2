import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { hero } from "../../assets";
import "../../assets/scss/config/creative/home.scss";
import { getSize } from "../../constants";

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      <section className="section pb-0 hero-section" id="hero">
        <div className="bg-overlay bg-overlay-pattern"></div>
        <Container
          fluid
          className="px-lg-4"
          style={{
            maxWidth: getSize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <motion.div
            className="row mt-5 pt-5 align-items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            <div className="col-12 col-lg-6 ">
              <div className="d-flex flex-column align-items-center align-items-lg-start">
                <h1
                  style={{
                    fontWeight: "black",
                    color: "#000000",
                    fontSize: windowWidth > 992 ? "60px" : "25px",
                    fontFamily: "arial",
                  }}
                  className="mb-3"
                >
                  Invest the way you want to
                </h1>
                <p
                  className="fs-17 text-center text-lg-start"
                  style={{
                    color: "#505050",
                    lineHeight: windowWidth >= 992 ? "2" : "1.5",
                    maxWidth: windowWidth >= 992 ? "520px" : "100%",
                  }}
                >
                  Whether you are an active trader, investing or saving for the
                  future, we can help you reach your goals. Invest globally in
                  stocks, options and many more from a single unified platform.
                  Earn the best interest rate 5.0% APY on your cash
                </p>
                <div className="hero-button-wrapper">
                  <Link
                    to="/register"
                    className="btn btn-secondary d-flex align-items-center justify-content-center"
                    style={{
                      height: windowWidth > 768 ? "49px" : "45px",
                      width: windowWidth > 768 ? "170px" : "128px",
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 text-center">
              <img src={hero} alt="hero-img" className="img-fluid" />
            </div>
          </motion.div>
        </Container>

        <div className="hero-shape-svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <g mask='url("#SvgjsMask1003")' fill="none">
              <path d="M 0,118 C 288,98.6 1152,40.4 1440,21 L 1440,140 L 0,140 Z"></path>
            </g>
          </svg>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
