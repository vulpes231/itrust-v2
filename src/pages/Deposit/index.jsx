import React from "react";
import DepositForm from "./DepositForm";
import { Container } from "reactstrap";
import BreadCrumb from "../../components/Common/BreadCrumb";
import TrxCrumb from "../../components/Common/TrxCrumb";

const Deposit = () => {
  document.title = "Deposit | Itrust Investments";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <DepositForm />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Deposit;
