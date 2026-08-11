import React from "react";
import { Container } from "reactstrap";
import { getBodySize, getSize, liveUrl } from "../../../constants";
import { card1, card2, gift } from "../../../assets";

import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../../services/generic/articles";
import { useNavigate } from "react-router-dom";

const ArticleList = ({ activeTab }) => {
  const myArticles = [
    {
      id: 1,
      title: "The Stock Market Is Down—What Should I Do?",
      info: "Stock market volatility can be unnerving. No investor, whether they’re new to investing or have been making deposits for years, likes to see the value of their portfolio go down—even if it’s just temporary. When the market takes a turn, some people will inevitably sell investments in an attempt to minimize their losses, while others will stop making new deposits to their investment accounts. Unfortunately, both are usually mistakes that can cost you in the long run. Instead, we think you should do nothing. Don’t make any changes to your strategy: Just keep investing on a regular schedule even when the market is down. Why? History shows that markets have behaved predictably in the long run, and investors who stay the course are likely to come out ahead.",
      img: card1,
      category: "investing",
    },
    {
      id: 2,
      title: "Ask: Should i invest my downpayment?",
      info: "Welcome to our Ask series, where we tackle your questions about personal finance and investing. Want to see your question answered here? Reach out to us on social media and we’ll try to address it in a future column.",
      img: card2,
      category: "savings",
    },
  ];

  const { data: articles } = useQuery({
    queryFn: getArticles,
    queryKey: ["articles"],
  });

  // console.log(articles);

  const filteredArticles =
    articles?.filter((art) => art.topic === activeTab) || [];

  const customArticles =
    articles && articles.length > 0 && activeTab === "all"
      ? articles
      : filteredArticles;

  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div>
        <Container
          fluid
          className=""
          style={{
            maxWidth: getBodySize(window.innerWidth),
            margin: "0 auto",
          }}
        >
          <div className="row g-5">
            {customArticles.length === 0 && (
              <div className="text-center fw-bold text-dark">
                No articles for the selected category.
              </div>
            )}
            {customArticles &&
              customArticles.length > 0 &&
              customArticles.map((item) => {
                return (
                  <div
                    className="col-12 col-lg-4"
                    key={item._id}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/article/${item._id}`);
                    }}
                  >
                    <div className="d-flex flex-column gap-2 w-100 h-100">
                      <img
                        src={`${liveUrl}${item.img}`}
                        alt="article-img"
                        className="img-fluid rounded-4 bg-light-subtle"
                        style={{
                          height: "220px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <h4 className="text-secondary">{item.title}</h4>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.content.slice(0, 300),
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ArticleList;
