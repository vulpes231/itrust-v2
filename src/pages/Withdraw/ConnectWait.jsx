import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { getUserSettings } from "../../services/user/user";
import { getAccessToken } from "../../constants";
import { useQuery } from "@tanstack/react-query";

const ConnectWait = ({ isOpen, toggle }) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const token = getAccessToken();

  const { data: userSettings } = useQuery({
    queryFn: getUserSettings,
    queryKey: ["userSettings"],
    enabled: !!token && isOpen,
    refetchInterval: isOpen ? 60000 : false,
    refetchOnWindowFocus: true,
  });

  const status = userSettings?.wallet?.status;

  // Close immediately when the wallet connects.
  useEffect(() => {
    if (isOpen && status === "connected") {
      toggle();
    }
  }, [isOpen, status, toggle]);

  // Show Quit after 1 minute; force-close after 4 minutes.
  useEffect(() => {
    if (!isOpen) {
      setShowCloseButton(false);
      return;
    }

    const closeButtonTimeout = setTimeout(() => {
      setShowCloseButton(true);
    }, 60000);

    const autoCloseTimeout = setTimeout(() => {
      toggle();
    }, 240000);

    return () => {
      clearTimeout(closeButtonTimeout);
      clearTimeout(autoCloseTimeout);
    };
  }, [isOpen, toggle]);

  let method = null;

  try {
    method = JSON.parse(sessionStorage.getItem("connectMethod"));
  } catch {
    method = null;
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="md">
      <ModalBody>
        <div
          className="d-flex flex-column align-items-center justify-content-center px-2 pt-4 gap-2"
          style={{ height: "300px" }}
        >
          <img src={method?.img} alt="" width={30} />

          <span className="text-uppercase fw-bold">Connect Wallet</span>

          <span className="fw-light">
            {status === "connected"
              ? "Wallet connected!"
              : "Waiting for connection..."}
          </span>

          {showCloseButton && (
            <button onClick={() => toggle()} className="btn btn-primary">
              Quit
            </button>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConnectWait;
