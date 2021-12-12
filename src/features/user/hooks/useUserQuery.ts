import { useMemo } from "react";

import { UserResponseDef, User } from "@app/features/user/user";
import useQuery from "@app/hooks/useQuery";

export default function useUserQuery(id: number, isQueryEnabled = true) {
  // TODO: Declare constant for user endpoint
  const query = useQuery<UserResponseDef>(`/users/${id}`, {
    enabled: isQueryEnabled,
  });
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
