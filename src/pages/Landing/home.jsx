import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { hero } from "../../assets";
import "../../assets/scss/config/creative/home.scss";

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getImageWidth = () => {
    if (windowWidth < 576) return "280px";
    if (windowWidth < 768) return "400px";
    if (windowWidth < 992) return "500px";
    return "600px";
  };

  return (
    <React.Fragment>
      <section className="section pb-0 hero-section" id="hero">
        <div className="bg-overlay bg-overlay-pattern"></div>
        <Container fluid className="px-3 px-md-4 px-lg-5">
          <Row className="hero-wrapper mt-5 pt-5">
            <div className="hero-content">
              <h1 className="hero-title">Invest the way you want to</h1>
              <p className="hero-description">
                Whether you are an active trader, investing or saving for the
                future, we can help you reach your goals. Invest globally in
                stocks, options and many more from a single unified platform.
                Earn the best interest rate 5.0% APY on your cash
              </p>

              <div className="hero-button-wrapper">
                <Link to="/register" className="btn btn-secondary hero-btn">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="hero-image-wrapper">
              <img
                src={hero}
                alt="hero-img"
                className="hero-image"
                style={{
                  width: getImageWidth(),
                }}
              />
            </div>
          </Row>
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
