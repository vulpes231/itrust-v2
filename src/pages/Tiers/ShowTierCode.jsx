import React, { useState } from "react";
import { Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import { CiCircleAlert } from "react-icons/ci";

import { IoMdCopy } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ShowTierCode = ({ isOpen, handleToggle, code }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
        navigate("/cash");
      }, 2000);
    } catch (error) {
      console.error("Failed to copy tier code:", error);
    }
  };

  return (
    <Modal centered isOpen={isOpen} size="md" toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>Tier Code</ModalHeader>

      <ModalBody className="p-4">
        {/* Header */}
        <div className="text-center mb-4">
          <div
            className="d-flex align-items-center justify-content-center mx-auto mb-3"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              backgroundColor: "#f0fdf4",
              color: "#16a34a",
            }}
          >
            <FaRegCircleCheck size={28} />
          </div>

          <h5 className="mb-1 fw-semibold">Your Tier Code</h5>

          <p className="text-muted mb-0 fs-14">
            Use this code to complete your deposit.
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
            Keep this code safe. Enter the information correctly, as an
            incorrect code may result in delays or failed transactions.
          </span>
        </div>

        {/* Code */}
        <div className="mb-3">
          <Label className="fw-medium">Tier Code</Label>

          <div className="position-relative">
            <Input
              type="text"
              value={code || ""}
              readOnly
              className="text-center fw-semibold"
              style={{
                fontSize: "18px",
                letterSpacing: "2px",
                padding: "12px 45px 12px 12px",
                backgroundColor: "#f8f9fa",
              }}
            />
          </div>
        </div>

        {/* Copy button */}
        <button
          type="button"
          className={`btn w-100 d-flex align-items-center justify-content-center gap-2 ${
            copied ? "btn-success" : "btn-primary"
          }`}
          onClick={handleCopy}
          disabled={!code}
        >
          {copied ? (
            <>
              <FaRegCircleCheck size={20} />
              Copied!
            </>
          ) : (
            <>
              <IoMdCopy size={20} />
              Copy Tier Code
            </>
          )}
        </button>

        <p className="text-muted text-center fs-12 mt-3 mb-0">
          You can copy the code and paste it into the deposit form.
        </p>
      </ModalBody>
    </Modal>
  );
};

export default ShowTierCode;
