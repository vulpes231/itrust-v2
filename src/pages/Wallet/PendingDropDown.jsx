import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { Card } from "reactstrap";
import { cancelTransaction } from "../../services/user/transactions";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import Loader from "../../components/Common/Loader";
import { getUserInfo } from "../../services/user/user";
import { getAccessToken } from "../../constants";
import { Link } from "react-router-dom";
import ShowTierCode from "../Tiers/ShowTierCode";
import EnterTierCode from "../Tiers/EnterTierCode";

const PendingDropDown = ({ id, isCodeSubmitted }) => {
  const tk = getAccessToken();
  const [showOptions, setShowOptions] = useState(false);
  const [showTierCodeFrom, setShowTierCodeForm] = useState(false);
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: cancelTransaction,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    enabled: !!tk,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      setError("Transaction ID required!");
      return;
    }

    console.log(id);

    mutation.mutate({ transactionId: id });
  };

  // console.log(user?.accountTier);

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 2000);

      return () => clearTimeout(tmt);
    }
  }, [error]);
  return (
    <div className="position-relative">
      <span onClick={() => setShowOptions(!showOptions)}>
        <IoEllipsisVerticalSharp />
      </span>
      {showOptions && (
        <Card
          className="p-2"
          style={{
            position: "absolute",
            top: "20px",
            right: "60px",
            zIndex: "1000",
          }}
        >
          <div
            className="d-flex flex-column align-items-start gap-2"
            style={{ width: "100px" }}
          >
            <button
              type="button"
              onClick={handleSubmit}
              className="fs-12 fw-bold px-1 bg-transparent border-0"
              disabled={mutation.isPending}
            >
              Cancel
            </button>
            {user?.accountTier?.isCodeActivated && (
              <div className="d-flex flex-column gap-2">
                {!isCodeSubmitted && (
                  <Link
                    to={"/tiers"}
                    // onClick={handleSubmit}
                    className="fs-12 fw-bold px-1 bg-transparent border-0 text-black"
                    style={{ textDecoration: "none" }}
                  >
                    Get Tier Code
                  </Link>
                )}
                {!isCodeSubmitted && (
                  <button
                    type="button"
                    onClick={() => setShowTierCodeForm(true)}
                    className="fs-12 fw-bold px-1 bg-transparent border-0"
                    // disabled={mutation.isPending}
                  >
                    Enter Tier Code
                  </button>
                )}
              </div>
            )}
          </div>
        </Card>
      )}

      {error && <ErrorToast errorMsg={error} onClose={() => setError("")} />}
      {mutation.isSuccess && (
        <SuccessToast
          successMsg={"Transaction cancelled"}
          onClose={() => mutation.reset()}
        />
      )}
      {mutation.isPending && <Loader />}
      {showTierCodeFrom && (
        <EnterTierCode
          isOpen={showTierCodeFrom}
          transactionId={id}
          handleToggle={() => {
            setShowOptions();
            setShowTierCodeForm(false);
          }}
        />
      )}
    </div>
  );
};

export default PendingDropDown;
