import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
import EditContactInfo from "./Updates/EditContactInfo";
import EditTrustedContact from "./Updates/EditTrustedContact";
import { FaRegEdit } from "react-icons/fa";
import VerifyAddress from "./Updates/Address/VerifyAddress";
import VerifyAddressPending from "./Updates/Address/VerifyAddressPending";
import AddressVerified from "./Updates/Address/AddressVerified";
import AddressVerificationForm from "./Updates/Address/AddressVerificationForm";
import SuccessToast from "../../components/Common/SuccessToast";
import { Link } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiAlertCircle } from "react-icons/fi";

const ContactInformation = ({ user }) => {
  const [editContactModal, setEditContactModal] = useState(false);
  const [editTrustedModal, setEditTrustedModal] = useState(false);
  const [verifyAddressModal, setVerifyAddressModal] = useState(false);

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const tmt = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [showToast]);

  useEffect(() => {
    const shouldShow = sessionStorage.getItem("showContactToast");

    if (shouldShow) {
      setShowToast(true);
      sessionStorage.removeItem("showContactToast");
    }
  }, []);
  return (
    <Col>
      <Card>
        <CardHeader>
          <div className="d-flex align-items-center justify-content-between">
            <h5>Contact Information</h5>
            <button
              className="btn btn-primary d-flex align-items-center gap-2"
              type="button"
              onClick={() => setEditContactModal(true)}
            >
              <FaRegEdit /> Edit
            </button>
          </div>
        </CardHeader>
        <CardBody className="d-flex flex-column gap-3 p-4">
          <Row>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                email address{" "}
              </span>
              <h6 className="d-flex align-items-center gap-2">
                {user?.contactInfo?.email || "-"}{" "}
                <span className={`fs-10 fw-light text-capitalize`}>
                  {user?.accountStatus?.isEmailVerified ? (
                    <small className="text-success bg-success-subtle p-1 rounded-2 d-flex align-items-center gap-1">
                      <FaRegCircleCheck /> verified
                    </small>
                  ) : (
                    <Link
                      className="p-1 fw-bold fs-11 d-flex align-items-center gap-1"
                      style={{ textDecoration: "underline", color: "#D9AA40" }}
                      to={"/verifyemail"}
                    >
                      <FiAlertCircle /> verify email
                    </Link>
                  )}
                </span>
              </h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1">
              <span className="text-capitalize" style={{ color: "#878A99" }}>
                phone number
              </span>
              <h6>{user?.contactInfo?.phone || "-"}</h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>address</span>
              <h6>{user?.contactInfo?.street || "-"}</h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>country</span>
              <h6>{user?.contactInfo?.country?.name || "-"}</h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>state/province</span>
              <h6>{user?.contactInfo?.state?.name || "-"}</h6>
            </Col>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>city</span>
              <h6>{user?.contactInfo?.city || "-"}</h6>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
              <span style={{ color: "#878A99" }}>post code</span>
              <h6>{user?.contactInfo?.zipCode || "-"}</h6>
            </Col>
          </Row>
          {user?.contactInfo?.status === "not verified" ? (
            <VerifyAddress
              show={verifyAddressModal}
              setShow={setVerifyAddressModal}
            />
          ) : user?.contactInfo?.status === "pending" ? (
            <VerifyAddressPending />
          ) : user?.contactInfo?.status === "verified" ? (
            <AddressVerified />
          ) : null}
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <div className="d-flex align-items-center justify-content-between">
            <h5>Trusted Contacts</h5>
            <button
              className="btn btn-primary d-flex align-items-center gap-2"
              type="button"
              onClick={() => setEditTrustedModal(true)}
            >
              <FaRegEdit /> Add Contact
            </button>
          </div>
        </CardHeader>
        <CardBody className="p-4">
          <Col className="d-flex flex-column gap-3 border p-2 rounded">
            <Row>
              <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
                <span style={{ color: "#878A99" }}>first name</span>
                <h6>{user?.settings?.beneficiary?.firstName || "-"}</h6>
              </Col>
              <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
                <span style={{ color: "#878A99" }}>last name</span>
                <h6>{user?.settings?.beneficiary?.lastName || "-"}</h6>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
                <span style={{ color: "#878A99" }}>relationship</span>
                <h6>{user?.settings?.beneficiary?.relationship || "-"} </h6>
              </Col>
              <Col md={6} className="d-flex flex-column gap-1 ">
                <span style={{ color: "#878A99" }} className="text-capitalize">
                  email address
                </span>
                <h6>{user?.settings?.beneficiary?.contact?.email || "-"}</h6>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
                <span style={{ color: "#878A99" }}>phone number</span>
                <h6>{user?.settings?.beneficiary?.contact?.phone || "-"}</h6>
              </Col>
              <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
                <span style={{ color: "#878A99" }}>address</span>
                <h6>
                  {user?.settings?.beneficiary
                    ? `${user?.settings?.beneficiary?.address?.street},  ${user?.settings?.beneficiary?.address?.city}, ${user?.settings?.beneficiary?.address?.state?.name} ${user?.settings?.beneficiary?.address?.zipCode}`
                    : "-"}
                </h6>
              </Col>
            </Row>
          </Col>
        </CardBody>
      </Card>
      {editContactModal && (
        <EditContactInfo
          isOpen={editContactModal}
          handleToggle={() => setEditContactModal(false)}
          user={user}
        />
      )}
      {editTrustedModal && (
        <EditTrustedContact
          isOpen={editTrustedModal}
          handleToggle={() => setEditTrustedModal(false)}
          user={user}
        />
      )}
      {verifyAddressModal && (
        <AddressVerificationForm
          isKycVerification={verifyAddressModal}
          setIsKycVerification={setVerifyAddressModal}
        />
      )}
      {showToast && (
        <SuccessToast
          successMsg={"Contact Information Updated"}
          isOpen={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
    </Col>
  );
};

export default ContactInformation;
