import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { http } from "@/utils/http";
import { Employee as Payload } from "../types/employee";

const removeEmployee = async (id: Payload["id"]) => {
  const response = await http.delete<{ message: string }>(`/employee/${id}`);
  return response;
};

export function useRemoveEmployeeMutation() {
  const [, setLocation] = useLocation();
  const { mutate } = useMutation(removeEmployee, {
    onSuccess: ({ message }) => {
      alert(message);
      setLocation("/");
    },
    onError: (error) => alert(error),
  });
  return mutate;
}
