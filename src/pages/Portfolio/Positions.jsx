import { useQuery } from "@tanstack/react-query";
import React from "react";
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

  return (
    <React.Fragment>
      <Card className="">
        <CardHeader className="d-flex align-items-center justify-content-between">
          <div className="flex-grow-1">
            <h5 className="card-title mb-0">Positions</h5>
          </div>

          <span>
            <Input type="select">
              <option value="">Account</option>
              <option value="">Status</option>
            </Input>
          </span>
        </CardHeader>
        <CardBody>
          <Col className="d-flex flex-column gap-3">
            {positionData &&
              positionData.positions &&
              positionData.positions.length > 0 &&
              positionData.positions.map((pos) => {
                return <PositionTab key={pos._id} position={pos} />;
              })}
          </Col>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Positions;
