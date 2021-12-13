import { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "@/App";

const prepare = async (): Promise<void> => {
  if (import.meta.env.DEV && !import.meta.env.VITE_REACT_APP_API_HOST) {
    const { mockServer } = await import("@/__mocks__/server");
    mockServer.start({
      onUnhandledRequest: "bypass",
    });
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
