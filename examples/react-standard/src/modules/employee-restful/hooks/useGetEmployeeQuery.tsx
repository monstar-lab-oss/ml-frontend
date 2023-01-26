import { http } from "@/utils/http";
import { Employee as Payload } from "../types/employee";
import { useQuery } from "@tanstack/react-query";

export function useGetEmployeeQuery(id: string) {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => http.get<Payload>(`/employee/${id}`),
  });
}
