import React from "react";
import { Col, Container, Row } from "reactstrap";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { getBodySize } from "../../constants";
import { MdStar } from "react-icons/md";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      title:
        "The best way for me to maximize every one of my hard earned dollars.",
      info: "-Lilyana , Itrust User Review on",
      site: "Trustpilot.com",
      ratings: 5,
    },
    {
      id: 2,
      title:
        "I LOVE Itrust Investment and have moved almost all of my finances there.",
      info: "– Jan, Itrust User Review on",
      site: "Trustpilot.com",
      ratings: 5,
    },
    {
      id: 3,
      title:
        "Great platform with clear presentation of your crypto's and stocks performance!",
      info: "– David, Itrust User Review on",
      site: "Trustpilot.com",
      ratings: 5,
    },
    {
      id: 4,
      title:
        "The best investment platform out there. perfect for tracking all my assets in on place with good insights.",
      info: "– Marcus , Itrust User Review on",
      site: "Trustpilot.com",
      ratings: 5,
    },
    {
      id: 5,
      title:
        "The single best resource for investing, managing retirement and seeing my entire financial picture.",
      info: "– Eric, Itrust User Review on",
      site: "Trustpilot.com",
      ratings: 5,
    },
    {
      id: 6,
      title:
        "This platform is a game changer for retirement planning, managing my investment is easy.",
      info: "-Wanda , Itrust User Review on",
      site: "Trustpilot.com",
      ratings: 5,
    },
  ];
  return (
    <React.Fragment>
      <section className="" id="reviews">
        <div className=""></div>
        <Container
          fluid
          className="px-lg-4 py-5"
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="mb-5">
            <h3
              // className=""
              style={{
                fontSize: window.innerWidth >= 560 ? "43px" : "30px",
                fontWeight: "bolder",
                lineHeight: "1",
              }}
            >
              Don’t just take our word for it
            </h3>
            <i
              style={{
                fontSize: window.innerWidth >= 560 ? "43px" : "30px",
                fontWeight: "lighter",
                lineHeight: "1",
              }}
            >
              Read what other people are saying
            </i>
          </div>
          <div>
            <Row className="gy-4 mt-4">
              {reviews.map((rev) => {
                return (
                  <Col key={rev.id} lg={4}>
                    <div className="mb-0 p-4 rounded-4 d-flex flex-column bg-success-subtle gap-2">
                      <span className="d-flex align-items-center gap-1">
                        <MdStar className="bg-success" />
                        <MdStar className="bg-success" />
                        <MdStar className="bg-success" />
                        <MdStar className="bg-success" />
                        <MdStar className="bg-success" />
                      </span>
                      <h3
                        className="fw-normal mb-3 fs-28"
                        style={{
                          color: "#202020",
                          // fontSize: "2rem",
                        }}
                      >
                        "{rev.title}"
                      </h3>
                      <p
                        className="mb-0 fs-15"
                        style={{
                          color: "#6c757d",
                          lineHeight: 1.8,
                          // fontSize: "1.1rem",
                        }}
                      >
                        {rev.info}
                      </p>
                      <span>{rev.site}</span>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Reviews;
