import { useMemo } from "react";

import { UserResponseDef, User } from "@app/features/user/user";
import useQuery from "@app/hooks/useQuery";

export default function useUserQuery(id: number) {
  const query = useQuery<UserResponseDef>(`/user/${id}`);
  const { data } = query;

  const user = useMemo<User | undefined>(() => {
    if (!data) {
      return undefined;
    }

    return {
      ...data.data,
      name: `${data.data.first_name} ${data.data.last_name}`,
    };
  }, [data]);

  return {
    ...query,
    user,
  };
}
