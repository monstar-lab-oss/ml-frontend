import { EmployeeForm } from "@/components/organisms/EmployeeForm";
import { http } from "@/utils/http";
import { Employee } from "@/types/employee";
import { useMutation } from "react-query";
import { useLocation } from "wouter";

type Payload = Omit<Employee, "id">;

const createEmployee = async (payload: Payload) => {
  const response = await http.post<{ message: string }>("/employee", payload);
  return response;
};

const EmployeeCreate = () => {
  const [, setLocation] = useLocation();
  const { mutateAsync, isSuccess } = useMutation(createEmployee, {
    onSuccess: ({ message }) => {
      alert(message);
      setLocation("/");
    },
    onError: (error) => alert(error),
  });

  return (
    <>
      <h3>Create Employee</h3>
      <EmployeeForm onCreate={mutateAsync} isSuccess={isSuccess} />
    </>
  );
};
export default EmployeeCreate;
