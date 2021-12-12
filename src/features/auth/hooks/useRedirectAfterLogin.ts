import { useEffect } from "react";

import qs from "query-string";
import { useHistory, useLocation } from "react-router-dom";

import { useAuth } from "@app/features/auth/auth";
import { RedirectDef } from "@app/types/route.types";

function useRedirectAfterLogin() {
  const history = useHistory();
  const location = useLocation<RedirectDef>();
  const { redirect } = qs.parse(location.search);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      history.push((redirect as string) ?? "/");
    }
  }, [redirect, history, accessToken]);
  return null;
}

export default useRedirectAfterLogin;
