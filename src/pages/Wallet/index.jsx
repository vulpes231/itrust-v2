import React from "react";
import { Container, Row } from "reactstrap";
import AllTransactions from "./AllTransactions";
import Widgets from "./Widgets";
import BreadCrumb from "../../components/Common/BreadCrumb";

const Wallet = () => {
  document.title = "Wallet | Itrust Investments";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Wallet" pageTitle="History" />
          <Row>
            <Widgets />
          </Row>
          <AllTransactions />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Wallet;
