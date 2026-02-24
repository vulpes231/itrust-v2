import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Mousewheel } from "swiper/modules";
import { WidgetsCharts } from "./DashboardCryptoCharts";
import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../../services/asset/asset";
import { formatCurrency } from "../../constants";

const Widgets1 = () => {
  const queryData = {
    limit: 10,
    sortBy: "marketCap",
    type: "crypto",
  };

  const { data: assets } = useQuery({
    queryKey: ["popular"],
    queryFn: () => getAssets(queryData),
  });

  return (
    <React.Fragment>
      <Col>
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          mousewheel={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
            1600: {
              slidesPerView: 5,
            },
          }}
          modules={[Autoplay, Mousewheel]}
          className="cryptoSlider"
        >
          {assets &&
            assets.data &&
            assets.data.map((item, key) => (
              <SwiperSlide key={key}>
                <Card>
                  <CardBody>
                    <div className="float-end">
                      <UncontrolledDropdown direction="start">
                        <DropdownToggle
                          className="text-reset"
                          tag="a"
                          role="button"
                        >
                          <span className="text-muted fs-18">
                            <i className="mdi mdi-dots-horizontal"></i>
                          </span>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu dropdown-menu-end">
                          <DropdownItem href="#"> Details </DropdownItem>
                          <DropdownItem href="#"> Cancel </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.imageUrl}
                        className="bg-light rounded-circle p-1 avatar-xs img-fluid"
                        alt=""
                      />
                      <h6 className="ms-2 mb-0 fs-14">
                        {item.name.slice(0, 14)}
                        {item.name.length > 14 ? "..." : ""}
                      </h6>
                    </div>
                    <Row className="align-items-end g-0">
                      <Col xs={6}>
                        <h5 className="mb-1 mt-4">
                          {formatCurrency(item.priceData.current)}
                        </h5>
                        <p
                          className={`fw-semibold mb-0 d-flex align-items-center gap-2 ${
                            item.priceData.changePercent > 0
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          <span>
                            {" "}
                            {item.priceData.changePercent.toFixed(2)}%
                          </span>
                          <span className="text-muted ms-2 fs-13 text-uppercase">
                            {item.symbol}
                          </span>
                        </p>
                      </Col>
                      <Col xs={6}>
                        <div className="apex-charts crypto-widget" dir="ltr">
                          <WidgetsCharts
                            seriesData={assets}
                            // chartsColor={item.chartsColor}
                          />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </SwiperSlide>
            ))}
        </Swiper>
      </Col>
    </React.Fragment>
  );
};

export default Widgets1;
