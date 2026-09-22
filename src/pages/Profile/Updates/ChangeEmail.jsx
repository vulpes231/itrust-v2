import React, { useEffect, useState } from "react";

import {
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

import ErrorToast from "../../../components/Common/ErrorToast";
import ConfirmCode from "./ConfirmCode";
import { useMutation } from "@tanstack/react-query";
import { sendCOMCode } from "../../../services/com/com";

const ChangeEmail = ({ isOpen, handleToggle }) => {
  const [form, setForm] = useState({ email: "" });
  const [error, setError] = useState("");
  const [showVerifiCation, setShowVerification] = useState(false);

  const mutation = useMutation({
    mutationFn: sendCOMCode,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setShowVerification(true);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(form.email.trim());

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    mutation.mutate({ email: form.email });
  };

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleModalClose = () => {
    setForm({ email: "" });
    setError("");
    setShowVerification(false);
    handleToggle();
  };

  return (
    <Modal
      centered
      isOpen={isOpen}
      //   toggle={handleModalClose}
      size="md"
      contentClassName="border-0 shadow-lg rounded-4"
    >
      <ModalHeader
        toggle={handleModalClose}
        className="border-bottom px-4 py-3"
      >
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10"
            style={{
              width: "40px",
              height: "40px",
            }}
          >
            <i
              className={
                showVerifiCation
                  ? "ri-shield-check-line text-primary fs-5"
                  : "ri-mail-line text-primary fs-5"
              }
            />
          </div>

          <div>
            <h5 className="modal-title mb-0 fw-semibold">
              {showVerifiCation ? "Verify Email" : "Change Email"}
            </h5>

            <small className="text-muted fw-normal">
              {showVerifiCation
                ? "Enter the verification code"
                : "Update your email address"}
            </small>
          </div>
        </div>
      </ModalHeader>

      <ModalBody className="px-4 py-4">
        {!showVerifiCation ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email" className="form-label fw-medium text-dark">
                New email address
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                className="form-control-lg rounded-3"
              />

              <div className="form-text mt-2">
                We'll send a verification code to this email address.
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-light px-4"
                onClick={handleModalClose}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary px-4">
                <i className="ri-mail-send-line me-1" />
                Send Code
              </button>
            </div>
          </form>
        ) : (
          <div>
            <ConfirmCode email={form.email} onClose={handleToggle} />

            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link text-muted text-decoration-none btn-sm"
                onClick={() => setShowVerification(false)}
              >
                <i className="ri-arrow-left-line me-1" />
                Change email address
              </button>
            </div>
          </div>
        )}

        {error && <ErrorToast errorMsg={error} onClose={() => setError("")} />}
      </ModalBody>
    </Modal>
  );
};

export default ChangeEmail;
