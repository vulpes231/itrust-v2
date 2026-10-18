import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import withRouter from "../components/Common/withRouter";

const NonAuthLayout = ({ children }) => {
  const nonauthData = createSelector(
    (state) => state.Layout,
    (layout) => layout.layoutModeType,
  );

  const layoutModeType = useSelector(nonauthData);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", layoutModeType);

    return () => {
      document.body.removeAttribute("data-bs-theme");
    };
  }, [layoutModeType]);

  return <div>{children}</div>;
};

export default withRouter(NonAuthLayout);
