import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/Button";
import { ComponentProps } from "react";

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
        components: "Some component _markdown_",
      },
    },
  },
} as Meta<ComponentProps<typeof Button>>;
