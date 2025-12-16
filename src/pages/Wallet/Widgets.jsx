import React, { useEffect } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Mousewheel } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { getTransactionAnalytics } from "../../services/user/transactions";
import { getAccessToken } from "../../constants";
import { getWalletAnalytics } from "../../services/user/wallet";

const Widgets = () => {
  const token = getAccessToken();
  const { data: analytics } = useQuery({
    queryFn: getTransactionAnalytics,
    queryKey: ["trnxAnalytics"],
    enabled: !!token,
  });

  const { data: walletAnalytics } = useQuery({
    queryFn: getWalletAnalytics,
    queryKey: ["walletAnalytics"],
    enabled: !!token,
  });

  // useEffect(() => {
  //   if (walletAnalytics) console.log(walletAnalytics);
  // }, [walletAnalytics]);

  return (
    <React.Fragment>
      <Col xxl={3} md={6}>
        <Card className="card-animate">
          <CardBody>
            <div className="d-flex mb-3">
              <div className="flex-grow-1">
                <lord-icon
                  src="https://cdn.lordicon.com/fhtaantg.json"
                  trigger="loop"
                  colors="primary:#405189,secondary:#0ab39c"
                  style={{ width: "55px", height: "55px" }}
                ></lord-icon>
              </div>
              <div className="flex-shrink-0">
                <Link
                  to="#"
                  className="badge bg-warning-subtle text-warning badge-border me-1"
                >
                  BTC
                </Link>
                <Link
                  to="#"
                  className="badge bg-info-subtle text-info badge-border me-1"
                >
                  ETH
                </Link>
                <Link
                  to="#"
                  className="badge bg-primary-subtle text-primary badge-border me-1"
                >
                  USDT
                </Link>
              </div>
            </div>
            <h3 className="mb-2">
              <span className="counter-value" data-target="74858">
                <CountUp
                  start={0}
                  end={
                    walletAnalytics?.availableBalance
                      ?.toFixed(2)
                      .split(".")[0] || 0
                  }
                  separator=","
                  prefix="$"
                  duration={3}
                />
              </span>
              <small className="text-muted fs-14">
                .{walletAnalytics?.availableBalnce?.toFixed(2).split(".")[1]}k
              </small>
            </h3>
            <h6 className="text-muted mb-0">Available Balance (USD)</h6>
          </CardBody>
        </Card>
      </Col>
      <Col xxl={3} md={6}>
        <Card className="card-animate">
          <CardBody>
            <div className="d-flex mb-3">
              <div className="flex-grow-1">
                <lord-icon
                  src="https://cdn.lordicon.com/qhviklyi.json"
                  trigger="loop"
                  colors="primary:#405189,secondary:#0ab39c"
                  style={{ width: "55px", height: "55px" }}
                ></lord-icon>
              </div>
              <div className="flex-shrink-0">
                <Link
                  to="#"
                  className="badge bg-warning-subtle text-warning badge-border me-1"
                >
                  BTC
                </Link>
                <Link
                  to="#"
                  className="badge bg-info-subtle text-info badge-border me-1"
                >
                  ETH
                </Link>
                <Link
                  to="#"
                  className="badge bg-primary-subtle text-primary badge-border me-1"
                >
                  USDT
                </Link>
              </div>
            </div>
            <h3 className="mb-2">
              <span className="counter-value" data-target="74361">
                <CountUp
                  start={0}
                  end={analytics?.totalDeposit?.toFixed(2).split(".")[0] || 0}
                  separator=","
                  prefix="$"
                  duration={3}
                />
              </span>
              <small className="text-muted fs-14">
                .{analytics?.totalDeposit?.toFixed(2).split(".")[1]} k
              </small>
            </h3>
            <h6 className="text-muted mb-0">Deposit (Total)</h6>
          </CardBody>
        </Card>
      </Col>
      <Col xxl={3} md={6}>
        <Card className="card-animate">
          <CardBody>
            <div className="d-flex mb-3">
              <div className="flex-grow-1">
                <lord-icon
                  src="https://cdn.lordicon.com/yeallgsa.json"
                  trigger="loop"
                  colors="primary:#405189,secondary:#0ab39c"
                  style={{ width: "55px", height: "55px" }}
                ></lord-icon>
              </div>
              <div className="flex-shrink-0">
                <Link
                  to="#"
                  className="badge bg-warning-subtle text-warning badge-border me-1"
                >
                  BTC
                </Link>
                <Link
                  to="#"
                  className="badge bg-info-subtle text-info badge-border me-1"
                >
                  ETH
                </Link>
                <Link
                  to="#"
                  className="badge bg-primary-subtle text-primary badge-border me-1"
                >
                  USDT
                </Link>
              </div>
            </div>
            <h3 className="mb-2">
              <span className="counter-value" data-target="97685">
                <CountUp
                  start={0}
                  end={
                    analytics?.totalWithdrawal?.toFixed(2).split(".")[0] || 0
                  }
                  separator=","
                  prefix="$"
                  duration={3}
                />
              </span>
              <small className="text-muted fs-14">
                .{analytics?.totalWithdrawal?.toFixed(2).split(".")[1]}k
              </small>
            </h3>
            <h6 className="text-muted mb-0">Withdraw (Total)</h6>
          </CardBody>
        </Card>
      </Col>
      <Col xxl={3} md={6}>
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          mousewheel={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Mousewheel]}
          className="default-swiper rounded"
        >
          <SwiperSlide>
            <Card className="card-animate overflow-hidden">
              <div className="card-body bg-warning-subtle">
                <div className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <lord-icon
                      src="https://cdn.lordicon.com/vaeagfzc.json"
                      trigger="loop"
                      colors="primary:#405189,secondary:#0ab39c"
                      style={{ width: "55px", height: "55px" }}
                    ></lord-icon>
                  </div>
                  <div className="flex-shrink-0">
                    <Link to="#" className="fw-medium">
                      Bitcoin (BTC)
                    </Link>
                  </div>
                </div>
                <h3 className="mb-2">
                  $245<small className="text-muted fs-14">.65k</small>
                </h3>
                <h6 className="text-muted mb-0">All Transactions (Total)</h6>
              </div>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card className="card-animate overflow-hidden">
              <div className="card-body bg-warning-subtle">
                <div className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <lord-icon
                      src="https://cdn.lordicon.com/vaeagfzc.json"
                      trigger="loop"
                      colors="primary:#405189,secondary:#0ab39c"
                      style={{ width: "55px", height: "55px" }}
                    ></lord-icon>
                  </div>
                  <div className="flex-shrink-0">
                    <Link to="#" className="fw-medium">
                      Ethereum (ETH)
                    </Link>
                  </div>
                </div>
                <h3 className="mb-2">
                  $24<small className="text-muted fs-14">.74k</small>
                </h3>
                <h6 className="text-muted mb-0">All Transactions (Total)</h6>
              </div>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card className="card-animate overflow-hidden">
              <div className="card-body bg-warning-subtle">
                <div className="d-flex mb-3">
                  <div className="flex-grow-1">
                    <lord-icon
                      src="https://cdn.lordicon.com/vaeagfzc.json"
                      trigger="loop"
                      colors="primary:#405189,secondary:#0ab39c"
                      style={{ width: "55px", height: "55px" }}
                    ></lord-icon>
                  </div>
                  <div className="flex-shrink-0">
                    <Link to="#" className="fw-medium">
                      Tether (USDT)
                    </Link>
                  </div>
                </div>
                <h3 className="mb-2">
                  $124<small className="text-muted fs-14">.36k</small>
                </h3>
                <h6 className="text-muted mb-0">All Transactions (Total)</h6>
              </div>
            </Card>
          </SwiperSlide>
        </Swiper>
      </Col>
    </React.Fragment>
  );
};

export default Widgets;
