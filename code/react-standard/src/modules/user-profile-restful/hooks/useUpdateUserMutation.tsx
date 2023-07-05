import { useMutation } from "@tanstack/react-query";
import { http } from "@/utils/http";
import { User } from "../types/user";

const updateUser = async (payload: User) => {
  const response = await http.post<{ message: string }>(`/user/1`, payload);
  return response;
};
export function useUpdateUserMutation() {
  const { mutateAsync } = useMutation(updateUser, {
    onSuccess: ({ message }) => alert(message),
    onError: (error) => alert(error),
  });

  return mutateAsync;
}
