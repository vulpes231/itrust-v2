import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { activatePlan } from "../../services/user/invest";
import { useMutation, useQuery } from "@tanstack/react-query";
import SuccessToast from "../../components/Common/SuccessToast";
import ErrorToast from "../../components/Common/ErrorToast";
import { getAccessToken, liveUrl } from "../../constants";
import numeral from "numeral";
import { getUserWallets } from "../../services/user/wallet";

const ActivatePlanModal = ({ handleToggle, isOpen, plan }) => {
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");

  const mutation = useMutation({
    mutationFn: activatePlan,
    onError: (err) => setError(err.message),
  });

  const tk = getAccessToken();

  const { data: accounts } = useQuery({
    queryFn: getUserWallets,
    queryKey: ["wallets"],
    enabled: !!tk,
  });

  const investAccount =
    accounts &&
    accounts.length > 0 &&
    accounts.find((acct) => acct.slug === "auto");

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const tmt = setTimeout(() => {
        mutation.reset();
        window.location.reload();
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);
  //   console.log(plan);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) {
      setError("Enter amount to invest!");
      return;
    }
    if (parseFloat(amount) > investAccount?.balance?.available) {
      setError("Insufficient funds!");
      return;
    }
    const data = { amount, planId: plan._id };
    console.log(data);

    // setError("Awaiting backend integration. Try again later.");
    mutation.mutate(data);
  };

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} toggle={handleToggle}>
        {/* <ModalHeader toggle={handleToggle}>Activate Plan</ModalHeader> */}
        <ModalBody>
          <Col className="p-4">
            <Card>
              <Col className="border border-1 shadow p-3">
                <div className="d-flex align-items-center">
                  <span className="bg-light p-2 rounded-circle">
                    <img
                      src={`${liveUrl}${plan?.img}`}
                      alt=""
                      style={{ width: "40px" }}
                      className="rounded-circle"
                    />
                  </span>
                  <span className="d-flex flex-column">
                    <h3 className="fs-15 fw-semibold text-capitalize ">
                      {plan?.name}
                    </h3>
                    <span className="fs-14 text-muted fw-regular">
                      {plan?.title}
                    </span>
                  </span>
                </div>
                <Row className="px-4 mt-3 ">
                  <Col xs={6} md={4}>
                    <Label className="fs-13 fw-regular text-muted text-nowrap">
                      Min Investment
                    </Label>
                    <p className="fw-semibold fs-15">
                      {numeral(plan?.minInvestment).format("$0,0.0")}
                    </p>
                  </Col>
                  <Col xs={6} md={4}>
                    <Label className="fs-13 fw-regular text-muted">
                      Winrate
                    </Label>
                    <p className="fw-semibold fs-15">
                      {plan?.performance?.winRate}%
                    </p>
                  </Col>
                  <Col xs={6} md={4}>
                    <Label className="fs-13 fw-regular text-muted">
                      24hr Return
                    </Label>
                    <p className="fw-semibold fs-15">
                      {plan?.performance?.dailyReturnPercent}%
                    </p>
                  </Col>
                  <Col xs={6} md={4}>
                    <Label className="fs-13 fw-regular text-muted">
                      Duration
                    </Label>
                    <p className="fw-semibold fs-15">
                      {plan?.expiresIn?.milestone} {plan?.expiresIn?.duration}
                    </p>
                  </Col>
                  <Col xs={6} md={4}>
                    <Label className="fs-13 fw-regular text-muted">AUM</Label>
                    <p className="fw-semibold fs-15">
                      {plan?.performance?.aum}
                    </p>
                  </Col>
                  <Col xs={6} md={4}>
                    <Label className="fs-13 fw-regular text-muted">
                      Risk Level
                    </Label>
                    <p>
                      <span
                        className={` ${plan?.planType === "conservative" ? "text-secondary bg-secondary-subtle" : plan?.planType === "moderate" ? "text-warning bg-warning-subtle" : "text-danger bg-danger-subtle"} text-capitalize fs-11 fw-regular px-3 py-1 rounded-1`}
                      >
                        {plan?.planType}
                      </span>
                    </p>
                  </Col>
                </Row>
                <Col className="mb-3 d-flex flex-column mt-5">
                  <span className="fs-13 text-muted">
                    Available Balance:{" "}
                    {numeral(investAccount?.balance?.available).format(
                      "$0,0.0",
                    )}
                  </span>
                  <Label>Amount to Invest</Label>
                  <Input
                    type="text"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    name="amount"
                    autoComplete="off"
                  />
                </Col>
                <Col className="d-flex flex-column gap-2">
                  <button
                    className="btn btn-secondary d-flex align-items-center justify-content-center gap-2 text-capitalize"
                    type="button"
                    onClick={handleSubmit}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending && <Spinner size={"sm"} />} start plan
                  </button>
                  <p className="fs-14 fw-medium">
                    Your funds will be automatically allocated and managed
                    according to this plan strategy, Positions may rebalance as
                    market condition changes
                  </p>
                </Col>
              </Col>
            </Card>
          </Col>
        </ModalBody>
      </Modal>
      {mutation.isSuccess && (
        <SuccessToast
          successMsg={"Plan Activated."}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
      {error && (
        <ErrorToast
          errorMsg={error}
          isOpen={error}
          onClose={() => setError("")}
        />
      )}
    </React.Fragment>
  );
};

export default ActivatePlanModal;
