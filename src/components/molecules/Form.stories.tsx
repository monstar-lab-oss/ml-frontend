import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Form } from "./Form";

const delay = 30;

export default {
  title: "Molecules/Form",
  component: Form,
  argTypes: {
    onSubmit: { action: true },
  },
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Default = Template.bind({});

// interaction test sample
// refs. https://storybook.js.org/tutorials/ui-testing-handbook/react/en/interaction-testing/
export const SubmitWithValidValues = Template.bind({});
SubmitWithValidValues.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId("email"), "email@provider.com", {
    delay,
  });
  await userEvent.type(canvas.getByTestId("password"), "a-random-password", {
    delay,
  });
  await userEvent.click(canvas.getByText("Submit"));

  await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  await expect(canvas.getByTestId("submit-success")).toBeInTheDocument();
};

export const SubmitWithInvalidValues = Template.bind({});
SubmitWithInvalidValues.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByTestId("email"), "email@provider.com", {
    delay,
  });

  await userEvent.click(canvas.getByText("Submit"));
  await expect(canvas.findByText("Password is required"));
};
