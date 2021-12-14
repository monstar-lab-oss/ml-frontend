import { useCallback } from "react";

import { useAuth } from "@app/features/auth/auth";

export default function useLogout() {
  const { handleLogout } = useAuth();

  const logout = useCallback(() => {
    handleLogout();
  }, [handleLogout]);

  return {
    logout,
  };
}
