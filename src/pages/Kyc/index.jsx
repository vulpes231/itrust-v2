import React from "react";
import { Container, Row } from "reactstrap";

import KYC from "./KYCVerification";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const KYCVerification = () => {
  document.title = "Verify Account | Itrust Investments";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="KYC Application" pageTitle="Verification" />
          <Row>
            <KYC />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default KYCVerification;
