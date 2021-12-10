import { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "@/App";

const prepare = async (): Promise<void> => {
  if (import.meta.env.DEV && !import.meta.env.VITE_REACT_APP_API_HOST) {
    const { mockServer: worker } = await import("@/__mocks__/browser");
    worker.start();
  }
};

prepare().then(() => {
  render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById("root")
  );
});
