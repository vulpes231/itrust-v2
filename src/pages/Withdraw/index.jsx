import React from "react";
import WithdrawForm from "./WithdrawForm";
import BreadCrumb from "../../components/Common/BreadCrumb";
import { Container } from "reactstrap";

const Withdraw = () => {
  document.title = "Withdrawal | Itrust Investments";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <WithdrawForm />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Withdraw;
