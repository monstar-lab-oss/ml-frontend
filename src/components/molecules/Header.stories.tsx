import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Header } from "./Header";

export default {
  title: "Molecules/Header",
  component: Header,
  args: {
    title: "Our App",
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  useAuth: () => ({
    login: async () => {},
    logout: () => {},
    isLoggedIn: true,
  }),
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  useAuth: () => ({
    login: async () => {},
    logout: () => {},
    isLoggedIn: false,
  }),
};
