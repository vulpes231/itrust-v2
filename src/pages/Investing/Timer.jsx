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
      const now = new Date(); // Current time
      const endDate = new Date(end);

      // Calculate difference in milliseconds
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

      // Calculate years, months, days, etc.
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
        years: years,
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [end]); // Only depend on end date

  // Helper function to format numbers with leading zeros
  const formatNumber = (num) => {
    if (num === undefined || num === null) {
      return "00";
    }
    return num.toString().padStart(2, "0");
  };

  return (
    <Row>
      <Col className="d-flex flex-column">
        <label htmlFor="" className="text-muted fs-10">
          Years
        </label>
        <div>
          <span className="bg-secondary fs-15 fw-semibold text-light p-2 text-center rounded-1">
            {formatNumber(timeLeft.years)}
          </span>
          <span>:</span>
        </div>
      </Col>

      <Col className="d-flex flex-column">
        <label htmlFor="" className="text-muted fs-10">
          Months
        </label>
        <div>
          <span className="bg-secondary fs-15 fw-semibold text-light p-2 text-center rounded-1">
            {formatNumber(timeLeft.months)}
          </span>
          <span>:</span>
        </div>
      </Col>
      <Col className="d-flex flex-column">
        <label htmlFor="" className="text-muted fs-10">
          Days
        </label>
        <div>
          <span className="bg-secondary fs-15 fw-semibold text-light p-2 text-center rounded-1">
            {formatNumber(timeLeft.days)}
          </span>
          <span>:</span>
        </div>
      </Col>
      <Col className="d-flex flex-column">
        <label htmlFor="" className="text-muted fs-10">
          Hours
        </label>
        <div>
          <span className="bg-secondary fs-15 fw-semibold text-light p-2 text-center rounded-1">
            {formatNumber(timeLeft.hours)}
          </span>
          <span>:</span>
        </div>
      </Col>
      <Col className="d-flex flex-column">
        <label htmlFor="" className="text-muted fs-10">
          Minutes
        </label>
        <div>
          <span className="bg-secondary fs-15 fw-semibold text-light p-2 text-center rounded-1">
            {formatNumber(timeLeft.minutes)}
          </span>
          <span>:</span>
        </div>
      </Col>
      <Col className="d-flex flex-column">
        <label htmlFor="" className="text-muted fs-10">
          Seconds
        </label>
        <div>
          <span className="bg-secondary fs-15 fw-semibold text-light p-2 text-center rounded-1">
            {formatNumber(timeLeft.seconds)}
          </span>
        </div>
      </Col>
    </Row>
  );
};

export default Timer;
