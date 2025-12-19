import React from "react";
import { Modal, ModalBody } from "reactstrap";

const ConnectWait = ({ isOpen, toggle }) => {
  const method = JSON.parse(sessionStorage.getItem("connectMethod"));
  return (
    <React.Fragment>
      <Modal isOpen={isOpen} toggle={toggle} centered={true} size="md">
        <ModalBody>
          <div
            className="d-flex flex-column align-items-center justify-content-center px-2 pt-4 gap-2"
            style={{ height: "300px" }}
          >
            <img src={method?.img} alt="" width={30} />
            <span className="text-uppercase fw-bold">Connect Wallet</span>
            <span className="fw-light">Waiting for connection...</span>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default ConnectWait;
