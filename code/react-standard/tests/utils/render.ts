import { ReactElement } from "react";
import { RenderOptions } from "@testing-library/react";
// eslint-disable-next-line no-restricted-imports
import { render as renderComponent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export default function render(ui: ReactElement, options?: RenderOptions) {
  return {
    user: userEvent.setup(),
    ...renderComponent(ui, options),
  };
}
