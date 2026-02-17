import React from "react";
import { Container, Row } from "reactstrap";
import AllTransactions from "./AllTransactions";
import Widgets from "./Widgets";
import BreadCrumb from "../../components/Common/BreadCrumb";
import VerifyAccountNotify from "../VerifyAccountNotify";

const Wallet = () => {
  document.title = "Cash Account | Itrust Investments";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Cash" pageTitle="Account" />
          <VerifyAccountNotify />
          <Row className="p-2">
            <Widgets />
          </Row>
          <AllTransactions />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Wallet;
