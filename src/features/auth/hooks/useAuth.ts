import { useContext } from "react";

import { AuthContext } from "@app/features/auth/auth";

export default function useAuth() {
  return useContext(AuthContext);
}
