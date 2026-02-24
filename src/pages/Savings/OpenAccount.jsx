import React, { useEffect, useState } from "react";
import TrxCrumb from "../../components/Common/TrxCrumb";
import { Card, Col, Container, Row } from "reactstrap";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAvailableSavingsAccts,
  openSavings,
} from "../../services/user/savings";
import { getAccessToken } from "../../constants";
import { useNavigate } from "react-router-dom";
import { capitalize } from "lodash";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import { getLoggedinUser } from "../../helpers/apiHelper";
import { getUserInfo } from "../../services/user/user";

const OpenAccount = () => {
  const token = getAccessToken();
  const history = useNavigate();

  const [error, setError] = useState("");
  const [selectedAcct, setSelectedAcct] = useState("");

  const { data: savingAccounts } = useQuery({
    queryKey: ["savings"],
    queryFn: getAvailableSavingsAccts,
    enabled: !!token,
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: !!token,
  });

  const mutation = useMutation({
    mutationFn: () => openSavings({ accountId: selectedAcct._id }),
    onError: (err) => setError(err.message),
  });

  const savingsAccts =
    savingAccounts &&
    savingAccounts.length > 0 &&
    savingAccounts.filter((acct) => acct.tag !== "retirement");

  const retirementAccts =
    savingAccounts &&
    savingAccounts.length > 0 &&
    savingAccounts.filter((acct) => acct.tag !== "savings");

  const handleSelection = (acct) => {
    if (!user || !acct) {
      return;
    }
    const userCountryId = user?.locationDetails?.country?.countryId;

    if (!acct.eligibleCountries.includes(userCountryId)) {
      setError("Account not available in your country!");
      return;
    }

    setSelectedAcct(acct);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAcct) {
      setError("Select an account!");
      return;
    }
    mutation.mutate();
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      const tmt = setTimeout(() => {
        setSelectedAcct("");
        mutation.reset();
        window.location.href = "/savings";
      }, 2000);
      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
        mutation.reset();
      }, 2000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  useEffect(() => {
    if (savingAccounts.length > 0) {
      console.log(savingAccounts);
    }
  }, [savingAccounts]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <TrxCrumb
            title={"Open Account"}
            handleMove={() => history("/savings")}
          />
          <Col>
            <Card className="p-4">
              <div className="d-flex flex-column gap-2">
                <span style={{ color: "#495057" }} className="fw-bold fs-15">
                  Choose Account
                </span>
                <span style={{ color: "#878A99" }} className="fw-regular fs-14">
                  It's easy to get started, whether you want to begin investing,
                  or are interested in savings and retirement accounts. Make
                  selections below to help us find the right investing
                  account(s) for you.
                </span>
              </div>
              {!selectedAcct && (
                <div>
                  <div className="mt-4 d-flex flex-column gap-3">
                    <span
                      style={{ color: "#495057" }}
                      className="fw-semibold fs-18 "
                    >
                      RETIREMENT ACCOUNTS
                    </span>
                    <Row>
                      {retirementAccts &&
                        retirementAccts.length > 0 &&
                        retirementAccts.map((acct) => {
                          return (
                            <Col
                              xl={4}
                              // lg={6}
                              key={acct._id}
                              className="p-3 border rounded-2 d-flex flex-column gap-1"
                              onClick={() => handleSelection(acct)}
                            >
                              <div className="d-flex align-items-start gap-2">
                                <span className="bg-success-subtle rounded-2 py-2 px-3">
                                  <i className="ri-hand-coin-line fs-22 text-success"></i>
                                </span>
                                <span className="d-flex flex-column">
                                  <span
                                    style={{ color: "#878A99" }}
                                    className="fw-bold fs-13"
                                  >
                                    {`${acct.name.slice(0, 1)}${acct.name.slice(
                                      1
                                    )}`}
                                  </span>
                                  <span
                                    style={{ color: "#495057" }}
                                    className="fw-semibold fs-21"
                                  >
                                    {acct.slug}
                                  </span>
                                </span>
                              </div>
                              <hr className="border" />
                              <div className="d-flex flex-column gap-1">
                                <span
                                  style={{ color: "#495057" }}
                                  className="fw-semibold fs-15"
                                >
                                  {acct.title}
                                </span>
                                <span
                                  style={{ color: "#495057" }}
                                  className="fw-regular fs-14"
                                >
                                  {acct.information}
                                </span>
                                <ul
                                  style={{ color: "#495057" }}
                                  className="fw-regular fs-14"
                                >
                                  {acct.details.length > 0 &&
                                    acct.details.map((nt, idx) => {
                                      return <li key={idx}>{nt}</li>;
                                    })}
                                </ul>
                              </div>
                            </Col>
                          );
                        })}
                    </Row>
                  </div>
                  <div className="mt-4 d-flex flex-column gap-3">
                    <span
                      style={{ color: "#495057" }}
                      className="fw-semibold fs-18 "
                    >
                      SAVINGS ACCOUNTS
                    </span>
                    <Row>
                      {savingsAccts &&
                        savingsAccts.length > 0 &&
                        savingsAccts.map((acct) => {
                          return (
                            <Col
                              xl={4}
                              // md={6}
                              key={acct._id}
                              className="p-3 border rounded-2 d-flex flex-column gap-1 mx-2"
                              onClick={() => handleSelection(acct)}
                            >
                              <div className="d-flex align-items-start gap-2">
                                <span className="bg-success-subtle rounded-2 py-2 px-3">
                                  <i class="ri-hand-coin-line fs-22 text-success"></i>
                                </span>
                                <span className="d-flex flex-column">
                                  <span
                                    style={{ color: "#878A99" }}
                                    className="fw-bold fs-13 text-capitalize"
                                  >
                                    {`${acct.name.slice(0, 1)}${acct.name.slice(
                                      1
                                    )}`}
                                  </span>
                                  <span
                                    style={{ color: "#495057" }}
                                    className="fw-semibold fs-21 text-uppercase"
                                  >
                                    {acct.slug}
                                  </span>
                                </span>
                              </div>
                              <hr className="border" />
                              <div className="d-flex flex-column gap-1">
                                <span
                                  style={{ color: "#495057" }}
                                  className="fw-semibold fs-15 text-capitalize"
                                >
                                  {acct.title}
                                </span>
                                <span
                                  style={{ color: "#495057" }}
                                  className="fw-regular fs-14 text-capitalize"
                                >
                                  {acct.information}
                                </span>
                                <ul
                                  style={{ color: "#495057" }}
                                  className="fw-regular fs-14 text-capitalize"
                                >
                                  {acct.details.length > 0 &&
                                    acct.details.map((nt, idx) => {
                                      return <li key={idx}>{nt}</li>;
                                    })}
                                </ul>
                              </div>
                            </Col>
                          );
                        })}
                    </Row>
                  </div>
                </div>
              )}

              {selectedAcct && (
                <div className="mt-4 d-flex flex-column gap-2">
                  <span
                    onClick={() => setSelectedAcct("")}
                    style={{ color: "#495057", cursor: "pointer" }}
                    className="fw-regular fs-17 d-flex gap-2 align-items-center"
                  >
                    <IoIosArrowBack /> All Accounts
                  </span>
                  <div className="mt-4 bg-warning-subtle">
                    <Col className="p-3 border rounded-2 d-flex flex-column gap-1">
                      <div className="d-flex align-items-start gap-2">
                        <span className="bg-success-subtle rounded-2 py-2 px-3">
                          <i class="ri-hand-coin-line fs-22 text-success"></i>
                        </span>
                        <span className="d-flex flex-column">
                          <span
                            style={{ color: "#878A99" }}
                            className="fw-bold fs-13 text-capitalize"
                          >
                            {`${selectedAcct?.name.slice(
                              0,
                              1
                            )}${selectedAcct?.name.slice(1)}`}
                          </span>
                          <span
                            style={{ color: "#495057" }}
                            className="fw-semibold fs-21 text-uppercase"
                          >
                            {selectedAcct?.slug}
                          </span>
                        </span>
                      </div>
                      <hr className="border" />
                      <div className="d-flex flex-column gap-1">
                        <span
                          style={{ color: "#495057" }}
                          className="fw-semibold fs-15 text-capitalize"
                        >
                          {selectedAcct?.title}
                        </span>
                        <span
                          style={{ color: "#495057" }}
                          className="fw-regular fs-14 text-capitalize"
                        >
                          {selectedAcct?.information}
                        </span>
                        <ul
                          style={{ color: "#495057" }}
                          className="fw-regular fs-14 text-capitalize"
                        >
                          {selectedAcct &&
                            selectedAcct.details.length > 0 &&
                            selectedAcct.details.map((nt, idx) => {
                              return <li key={idx}>{nt}</li>;
                            })}
                        </ul>
                      </div>
                    </Col>
                  </div>

                  <div className="d-flex align-items-start bg-primary-subtle rounded gap-3 mb-3 py-2 px-4">
                    <div>
                      <IoAlertCircleOutline className="text-primary" />
                    </div>
                    <div
                      style={{ fontWeight: 300, fontSize: "14px" }}
                      className="d-flex flex-column text-primary"
                    >
                      <span>
                        Your account will be opened instantly and you can
                        start investing right away. <br /> Remember to track
                        your contributions to stay within the annual limit of
                        $7,000.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={mutation.isPending}
                    className="text-light bg-primary btn fw-medium fs-14"
                    onClick={handleSubmit}
                  >
                    {!mutation.isPending
                      ? "Open Account"
                      : "Opening Account..."}
                  </button>
                </div>
              )}
            </Card>
          </Col>
        </Container>
      </div>
      {error && (
        <ErrorToast
          errorMsg={error}
          isOpen={error}
          onClose={() => setError("")}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          successMsg={"Account Opened Successfully."}
          isOpen={mutation.isSuccess}
          onClose={() => {
            mutation.reset();
          }}
        />
      )}
    </React.Fragment>
  );
};

export default OpenAccount;
