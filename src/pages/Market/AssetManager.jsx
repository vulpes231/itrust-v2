import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { searchAsset } from "../../services/asset/asset";
import { useDebounce } from "../../hooks/userHooks";
import numeral from "numeral";
import ErrorToast from "../../components/Common/ErrorToast";
import TradeSection from "./TradeSection";
import { useNavigate } from "react-router-dom";

const AssetManager = ({
  activeTab,
  handleChange,
  toggleTradeSection,
  setSelectedAsset,
  selectedAsset,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const [showResult, setShowResult] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: searchResults, isFetching } = useQuery({
    queryKey: ["searchAsset", debouncedSearchTerm],
    queryFn: () => searchAsset({ query: debouncedSearchTerm }),
    enabled: debouncedSearchTerm.length > 3,
  });

  // console.log(assetName);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectAsset = (asset) => {
    if (!asset) {
      setError("Please select an asset!");
      return;
    }

    setSelectedAsset(asset);
    handleChange("trade");
    setSearchTerm("");
    setShowResult(false);
    toggleTradeSection(true);
    // console.log("toggled");
  };

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      // console.log(searchResults);
      setShowResult(true);
    }
  }, [searchResults]);

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  const navigate = useNavigate();

  return (
    <Card className="p-0 ">
      <CardHeader>
        <Col className="d-flex align-items-center justify-content-between">
          <h4 className="">Search</h4>
          <span className="d-flex align-items-center gap-2">
            <button
              type="button"
              onClick={() => {
                handleChange("asset");
                navigate("/trade");
              }}
              className={`btn text-capitalize ${
                activeTab === "asset"
                  ? "btn-secondary"
                  : "bg-secondary-subtle text-secondary"
              }`}
            >
              assets
            </button>
            <button
              type="button"
              onClick={() => handleChange("trade")}
              className={`btn text-capitalize ${
                activeTab === "trade"
                  ? "btn-secondary"
                  : "bg-secondary-subtle text-secondary"
              }`}
            >
              trade now
            </button>
          </span>
        </Col>
      </CardHeader>
      <CardBody>
        <Col className="mb-2">
          <Input
            type="text"
            placeholder="Search Asset..."
            onChange={handleInputChange}
            value={searchTerm}
            name="searchTerm"
          />
        </Col>
        {isFetching && <p>Searching...</p>}
        {showResult &&
          (searchResults || []).map((item) => {
            return (
              <Col
                key={item._id}
                className="d-flex justify-content-between align-items-center mb-3 border px-5 py-3 rounded-1"
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectAsset(item)}
              >
                <div className="d-flex gap-2 align-items-center">
                  <figure className="border rounded-circle p-1">
                    {" "}
                    <img src={item?.imageUrl} alt="" width={25} />
                  </figure>
                  <div>
                    <h4>{item?.symbol}</h4>
                    <span>{item?.name}</span>
                  </div>
                </div>
                <div className="d-flex flex-column gap-2 align-items-end">
                  <h5> {numeral(item.priceData?.current).format("$0,0.00")}</h5>
                  <div
                    className={`${
                      item.priceData?.changePercent < 0
                        ? "text-danger"
                        : "text-success"
                    } d-flex gap-2 align-items-center`}
                  >
                    <span>
                      {parseFloat(item?.priceData?.change).toFixed(2)}%
                    </span>
                    <span>
                      {numeral(item.priceData?.changePercent).format("$0,0.00")}
                    </span>
                  </div>
                </div>
              </Col>
            );
          })}
      </CardBody>

      {error && (
        <ErrorToast
          isOpen={!!error}
          onClose={() => setError("")}
          errorMsg={error}
        />
      )}
    </Card>
  );
};

export default AssetManager;
