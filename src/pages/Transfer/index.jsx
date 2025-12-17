import React from "react";
import TransferForm from "./TransferForm";
import { Container } from "reactstrap";
import BreadCrumb from "../../components/Common/BreadCrumb";

const Transfer = () => {
  document.title = "Transfer | Itrust Investments";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Transfer" pageTitle="Account" />
          <TransferForm />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Transfer;
