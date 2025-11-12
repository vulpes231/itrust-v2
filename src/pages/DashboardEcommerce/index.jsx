import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const DashboardEcommerce = () => {
	document.title = "Dashboard | Itrust Investments";

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Ecommerce" pageTitle="Dashboard" />
				</Container>
			</div>
		</React.Fragment>
	);
};

export default DashboardEcommerce;
