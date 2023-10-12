import { useMutation } from "@tanstack/react-query";
import { Employee as Payload } from "../types/employee";
import { http } from "@/utils/http";

const updateEmployee = async (payload: Payload) => {
  const { id, ...body } = payload;
  const response = await http.put<{ message: string }>(`/employee/${id}`, body);
  return response;
};

export function useUpdateEmployeeMutation() {
  const { mutateAsync } = useMutation(updateEmployee, {
    onSuccess: ({ message }) => alert(message),
    onError: (error) => alert(error),
  });
  return mutateAsync;
}
