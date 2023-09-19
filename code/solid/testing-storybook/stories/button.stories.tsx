import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";
import { Button } from "../src/components/button";

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const FooBar: Story = {
  args: {
    children: "foo-bar",
  },
};

export default {
  title: "Example/Button",
  tags: ["autodocs"],
  render: (props) => <Button {...props} />,
  parameters: {
    docs: {
      description: {
        component: "Some component _markdown_",
      },
    },
  },
} as Meta<ComponentProps<typeof Button>>;
