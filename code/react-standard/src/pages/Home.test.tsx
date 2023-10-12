import { render } from "@/tests/utils";
import Home from "@/pages/Home";
import { useAuth } from "@/modules/authentication";

jest.mock("@/modules/authentication", () => {
  return {
    useAuth: jest.fn(() => {
      return {
        isLoggedIn: false,
      };
    }),
  };
});

describe("Home", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders correctly when user not logged in", () => {
    const { getByText } = render(<Home />);

    expect(getByText("description.not_logged_in")).toBeInTheDocument();
  });

  test("renders correctly when user logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: true,
    });
    const { queryByText } = render(<Home />);

    expect(queryByText("description.not_logged_in")).not.toBeInTheDocument();
  });
});
