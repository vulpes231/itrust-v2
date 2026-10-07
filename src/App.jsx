import React from "react";
import "./assets/scss/themes.scss";
import Route from "./Routes";
import { TextWidget } from "@livechat/widget-react";

const App = () => {
  return (
    <React.Fragment>
      <TextWidget organizationId="a69c4dc8-0cf3-4cb2-9c07-e839b61d3470" />
      <Route />
    </React.Fragment>
  );
};

export default App;
