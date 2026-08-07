import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { getArticleInfo } from "../../../services/generic/articles";
import { getBodySize, liveUrl } from "../../../constants";

const Detail = () => {
  const { articleId } = useParams();

  const { data: article } = useQuery({
    queryFn: () => getArticleInfo(articleId),
    queryKey: ["articleInfo"],
    enabled: !!articleId,
  });

  // console.log(article);
  return (
    <React.Fragment>
      <section className="section">
        <div
          style={{
            height: "400px",
            backgroundImage: `url(${liveUrl}${article.img})`,
          }}
          className="bg-light"
        >
          <div
            className="d-flex flex-column justify-content-center"
            style={{
              width: "100%",
              height: "100%",
              maxWidth: getBodySize(window.innerWidth),
              margin: "0 auto",
            }}
          >
            <h2
              className="mb-4"
              style={{
                color: "#202020",
                fontSize: window.innerWidth >= 562 ? "52px" : "28px",
                // maxWidth: window.innerWidth >= 562 ? "520px" : "100%",
                fontWeight: 900,
              }}
            >
              Article
            </h2>
            <span
              style={{
                // color: "#202020",
                fontSize: window.innerWidth >= 562 ? "16px" : "13px",
                // maxWidth: window.innerWidth >= 562 ? "520px" : "100%",
                fontWeight: 300,
                textTransform: "capitalize",
              }}
            >
              -{article.topic}
            </span>
            <p
              style={{
                color: "#202020",
                fontSize: window.innerWidth >= 562 ? "20px" : "16px",
                // maxWidth: window.innerWidth >= 562 ? "520px" : "100%",
                fontWeight: 900,
                textTransform: "capitalize",
              }}
            >
              {article.title}
            </p>
          </div>
        </div>
        <Container
          fluid
          className=""
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div
            className="py-4"
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Detail;
