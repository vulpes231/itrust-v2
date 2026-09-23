import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";

const Timer = ({ end }) => {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endDate = new Date(end);

      let difference = endDate - now;

      if (difference <= 0) {
        setTimeLeft({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
      difference -= years * (1000 * 60 * 60 * 24 * 365);

      const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
      difference -= months * (1000 * 60 * 60 * 24 * 30);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      difference -= days * (1000 * 60 * 60 * 24);

      const hours = Math.floor(difference / (1000 * 60 * 60));
      difference -= hours * (1000 * 60 * 60);

      const minutes = Math.floor(difference / (1000 * 60));
      difference -= minutes * (1000 * 60);

      const seconds = Math.floor(difference / 1000);

      setTimeLeft({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
      });
    };

    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [end]);

  const formatNumber = (num) => {
    if (num === undefined || num === null) {
      return "00";
    }

    return num.toString().padStart(2, "0");
  };

  return (
    <Row className="d-flex align-items-center flex-nowrap g-0">
      <Col className="d-flex flex-column px-1 px-md-2">
        <label className="text-muted fs-10 mb-1">Years</label>

        <div className="d-flex align-items-center">
          <span className="bg-secondary fs-14 fs-md-15 fw-semibold text-light p-1 p-md-2 text-center rounded-1">
            {formatNumber(timeLeft.years)}
          </span>

          <span className="ms-1">:</span>
        </div>
      </Col>

      <Col className="d-flex flex-column px-1 px-md-2">
        <label className="text-muted fs-10 mb-1">Months</label>

        <div className="d-flex align-items-center">
          <span className="bg-secondary fs-14 fs-md-15 fw-semibold text-light p-1 p-md-2 text-center rounded-1">
            {formatNumber(timeLeft.months)}
          </span>

          <span className="ms-1">:</span>
        </div>
      </Col>

      <Col className="d-flex flex-column px-1 px-md-2">
        <label className="text-muted fs-10 mb-1">Days</label>

        <div className="d-flex align-items-center">
          <span className="bg-secondary fs-14 fs-md-15 fw-semibold text-light p-1 p-md-2 text-center rounded-1">
            {formatNumber(timeLeft.days)}
          </span>

          <span className="ms-1">:</span>
        </div>
      </Col>

      <Col className="d-flex flex-column px-1 px-md-2">
        <label className="text-muted fs-10 mb-1">Hours</label>

        <div className="d-flex align-items-center">
          <span className="bg-secondary fs-14 fs-md-15 fw-semibold text-light p-1 p-md-2 text-center rounded-1">
            {formatNumber(timeLeft.hours)}
          </span>

          <span className="ms-1">:</span>
        </div>
      </Col>

      <Col className="d-flex flex-column px-1 px-md-2">
        <label className="text-muted fs-10 mb-1">Minutes</label>

        <div className="d-flex align-items-center">
          <span className="bg-secondary fs-14 fs-md-15 fw-semibold text-light p-1 p-md-2 text-center rounded-1">
            {formatNumber(timeLeft.minutes)}
          </span>

          <span className="ms-1">:</span>
        </div>
      </Col>

      <Col className="d-flex flex-column px-1 px-md-2">
        <label className="text-muted fs-10 mb-1">Seconds</label>

        <div className="d-flex align-items-center">
          <span className="bg-secondary fs-14 fs-md-15 fw-semibold text-light p-1 p-md-2 text-center rounded-1">
            {formatNumber(timeLeft.seconds)}
          </span>
        </div>
      </Col>
    </Row>
  );
};

export default Timer;
