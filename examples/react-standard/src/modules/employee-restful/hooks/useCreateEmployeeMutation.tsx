import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { http } from "@/utils/http";
import { Employee } from "../types/employee";

type Payload = Omit<Employee, "id">;

const createEmployee = async (payload: Payload) => {
  const response = await http.post<{ message: string }>("/employee", payload);
  return response;
};

export function useCreateEmployeeMutation() {
  const [, setLocation] = useLocation();
  const { mutateAsync, isSuccess } = useMutation(createEmployee, {
    onSuccess: ({ message }) => {
      alert(message);
      setLocation("/");
    },
    onError: (error) => alert(error),
  });

  return { mutateAsync, isSuccess } as const;
}
