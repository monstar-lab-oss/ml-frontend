import { StrictMode } from "react";
import { render } from "react-dom";
import { useI18next } from "@/i18next";
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
  render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById("root")
  );
});
