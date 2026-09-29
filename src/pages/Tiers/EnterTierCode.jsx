import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
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

const EnterTierCode = ({ isOpen, handleToggle }) => {
  const submitCodeMutation = useMutation({
    mutationFn: sendTierCode,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        handleToggle();
        window.location.reload();
      }, 2000);
    },
  });

  const [error, setError] = useState("");
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <Modal centered isOpen={isOpen} size="md" toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}></ModalHeader>
      <ModalBody>
        <div className="d-flex align-items-center justify-content-center flex-column">
          <h5>Enter Tier Code</h5>
          <p className="text-muted">
            Enter your tier code to complete your deposit
          </p>
        </div>
        <div className="d-flex align-items-start gap-2 text-warning bg-warning-subtle p-2 rounded-1">
          <CiCircleAlert size={25} />
          <span className="fs-14">
            Please keep your code safe and enter information correctly as wrong
            code may result in delays or failed transactions
          </span>
        </div>
        <div className="mt-3">
          <Label>Tier Code</Label>
          <Input
            type="text"
            value={validation.values.code}
            onChange={validation.handleChange}
            name="code"
            placeholder="Enter tier code"
          />
        </div>
        <Link
          className="text-secondary mt-2 d-flex align-items-center gap-1"
          to={"/tiers"}
          style={{ textDecoration: "underline" }}
        >
          <CiCircleAlert /> Get Tier Code Now
        </Link>
        <div className="mt-3 d-flex flex-column">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              validation.handleSubmit();
            }}
            className="btn btn-secondary d-flex align-items-center justify-content-center"
          >
            {submitCodeMutation.isPending && <Spinner size={"sm"} />} Submit
          </button>
        </div>
      </ModalBody>
      {/* Error */}
      {error && <ErrorToast errorMsg={error} onClose={() => setError("")} />}
      {submitCodeMutation.isSuccess && (
        <SuccessToast
          successMsg={"Code submitted."}
          onClose={() => submitCodeMutation.reset()}
        />
      )}
    </Modal>
  );
};

export default EnterTierCode;
