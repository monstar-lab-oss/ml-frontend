import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useI18next } from "@/i18next";
import { Router } from "wouter";

import { App } from "@/App";
import "./main.scss";

const prepare = async (): Promise<void> => {
  if (import.meta.env.DEV && !import.meta.env.VITE_REACT_APP_API_HOST) {
    const { mockServer } = await import("@/__mocks__/server");
    mockServer.start({
      onUnhandledRequest: "bypass",
    });
  }
};

prepare().then(() => {
  useI18next();

  const root = createRoot(document.getElementById("root")!);
  root.render(
    <StrictMode>
      <Router base="/ml-frontend">
        <App />
      </Router>
    </StrictMode>
  );
});
