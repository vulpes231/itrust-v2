import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import SuccessToast from "../components/Common/SuccessToast";
import { liquidatePosition } from "../services/user/position";

const ManagePosition = ({ onClose, position }) => {
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const layoutMode = localStorage.getItem("layoutMode");

  const mutation = useMutation({
    mutationFn: liquidatePosition,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  });

  // const showClose =
  //   position?.status !== "closed" && position?.wallet?.slug !== "auto";

  return (
    <div
      ref={dropdownRef}
      className={`position-absolute border rounded-2 shadow p-3 ${layoutMode === "dark" ? "bg-body" : "bg-white"}`}
      style={{
        top: "100%",
        right: 0,
        zIndex: 100000,
        minWidth: "180px",
      }}
    >
      <div className="d-flex flex-column gap-2">
        {/* <button
          onClick={() => {
            // console.log("view", position._id);
          }}
          type="button"
          className="btn btn-sm btn-light"
        >
          View
        </button> */}
        <button
          onClick={() => {
            // console.log("close", position);

            const form = {
              positionId: position._id,
            };

            console.log(form);
            mutation.mutate(form);
          }}
          type="button"
          className="btn btn-sm btn-light"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Wait..." : "Close"}
        </button>
      </div>
      {mutation.isSuccess && (
        <SuccessToast
          successMsg={"Position Closed"}
          isOpen={mutation.isPending}
          onClose={() => mutation.reset()}
        />
      )}
    </div>
  );
};

export default ManagePosition;
