import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { MdAdd, MdClose, MdSearch } from "react-icons/md";

import { getSize } from "../../../constants";

import General from "./General";
import Cash from "./Cash";
import Investing from "./Investing";
import Savings from "./Savings";
import Settings from "./Settings";
import { allFaqs } from "./AllQuestions";

const tabs = [
  { id: "general", label: "general" },
  { id: "cash", label: "cash" },
  { id: "investing", label: "investing" },
  { id: "savings", label: "savings & retirement" },
  { id: "account", label: "account settings" },
];

const Content = () => {
  const [currentQue, setCurrentQue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [tab, setTab] = useState("general");

  useEffect(() => {
    const value = searchTerm.trim().toLowerCase();

    if (value.length < 3) {
      setSearchResults([]);
      return;
    }

    const results = allFaqs.filter((faq) => {
      return (
        faq.question.toLowerCase().includes(value) ||
        faq.answer?.toLowerCase().includes(value)
      );
    });

    setSearchResults(results);
  }, [searchTerm]);

  return (
    <section className="section bg-light-subtle mt-5" id="plans">
      <Container
        fluid
        className="px-lg-4"
        style={{
          maxWidth: getSize(window.innerWidth),
          margin: "0 auto",
        }}
      >
        <div className="row p-2 p-lg-0">
          <div className="col-12">
            <div className="mb-5">
              <h3
                className="mb-3 fw-bold"
                style={{
                  lineHeight: 1,
                  fontSize: window.innerWidth >= 562 ? "40px" : "36px",
                }}
              >
                Frequently Asked <br className="d-none d-lg-block" />
                Questions
              </h3>
            </div>

            <div className="py-4">
              <div className="d-flex justify-content-end position-relative">
                <input
                  type="text"
                  placeholder="Write your question here..."
                  className="border-0 shadow py-2 px-4 rounded-2 text-muted fs-16"
                  style={{
                    minWidth: window.innerWidth >= 562 ? "50%" : "100%",
                    height: "58px",
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <span
                  className="position-absolute text-muted"
                  style={{ top: "35%", right: "10px" }}
                >
                  <MdSearch className="fs-18" />
                </span>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="mb-5 d-flex flex-column gap-3 text-capitalize text-dark">
              {tabs.map((tb) => (
                <span
                  key={tb.id}
                  className="d-flex gap-2 align-items-center"
                  role="button"
                  onClick={() => setTab(tb.id)}
                >
                  <span
                    style={{ width: "35px", height: "5px" }}
                    className={tb.id === tab ? "bg-secondary rounded-4" : ""}
                  />

                  <span
                    className={`fs-16 ${tb.id === tab ? "text-secondary" : ""}`}
                  >
                    {tb.label}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-8">
            {searchResults.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {searchResults.map((faq, index) => (
                  <div
                    onClick={() => {
                      if (currentQue === faq.id) {
                        setCurrentQue("");
                      } else {
                        setCurrentQue(faq.id);
                      }
                    }}
                    className="d-flex flex-column bg-white p-3 rounded-4 text-dark"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <span>{faq.id}.</span>
                        <span className="fs-16">{faq.question}</span>
                      </div>
                      <span>
                        {currentQue === faq.id ? <MdClose /> : <MdAdd />}
                      </span>
                    </div>
                    {currentQue === faq.id && (
                      <p className="fs-14 text-muted fw-light px-4 mt-3">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                {tab === "general" && (
                  <General
                    currentQue={currentQue}
                    setCurrentQue={setCurrentQue}
                  />
                )}

                {tab === "cash" && (
                  <Cash currentQue={currentQue} setCurrentQue={setCurrentQue} />
                )}

                {tab === "investing" && (
                  <Investing
                    currentQue={currentQue}
                    setCurrentQue={setCurrentQue}
                  />
                )}

                {tab === "savings" && (
                  <Savings
                    currentQue={currentQue}
                    setCurrentQue={setCurrentQue}
                  />
                )}

                {tab === "account" && (
                  <Settings
                    currentQue={currentQue}
                    setCurrentQue={setCurrentQue}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Content;
