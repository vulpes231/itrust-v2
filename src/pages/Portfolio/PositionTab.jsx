import { format } from "date-fns";
import numeral from "numeral";
import React, { useEffect } from "react";
import { Col, Label, Row } from "reactstrap";

const PositionTab = ({ position }) => {
  // useEffect(() => {
  //   if (position) {
  //     console.log(position, "data");
  //   }
  // }, [position]);

  return (
    <div className="border-1 border px-4 py-2 rounded-3">
      <Col className="d-flex align-items-center justify-content-between px-2">
        <div className="d-flex align-items-center  gap-2">
          <span className="p-1 bg-light rounded-circle">
            <img
              src={position?.asset?.img}
              alt="Asset"
              style={{ width: "30px" }}
            />
          </span>
          <span className="fs-14 text-secondary fw-medium d-flex flex-column">
            <span>{position?.asset?.name}</span>
            <span>{position?.asset?.symbol}</span>
          </span>
        </div>
        <div>
          <span className="fs-12 text-muted">
            as of {format(new Date(), "dd/mm/yyyy")}
          </span>
        </div>
      </Col>
      <hr className="text-muted" />
      <Col className="px-3 d-flex flex-column gap-2">
        <Row className="text-capitalize">
          <Col xs={6} sm={4}>
            <Label className="fw-semibold fs-13 fs-md-15">Order Type</Label>
            <p className="fw-normal fs-12 fs-md-14 text-muted">buy</p>
          </Col>
          <Col xs={6} sm={4}>
            <Label className="fw-semibold fs-13 fs-md-15">quantity</Label>
            <p className="fw-normal fs-12 fs-md-14 text-muted">
              {position?.asset?.type === "crypto"
                ? parseFloat(position?.quantity).toFixed(7)
                : parseFloat(position?.quantity).toFixed(4)}
            </p>
          </Col>
          <Col xs={6} sm={4}>
            <Label className="fw-semibold fs-13 fs-md-15">cost</Label>
            <p className="fw-normal fs-12 fs-md-14 text-muted">
              {numeral(position?.amountInvested).format("$0,0.00")}
            </p>
          </Col>
          <Col xs={6} sm={4}>
            <Label className="fw-semibold fs-13 fs-md-15">today's return</Label>
            <p
              className={`fw-normal fs-12 fs-md-14 ${position?.todayReturn < 0 ? "text-danger" : "text-success"}`}
            >
              {numeral(position?.todayReturn).format("$0,0.00")}
            </p>
          </Col>
          <Col xs={6} sm={4}>
            <Label className="fw-semibold fs-13 fs-md-15 text-nowrap">
              unrealized P&L
            </Label>
            <p
              className={`fw-normal fs-12 fs-md-14 ${position?.return < 0 ? "text-danger" : "text-success"}`}
            >
              {numeral(position?.return).format("$0,0.00")}
            </p>
          </Col>
          <Col xs={6} sm={4}>
            <Label className="fw-semibold fs-13 fs-md-15">current value</Label>
            <p className="fw-normal fs-12 fs-md-14 text-muted">
              {numeral(position?.currentValue).format("$0,0.00")}
            </p>
          </Col>
          <Col xs={6} sm={4}>
            <Label className="fw-semibold fs-13 fs-md-15">average cost</Label>
            <p className="fw-normal fs-12 fs-md-14 text-muted">
              {numeral(position?.currentPrice).format("$0,0.00")}
            </p>
          </Col>

          <Col xs={6} sm={4}>
            <Label className="fw-semibold fs-13 fs-md-15">realized P&L</Label>
            <p
              className={`fw-normal fs-12 fs-md-14 ${
                position.status === "open" || position?.return >= 0
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {position.status === "open"
                ? numeral(0).format("$0,0.00")
                : numeral(position?.return).format("$0,0.00")}
            </p>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default PositionTab;
