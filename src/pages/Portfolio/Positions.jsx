import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { getUserPositions } from "../../services/user/position";
import { getAccessToken } from "../../constants";
import { Card, CardBody, CardHeader, Col, Input } from "reactstrap";
import PositionTab from "./PositionTab";

const Positions = () => {
  const tk = getAccessToken();
  const { data: positionData } = useQuery({
    queryKey: ["positionData"],
    queryFn: getUserPositions,
  });

  const [filter, setFilter] = useState("all");
  const myPositions = positionData?.positions;

  const filteredPositions = useMemo(() => {
    if (!myPositions) return [];

    const positions =
      filter === "all"
        ? myPositions
        : myPositions.filter(
            (ps) => ps.wallet.name.toLowerCase() === filter.toLowerCase(),
          );

    return positions;
  }, [myPositions, filter]);

  return (
    <React.Fragment>
      <Card className="">
        <CardHeader className="d-flex align-items-center justify-content-between">
          <div className="flex-grow-1">
            <h5 className="card-title mb-0">Positions</h5>
          </div>

          <span>
            <Input
              type="select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="individual brokerage">Individual Brokerage</option>
              <option value="automated investing">Automated Investing</option>
            </Input>
          </span>
        </CardHeader>
        <CardBody>
          <Col className="d-flex flex-column gap-3">
            {filteredPositions &&
              filteredPositions.length > 0 &&
              filteredPositions.map((pos) => {
                return <PositionTab key={pos._id} position={pos} />;
              })}
          </Col>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Positions;
