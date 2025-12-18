import React from "react";
import TransferForm from "./TransferForm";
import { Container } from "reactstrap";

const Transfer = () => {
  document.title = "Transfer | Itrust Investments";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <TransferForm />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Transfer;
