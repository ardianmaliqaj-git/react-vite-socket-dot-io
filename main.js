import "~/stylesheets";

import HelloComponent from "~/components/hello";

import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(
  document.getElementById("root")
  ).render(
  <React.StrictMode>
    <HelloComponent />
  </React.StrictMode>
);
