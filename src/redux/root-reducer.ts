import { combineReducers } from "@reduxjs/toolkit";

import { authReducer, AUTH_FEATURE_KEY } from "@app/features/auth/auth";
import {
  permissionsReducer,
  PERMISSIONS_FEATURE_KEY,
} from "@app/features/permissions/permissions";
import { userApi } from "@app/features/user/user";

import { authApi } from "../features/auth/redux/auth.api";

const rootReducer = combineReducers({
  [PERMISSIONS_FEATURE_KEY]: permissionsReducer,
  [AUTH_FEATURE_KEY]: authReducer,

  // API reducer
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
