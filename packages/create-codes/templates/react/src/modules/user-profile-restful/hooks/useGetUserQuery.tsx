import { useQuery } from "@tanstack/react-query";
import { http } from "@/utils/http";
import { User } from "../types/user";

export function useGetUserQuery({ id }: { id: string }) {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => http.get<User>(`/user/${id}`),
  });
}
