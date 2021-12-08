import { combineReducers } from "@reduxjs/toolkit";

import { authReducer, AUTH_FEATURE_KEY } from "@app/features/auth/auth";
import {
  permissionsReducer,
  PERMISSIONS_FEATURE_KEY,
} from "@app/features/permissions/permissions";

const rootReducer = combineReducers({
  [PERMISSIONS_FEATURE_KEY]: permissionsReducer,
  [AUTH_FEATURE_KEY]: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
