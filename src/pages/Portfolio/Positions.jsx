import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { getUserPositions } from "../../services/user/position";
import { getAccessToken } from "../../constants";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import PositionTab from "./PositionTab";

const Positions = ({ accounts }) => {
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

  const tradeAccts = (accounts || []).filter(
    (acct) => acct.name !== "investing",
  );

  return (
    <React.Fragment>
      <Card className="">
        <CardHeader className="d-flex align-items-center justify-content-between">
          <div className="flex-grow-1">
            <h5 className="card-title mb-0">Positions</h5>
          </div>

          <div>
            <UncontrolledDropdown direction="start">
              <DropdownToggle
                tag="button"
                className="btn btn-soft-primary btn-sm"
              >
                <span className="text-uppercase">
                  {filter}
                  <i className="mdi mdi-chevron-down align-middle ms-1"></i>
                </span>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu dropdown-menu-end">
                <DropdownItem
                  onClick={() => setFilter("all")}
                  className={filter === "all" ? "active" : ""}
                >
                  All
                </DropdownItem>
                {tradeAccts &&
                  tradeAccts.length > 0 &&
                  tradeAccts.map((acct) => {
                    // console.log(acct);
                    return (
                      <DropdownItem
                        key={acct._id}
                        onClick={() => setFilter(acct.name)}
                        className={filter === acct.name ? "active" : ""}
                      >
                        {acct.name}
                      </DropdownItem>
                    );
                  })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>

          {/* <span>
            <Input
              type="select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-secondary-subtle border-0 text-secondary outline-none"
            >
              <option value="all">All</option>
              <option value="individual brokerage">Individual Brokerage</option>
              <option value="automated investing">Automated Investing</option>
            </Input>
          </span> */}
        </CardHeader>
        <CardBody>
          <Col className="d-flex flex-column gap-3">
            {filteredPositions &&
              filteredPositions.length > 0 &&
              filteredPositions.map((pos) => {
                return <PositionTab key={pos._id} position={pos} />;
              })}
            {filteredPositions && filteredPositions.length === 0 && (
              <Col className="py-4 text-muted d-flex align-items-center justify-content-center">
                No records found.
              </Col>
            )}
          </Col>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Positions;
