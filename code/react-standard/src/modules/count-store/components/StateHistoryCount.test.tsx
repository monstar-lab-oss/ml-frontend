import { render } from "@/tests/utils";
import { StateHistoryCount } from "./StateHistoryCount";
import { useCountStore } from "../hooks/countStore";

describe("StateHistoryCount", () => {
  const initialStoreState = useCountStore.getState();

  beforeEach(() => {
    useCountStore.setState(initialStoreState, true);
  });

  test("renders current count from store", () => {
    const { getByTestId } = render(<StateHistoryCount />);

    expect(getByTestId("count")).toHaveTextContent("0");
  });

  test("increases count when clicking on increase button", async () => {
    const { getByTestId, user } = render(<StateHistoryCount />);

    await user.click(getByTestId("button-increase"));
    expect(getByTestId("count")).toHaveTextContent("1");
    expect(getByTestId("history").outerHTML).toMatchSnapshot();
  });

  test("decreases count when clicking on decrease button", async () => {
    const { getByTestId, user } = render(<StateHistoryCount />);

    await user.click(getByTestId("button-decrease"));
    expect(getByTestId("count")).toHaveTextContent("-1");
    expect(getByTestId("history").outerHTML).toMatchSnapshot();
  });

  test("undoes count when clicking on undo button", async () => {
    const { getByTestId, getByRole, user } = render(<StateHistoryCount />);

    await user.click(getByTestId("button-increase"));
    await user.click(getByTestId("button-increase"));
    await user.click(
      getByRole("button", {
        name: /Undo/,
      })
    );

    expect(getByTestId("count")).toHaveTextContent("1");
    expect(getByTestId("history").outerHTML).toMatchSnapshot();
  });

  test("redoes count when clicking on redo button", async () => {
    const { getByTestId, getByRole, user } = render(<StateHistoryCount />);

    await user.click(getByTestId("button-increase"));
    await user.click(getByTestId("button-increase"));
    await user.click(
      getByRole("button", {
        name: /Undo/,
      })
    );
    await user.click(
      getByRole("button", {
        name: /Redo/,
      })
    );

    expect(getByTestId("count")).toHaveTextContent("2");
    expect(getByTestId("history").outerHTML).toMatchSnapshot();
  });

  test("resets count when clicking on reset button", async () => {
    const { getByTestId, getByRole, user } = render(<StateHistoryCount />);

    await user.click(getByTestId("button-increase"));
    await user.click(getByTestId("button-increase"));
    expect(getByTestId("count")).toHaveTextContent("2");

    await user.click(
      getByRole("button", {
        name: /Clear history stack/,
      })
    );
    expect(getByTestId("count")).toHaveTextContent("0");
    expect(getByTestId("history").outerHTML).toMatchSnapshot();
  });
});
