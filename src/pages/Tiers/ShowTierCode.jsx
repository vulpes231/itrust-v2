import React from "react";
import { Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import { CiCircleAlert } from "react-icons/ci";

const ShowTierCode = ({ isOpen, handleToggle, code }) => {
  return (
    <Modal centered isOpen={isOpen} size="md" toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}></ModalHeader>
      <ModalBody>
        <div className="d-flex align-items-center justify-content-center flex-column">
          <h5>Tier Code</h5>
          <p className="text-muted">
            Use the tier code to complete your deposit
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
          <Input type="text" value={code} readOnly />
        </div>
        <div className="mt-3 d-flex flex-column">
          <button className="btn btn-secondary">Copy</button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ShowTierCode;
