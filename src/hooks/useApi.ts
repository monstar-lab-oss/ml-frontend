import { useContext } from "react";

import { ApiContext } from "@app/contexts/ApiContext";

export default function useAuth() {
  return useContext(ApiContext);
}
