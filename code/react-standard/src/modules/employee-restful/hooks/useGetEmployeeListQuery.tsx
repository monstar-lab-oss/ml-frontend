import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { Employee } from "../types/employee";

export function useGetEmployeeListQuery() {
  return useQuery({
    queryKey: ["userList"],
    queryFn: () => http.get<Employee[]>("/employee"),
  });
}
