import { render } from "@/tests/utils";
import { EmployeeForm } from "./EmployeeForm";

describe("EmployeeForm", () => {
  test("renders create employee form when there is no employee passed to the component", () => {
    const { getByRole } = render(
      <EmployeeForm onCreate={() => {}} isSuccess={false} />
    );

    expect((getByRole("textbox") as HTMLInputElement).value).toBe("");
  });

  test("renders update employee form when employee is passed to the component", () => {
    const { getByRole } = render(
      <EmployeeForm
        values={{ id: "1", name: "employee name example" }}
        onUpdate={() => {}}
      />
    );

    expect((getByRole("textbox") as HTMLInputElement).value).toBe(
      "employee name example"
    );
  });

  test("calls onCreate after filling values and submitting form", async () => {
    const onCreateMock = jest.fn();
    const { getByRole, user } = render(
      <EmployeeForm onCreate={onCreateMock} isSuccess={false} />
    );

    await user.type(getByRole("textbox"), "employee name example");
    await user.click(getByRole("button"));

    expect(onCreateMock).toBeCalledWith({
      name: "employee name example",
    });
  });

  test("calls onUpdate after filling values and submitting form", async () => {
    const onUpdateMock = jest.fn();
    const { getByRole, user } = render(
      <EmployeeForm
        values={{ id: "1", name: "employee name example" }}
        onUpdate={onUpdateMock}
      />
    );

    await user.type(getByRole("textbox"), " updated");
    await user.click(getByRole("button"));
    expect(onUpdateMock).toBeCalledWith({
      id: "1",
      name: "employee name example updated",
    });
  });

  test("resets form after creating successfully", async () => {
    const { getByRole, user, rerender } = render(
      <EmployeeForm onCreate={() => {}} isSuccess={false} />
    );

    const input = getByRole("textbox");
    await user.type(input, "employee name example");
    rerender(<EmployeeForm onCreate={() => {}} isSuccess={true} />);

    expect((getByRole("textbox") as HTMLInputElement).value).toBe("");
  });

  test("show name required error after submitting form with empty name", async () => {
    const { getByText, getByRole, user } = render(
      <EmployeeForm onCreate={() => {}} isSuccess={false} />
    );

    await user.click(getByRole("button"));

    expect(getByText("This field is required")).toBeInTheDocument();
  });
});
