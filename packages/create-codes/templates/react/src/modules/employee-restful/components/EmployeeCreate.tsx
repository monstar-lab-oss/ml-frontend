import { EmployeeForm } from "./EmployeeForm";
import { useCreateEmployeeMutation } from "../hooks/useCreateEmployeeMutation";

export const EmployeeCreate = () => {
  const { mutateAsync, isSuccess } = useCreateEmployeeMutation();

  return (
    <>
      <h3 data-testid="employee-create-title">Create Employee</h3>
      <EmployeeForm onCreate={mutateAsync} isSuccess={isSuccess} />
    </>
  );
};
