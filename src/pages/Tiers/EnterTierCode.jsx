import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { CiCircleAlert, CiLock } from "react-icons/ci";
import { Link } from "react-router-dom";
import {
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "reactstrap";

import { sendTierCode } from "../../services/user/tiers";
import ErrorToast from "../../components/Common/ErrorToast";
import SuccessToast from "../../components/Common/SuccessToast";

import { FaRegCircleCheck } from "react-icons/fa6";

const EnterTierCode = ({ isOpen, handleToggle, transactionId }) => {
  const [error, setError] = useState("");

  const submitCodeMutation = useMutation({
    mutationFn: sendTierCode,

    onError: (err) => {
      setError(err.message || "Failed to submit tier code.");
    },

    onSuccess: () => {
      setTimeout(() => {
        handleToggle();
        window.location.reload();
      }, 2000);
    },
  });

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      code: "",
      transactionId: "",
    },

    onSubmit: (values) => {
      if (!transactionId) {
        setError("Transaction ID is required.");
        return;
      }

      if (!values.code.trim()) {
        setError("Please enter your tier code.");
        return;
      }

      submitCodeMutation.mutate({
        ...values,
        code: values.code.trim(),
        transactionId,
      });
    },
  });

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const isSubmitting = submitCodeMutation.isPending;

  return (
    <Modal
      centered
      isOpen={isOpen}
      size="md"
      toggle={isSubmitting ? undefined : handleToggle}
    >
      <ModalHeader
        toggle={isSubmitting ? undefined : handleToggle}
        className="border-bottom-0 pb-0"
      />

      <ModalBody className="px-4 pb-4 pt-0">
        {/* Header */}
        <div className="text-center mb-4">
          <div
            className="d-flex align-items-center justify-content-center mx-auto mb-3"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              backgroundColor: "#f1f5f9",
            }}
          >
            <CiLock size={27} />
          </div>

          <h5 className="fw-semibold mb-1">Enter Tier Code</h5>

          <p className="text-muted fs-14 mb-0">
            Enter your tier code to complete your deposit.
          </p>
        </div>

        {/* Warning */}
        <div
          className="d-flex align-items-start gap-2 p-3 rounded-2 mb-4"
          style={{
            backgroundColor: "#fff8e1",
            color: "#856404",
          }}
        >
          <CiCircleAlert size={22} className="flex-shrink-0 mt-1" />

          <span className="fs-14">
            Make sure you enter the correct tier code. An incorrect code may
            cause your transaction to be delayed or fail.
          </span>
        </div>

        {/* Input */}
        <div className="mb-2">
          <Label for="tier-code" className="fw-medium">
            Tier Code
          </Label>

          <Input
            id="tier-code"
            name="code"
            type="text"
            value={validation.values.code}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            placeholder="Enter your tier code"
            autoComplete="off"
            disabled={isSubmitting}
            className="py-2"
            style={{
              letterSpacing: "1px",
            }}
          />
        </div>

        {/* Get Tier Code */}
        <Link
          to="/tiers"
          className="d-inline-flex align-items-center gap-1 text-secondary fs-14 mt-1"
          style={{
            textDecoration: "underline",
          }}
        >
          <CiCircleAlert size={17} />
          Get a Tier Code
        </Link>

        {/* Submit */}
        <button
          type="button"
          onClick={validation.handleSubmit}
          disabled={isSubmitting}
          className="btn btn-primary w-100 mt-4 d-flex align-items-center justify-content-center gap-2"
          style={{
            minHeight: "42px",
          }}
        >
          {isSubmitting ? (
            <>
              <Spinner size="sm" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <FaRegCircleCheck size={20} />
              <span>Submit Tier Code</span>
            </>
          )}
        </button>

        {/* Helper text */}
        <p className="text-muted text-center fs-12 mt-3 mb-0">
          Your tier code is required to authorize this deposit.
        </p>
      </ModalBody>

      {/* Error */}
      {error && <ErrorToast errorMsg={error} onClose={() => setError("")} />}

      {/* Success */}
      {submitCodeMutation.isSuccess && (
        <SuccessToast
          successMsg="Tier code submitted successfully."
          onClose={() => submitCodeMutation.reset()}
        />
      )}
    </Modal>
  );
};

export default EnterTierCode;
