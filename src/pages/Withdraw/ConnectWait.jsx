import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";

const ConnectWait = ({ isOpen, toggle }) => {
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeButtonTimeout = setTimeout(() => {
      setShowCloseButton(true);
    }, 60000);

    // Auto close modal after 4 minutes (240000 ms)
    const autoCloseTimeout = setTimeout(() => {
      toggle();
    }, 240000);

    return () => {
      clearTimeout(closeButtonTimeout);
      clearTimeout(autoCloseTimeout);
    };
  }, [isOpen, toggle]);

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
            {showCloseButton && (
              <button
                onClick={() => {
                  console.log("Close clicked");
                  toggle();
                }}
                className="btn btn-primary"
              >
                Quit
              </button>
            )}
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default ConnectWait;
