import React from "react";
import { Container } from "reactstrap";
import { getBodySize, getSize } from "../../../constants";
import { card1, card2, gift } from "../../../assets";

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

  const filteredArticles =
    myArticles.filter((art) => art.category === activeTab) || [];

  const customArticles = activeTab === "all" ? myArticles : filteredArticles;
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
          <div className="row g-4">
            {customArticles.length === 0 && (
              <div className="text-center fw-bold">
                No articles for the selected category.
              </div>
            )}
            {customArticles.map((item) => {
              return (
                <div className="col-12 col-lg-4" key={item.id}>
                  <div className="d-flex flex-column gap-2 w-100 h-100">
                    <img
                      src={item.img}
                      alt=""
                      className="img-fluid"
                      style={{
                        height: "220px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <h4 className="text-secondary">{item.title}</h4>
                    <p className="text-muted">{item.info.slice(0, 300)}...</p>
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
