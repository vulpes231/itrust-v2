import React from "react";

// constants
import { layoutModeTypes } from "../../components/constants/layout";

const LightDark = ({ layoutMode, onChangeLayoutMode }) => {
  const mode =
    layoutMode === layoutModeTypes["DARKMODE"]
      ? layoutModeTypes["LIGHTMODE"]
      : layoutModeTypes["DARKMODE"];

  const handleThemeChange = () => {
    localStorage.setItem("theme", mode);
    onChangeLayoutMode(mode);
  };

  return (
    <div className="ms-1 header-item d-flex">
      <button
        onClick={handleThemeChange}
        type="button"
        className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
      >
        <i className="bx bx-moon fs-22"></i>
      </button>
    </div>
  );
};

export default LightDark;
