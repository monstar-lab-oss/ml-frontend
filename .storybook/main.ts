const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    "@storybook/addon-interactions",
  ],
  features: {
    interactionsDebugger: true,
  },
  framework: "@storybook/react",
  core: {
    builder: "storybook-builder-vite",
  },
  async viteFinal(config) {
    return {
      ...config,
      css: {
        preprocessorOptions: {
          scss: { additionalData: `@import "src/main.scss";` },
        },
      },
      resolve: {
        alias: [
          {
            find: "@",
            replacement: path.resolve(__dirname, "../src"),
          },
        ],
      },
    };
  },
};
