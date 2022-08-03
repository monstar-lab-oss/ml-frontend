import { render, fireEvent, screen } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Button.stories";

describe("Button", () => {
  // Returns a component that already contain all decorators from story level, meta level and global level.
  const { Default } = composeStories(stories);

  it("reuses args from composed story", () => {
    render(<Default />);
    const buttonElement = screen.getByRole("button");

    expect(buttonElement.textContent).toEqual(Default.args?.children);
  });

  it("onClick handler is called", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Default {...Default.args} onClick={onClick} />
    );

    fireEvent.click(getByText("Button"));
    expect(onClick).toHaveBeenCalled();
  });
});
