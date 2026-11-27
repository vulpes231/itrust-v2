import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { cancelTransaction } from "../services/user/transactions";
import { Spinner } from "reactstrap";
import SuccessToast from "../components/Common/SuccessToast";
import ErrorToast from "../components/Common/ErrorToast";

const ManageTrans = ({ isOpen, trxId, onClose }) => {
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const mutation = useMutation({
    mutationFn: cancelTransaction,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  });

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      style={{
        position: "absolute",
        top: "90px",
        right: "10px",
        // backgroundColor: "transparent",
      }}
      className="bg-white py-2 px-4 shadow rounded-2"
    >
      <button
        type="button"
        disabled={mutation.isPending}
        onClick={(e) => {
          e.preventDefault();

          const data = { transactionId: trxId };
          mutation.mutate(data);
        }}
        className="bg-transparent border-0 text-body d-flex gap-2"
      >
        {mutation.isPending && <Spinner size="sm" />}
        Cancel
      </button>

      {mutation.isSuccess && (
        <SuccessToast
          successMsg="Transaction cancelled"
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}

      {error && (
        <ErrorToast
          errorMsg={error}
          isOpen={!!error}
          onClose={() => {
            setError("");
            mutation.reset();
          }}
        />
      )}
    </div>
  );
};

export default ManageTrans;
