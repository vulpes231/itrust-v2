import React from "react";
import WithdrawForm from "./WithdrawForm";
import BreadCrumb from "../../components/Common/BreadCrumb";
import { Container } from "reactstrap";

const Withdraw = () => {
  document.title = "Withdraw | Itrust Investments";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Withdraw" pageTitle="Account" />
          <WithdrawForm />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Withdraw;
