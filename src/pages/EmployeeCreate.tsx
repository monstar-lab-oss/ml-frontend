import { EmployeeForm } from "@/components/organisms/EmployeeForm";
import { http } from "@/utils/http";
import { Employee } from "@/types/employee";
import { useMutation } from "react-query";

type Payload = Omit<Employee, "id">;

const createEmployee = async (payload: Payload) => {
  const response = await http.post<{ message: string }>("/employee", payload);
  return response;
};

const EmployeeCreate = () => {
  const { mutateAsync, isSuccess } = useMutation(createEmployee, {
    onSuccess: ({ message }) => alert(message),
    onError: (error) => alert(error),
  });

  return <EmployeeForm onCreate={mutateAsync} isSuccess={isSuccess} />;
};
export default EmployeeCreate;
