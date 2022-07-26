import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "Atoms/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: {
      type: {
        name: "string",
        required: true,
      },
      defaultValue: "Label",
    },
    backgroundColor: { control: "color" },
    onClick: () => {},
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
};
