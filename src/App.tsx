import { lazy, Suspense, useEffect } from "react";

import { BrowserRouter } from "react-router-dom";

import {
  PermissionEnum,
  setPermissions,
} from "./features/permissions/permissions";
import { useAppDispatch } from "./redux/store";

// Routes are lazy loaded so they will access to correct permissions
const Routes = lazy(() => import("./routes/Routes"));

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
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
