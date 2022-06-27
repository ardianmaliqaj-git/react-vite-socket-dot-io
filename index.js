import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import HelloComponent from "./src/hello.component";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HelloComponent />
  </React.StrictMode>
);
