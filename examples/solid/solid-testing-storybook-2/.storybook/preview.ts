import { render } from "solid-js/web";
import { JSXElement } from "solid-js";

export const decorators = [
  (Story: () => JSXElement) => {
    const solidRoot = document.createElement("div");
    render(Story, solidRoot);
    return solidRoot;
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
