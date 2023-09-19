import React from "react";
import ReactDOM from "react-dom/client";
import "../__mocks__";
import App from "./app";
import "./assets/main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
