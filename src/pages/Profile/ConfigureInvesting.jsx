import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { MdOutlineCancel, MdCheckCircleOutline } from "react-icons/md";
import EditInvestOptions from "./Updates/EditInvestOptions";
import { FaRegEdit } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import {
  toggleDrip,
  toggleMargin,
  toggleOptions,
} from "../../services/user/settings";
import Loader from "../../components/Common/Loader";
import SuccessToast from "../../components/Common/SuccessToast";

const ConfigureInvesting = ({ user }) => {
  const [showInvestOptionModal, setShowInvestOptionModal] = useState(false);
  const [error, setError] = useState("");

  const dripMutation = useMutation({
    mutationFn: toggleDrip,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });

  const marginMutation = useMutation({
    mutationFn: toggleMargin,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });

  const optionsMutation = useMutation({
    mutationFn: toggleOptions,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 2000);
      return () => clearTimeout(tmt);
    }
  }, [error]);
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
    const shouldShow = sessionStorage.getItem("showSuccessToast");

    if (shouldShow) {
      setShowToast(true);
      sessionStorage.removeItem("showSuccessToast");
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="d-flex align-items-center justify-content-between">
          <h5>Investing</h5>
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            type="button"
            onClick={() => setShowInvestOptionModal(true)}
          >
            <FaRegEdit /> Edit
          </button>
        </div>
      </CardHeader>
      <CardBody className="d-flex flex-column gap-3 p-4">
        <Row>
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>experience</span>
            <h6>{user?.investmentInfo?.experience || "-"}</h6>
          </Col>
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>risk tolerance</span>
            <h6>{user?.investmentInfo.riskTolerance || "-"}</h6>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>objectives</span>
            <h6 className="d-flex align-items-center gap-2">
              {user?.investmentInfo?.objectives &&
              user?.investmentInfo?.objectives.length > 0
                ? user?.investmentInfo?.objectives.map((obj, idx) => {
                    return (
                      <span
                        className="bg-info-subtle py-1 px-3 rounded text-info"
                        key={idx}
                      >
                        {obj}
                      </span>
                    );
                  })
                : "-"}
            </h6>
          </Col>
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>retirement time horizon</span>
            <h6>
              {user?.investmentInfo.retiring
                ? `${user?.investmentInfo.retiring} `
                : "-"}{" "}
            </h6>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>
              DRIP (dividend Reinvestment plan)
            </span>
            <span
              style={{ width: "100px", borderRadius: "5px" }}
              className={`${
                user?.investmentInfo?.drip
                  ? "bg-success-subtle text-success"
                  : "bg-danger-subtle text-danger"
              } d-flex align-items-center justify-content-center p-1 fs-12`}
            >
              {user?.investmentInfo?.drip ? (
                <span className="d-flex align-items-center gap-2">
                  <MdCheckCircleOutline />
                  Active
                </span>
              ) : (
                <span className="d-flex align-items-center gap-2">
                  <MdOutlineCancel />
                  Disabled
                </span>
              )}
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-1">
              <h6 className="text-capitalize">
                dividend Reinvestment plan (DRIP)
              </h6>
              <span style={{ color: "#878A99" }}>
                Automate your dividends to be automatically reinvested in your
                account.
              </span>
            </div>
            <span onClick={() => dripMutation.mutate()} className="pr-2">
              {user?.investmentInfo?.drip ? (
                <FaToggleOn size={26} className="text-secondary" />
              ) : (
                <FaToggleOff size={26} className="text-muted" />
              )}
            </span>
          </Col>
        </Row>
        <h5 className="mt-3 text-decoration-underline">
          Individual Brokerage:
        </h5>
        <Row>
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>trading status</span>
            <span
              style={{ width: "100px", borderRadius: "5px" }}
              className={`${
                user?.accountStatus?.status === "active"
                  ? "bg-success-subtle text-success"
                  : "bg-danger-subtle text-danger"
              } d-flex align-items-center justify-content-center p-1 fs-12`}
            >
              {user?.accountStatus?.status ? (
                <span className="d-flex align-items-center gap-2">
                  <MdCheckCircleOutline />
                  Active
                </span>
              ) : (
                <span className="d-flex align-items-center gap-2">
                  <MdOutlineCancel />
                  Disabled
                </span>
              )}
            </span>
          </Col>
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>option trading</span>

            <span
              style={{ width: "100px", borderRadius: "5px" }}
              className={`${
                user?.investmentInfo?.options
                  ? "bg-success-subtle text-success"
                  : "bg-danger-subtle text-danger"
              } d-flex align-items-center justify-content-center p-1 fs-12`}
            >
              {user?.investmentInfo?.options ? (
                <span className="d-flex align-items-center gap-2">
                  <MdCheckCircleOutline />
                  Active
                </span>
              ) : (
                <span className="d-flex align-items-center gap-2">
                  <MdOutlineCancel />
                  Disabled
                </span>
              )}
            </span>
          </Col>
        </Row>

        <Row className="mb-2">
          <Col md={6} className="d-flex flex-column gap-1 text-capitalize">
            <span style={{ color: "#878A99" }}>margin trading</span>
            <span
              style={{ width: "100px", borderRadius: "5px" }}
              className={`${
                user?.investmentInfo?.margin
                  ? "bg-success-subtle text-success"
                  : "bg-danger-subtle text-danger"
              } d-flex align-items-center justify-content-center p-1 fs-12`}
            >
              {user?.investmentInfo?.margin ? (
                <span className="d-flex align-items-center gap-2">
                  <MdCheckCircleOutline />
                  Active
                </span>
              ) : (
                <span className="d-flex align-items-center gap-2">
                  <MdOutlineCancel />
                  Disabled
                </span>
              )}
            </span>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-1">
              <h6 className="text-capitalize">margin trading</h6>
              <span style={{ color: "#878A99" }}>
                Enable margin trading for your account.
              </span>
            </div>
            <span onClick={() => marginMutation.mutate()} className="pr-2">
              {user?.investmentInfo?.margin ? (
                <FaToggleOn size={26} className="text-secondary" />
              ) : (
                <FaToggleOff size={26} className="text-muted" />
              )}
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-1">
              <h6 className="text-capitalize">options trading</h6>
              <span style={{ color: "#878A99" }}>
                Enable options trading for your account.
              </span>
            </div>
            <span onClick={() => optionsMutation.mutate()} className="pr-2">
              {user?.investmentInfo?.options ? (
                <FaToggleOn size={26} className="text-secondary" />
              ) : (
                <FaToggleOff size={26} className="text-muted" />
              )}
            </span>
          </Col>
        </Row>
      </CardBody>
      {showInvestOptionModal && (
        <EditInvestOptions
          isOpen={showInvestOptionModal}
          handleToggle={() => setShowInvestOptionModal(false)}
          user={user}
        />
      )}
      {dripMutation.isPending && <Loader />}
      {optionsMutation.isPending && <Loader />}
      {marginMutation.isPending && <Loader />}
      {dripMutation.isSuccess && (
        <SuccessToast
          successMsg={"Drip trading updated."}
          onClose={() => dripMutation.reset()}
        />
      )}
      {marginMutation.isSuccess && (
        <SuccessToast
          successMsg={"Marging trading updated."}
          onClose={() => dripMutation.reset()}
        />
      )}
      {optionsMutation.isSuccess && (
        <SuccessToast
          successMsg={"Options trading updated."}
          onClose={() => dripMutation.reset()}
        />
      )}

      {showToast && (
        <SuccessToast
          successMsg={"Investing Information Updated"}
          isOpen={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
    </Card>
  );
};

export default ConfigureInvesting;
