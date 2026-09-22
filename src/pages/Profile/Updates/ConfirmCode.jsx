import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Col, Input, Row } from "reactstrap";
import ErrorToast from "../../../components/Common/ErrorToast";
import { useMutation } from "@tanstack/react-query";
import { verifyCOMCode } from "../../../services/com/com";

const ConfirmCode = ({ email, onClose }) => {
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const mutation = useMutation({
    mutationFn: verifyCOMCode,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      //   setShowVerification(true);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    },
  });

  const validation = useFormik({
    initialValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },

    onSubmit: (values) => {
      const otp = `${values.otp1}${values.otp2}${values.otp3}${values.otp4}`;

      if (otp.length !== 4) {
        setError("Please enter the complete verification code.");
        return;
      }

      console.log("OTP:", otp);

      mutation.mutate({ code: otp });
    },
  });

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const otpFields = ["otp1", "otp2", "otp3", "otp4"];

  const handleOtpChange = (e, index) => {
    const { value } = e.target;

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    // Only keep one digit
    const digit = value.slice(-1);

    validation.setFieldValue(otpFields[index], digit);

    // Move to next input
    if (digit && index < otpFields.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !validation.values[otpFields[index]] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < otpFields.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pastedValue) return;

    pastedValue.split("").forEach((digit, index) => {
      validation.setFieldValue(otpFields[index], digit);
    });

    const nextIndex = Math.min(pastedValue.length, 3);

    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const otp = otpFields.map((field) => validation.values[field]).join("");

    if (otp.length !== 4) {
      setError("Please enter the complete 4-digit verification code.");
      return;
    }

    validation.handleSubmit();
  };

  return (
    <div className="d-flex justify-content-center py-4">
      <div
        className="card border-0 shadow-sm"
        style={{ maxWidth: "460px", width: "100%" }}
      >
        <div className="card-body p-4 p-md-5 text-center">
          <div
            className="d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle bg-primary bg-opacity-10"
            style={{
              width: "64px",
              height: "64px",
            }}
          >
            <i
              className="ri-mail-line text-primary"
              style={{ fontSize: "28px" }}
            />
          </div>

          <h4 className="fw-semibold mb-2">Verify your email</h4>

          <p className="text-muted mb-1">
            Enter the 4-digit verification code we sent to
          </p>

          <p className="fw-semibold text-dark text-break mb-4">{email}</p>

          <form onSubmit={handleSubmit}>
            <Row
              className="justify-content-center g-2 mb-4"
              onPaste={handlePaste}
            >
              {otpFields.map((field, index) => (
                <Col xs="3" key={field}>
                  <Input
                    innerRef={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    name={field}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={validation.values[field]}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="text-center fw-semibold fs-4 rounded-3"
                    style={{
                      height: "58px",
                      padding: 0,
                    }}
                    aria-label={`Verification code digit ${index + 1}`}
                  />
                </Col>
              ))}
            </Row>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-semibold"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </button>
          </form>

          <p className="text-muted small mt-4 mb-0">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="btn btn-link btn-sm p-0 text-decoration-none"
              onClick={() => {
                // Add resend OTP logic here
              }}
            >
              Resend code
            </button>
          </p>
        </div>
      </div>

      {error && <ErrorToast errorMsg={error} onClose={() => setError("")} />}
    </div>
  );
};

export default ConfirmCode;
