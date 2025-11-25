import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { getLatestNews } from "../../services/generic/news";

const NewsFeed = () => {
  const { data: news } = useQuery({
    queryFn: getLatestNews,
    queryKey: ["news"],
    staleTime: 24 * 60 * 60 * 1000,
    cacheTime: 24 * 60 * 60 * 1000,
  });

  return (
    <React.Fragment>
      <Col xxl={4}>
        <Card>
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">News Feed</h4>
            <div>
              <button type="button" className="btn btn-soft-primary btn-sm">
                View all
              </button>
            </div>
          </CardHeader>

          <CardBody>
            {((news && news.slice(1, 6)) || []).map((item, key) => (
              <div
                className={key === 0 ? "d-flex align-middle" : "d-flex mt-4"}
                key={key}
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.image_url}
                    className="rounded img-fluid"
                    style={{ height: "60px", width: "90px" }}
                    alt=""
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1 lh-base">
                    <Link to="#" className="text-reset">
                      {item.title}
                    </Link>
                  </h6>
                  <p className="text-muted fs-13 mb-0">
                    {item.pubDate?.split(" ")[0]}{" "}
                    <i className="mdi mdi-circle-medium align-middle mx-1"></i>
                    {item.pubDate?.split(" ")[1]}
                  </p>
                </div>
              </div>
            ))}
            <div className="mt-3 text-center">
              <Link to="#" className="text-muted text-decoration-underline">
                View all News
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default NewsFeed;
