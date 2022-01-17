import { render, fireEvent, screen } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Button.stories";

describe("Button", () => {
  // Returns a component that already contain all decorators from story level, meta level and global level.
  const { Primary } = composeStories(stories);

  it("reuses args from composed story", () => {
    render(<Primary />);
    const buttonElement = screen.getByRole("button");

    expect(buttonElement.textContent).toEqual(Primary.args?.label);
  });

  it("onClick handler is called", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Primary {...Primary.args} onClick={onClick} />
    );

    fireEvent.click(getByText("Button"));
    expect(onClick).toHaveBeenCalled();
  });
});
