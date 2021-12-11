import { lazy, Suspense, useEffect } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@app/features/auth/auth";

import {
  PermissionEnum,
  setPermissions,
} from "./features/permissions/permissions";
import { useAppDispatch } from "./redux/store";

// Routes are lazy loaded so they will access to correct permissions
const Routes = lazy(() => import("./routes/Routes"));

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setPermissions(
        Object.values(PermissionEnum).filter(
          x =>
            // HACK: added here to play around with the permissions
            // permissions listed here will be removed from user's permissions
            ![PermissionEnum.USERS_DELETE].includes(x)
        )
      )
    );
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
