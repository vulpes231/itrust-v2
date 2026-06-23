import React from "react";
import { Col, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";

const ResetPasswordModal = ({ isOpen, handleToggle }) => {
  return (
    <Modal isOpen={isOpen} centered toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>Reset Password</ModalHeader>
      <ModalBody>
        <Col className="d-flex flex-column gap-2">
          <div>
            <Label>Reset Code</Label>
            <Input type="text" />
          </div>
          <div>
            <Label>Enter New Password</Label>
            <Input type="password" />
          </div>
          <div>
            <button className="mt-3 btn btn-primary">Reset password</button>
          </div>
        </Col>
      </ModalBody>
    </Modal>
  );
};

export default ResetPasswordModal;
