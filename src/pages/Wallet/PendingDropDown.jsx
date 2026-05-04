import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { Card } from "reactstrap";
import { cancelTransaction } from "../../services/user/transactions";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";
import Loader from "../../components/Common/Loader";

const PendingDropDown = ({ id }) => {
  const [showOptions, setShowOptions] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      setError("Transaction ID required!");
      return;
    }

    console.log(id);

    mutation.mutate({ transactionId: id });
  };

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
        <Card className="position-absolute top-2 p-2">
          <button
            onClick={handleSubmit}
            className="fs-12 fw-bold px-1 bg-transparent border-0"
            disabled={mutation.isPending}
          >
            Cancel
          </button>
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
    </div>
  );
};

export default PendingDropDown;
