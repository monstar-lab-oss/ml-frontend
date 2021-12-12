import { combineReducers } from "@reduxjs/toolkit";

// TODO: Maybe switch to Context for permissions
import {
  permissionsReducer,
  PERMISSIONS_FEATURE_KEY,
} from "@app/features/permissions/permissions";

const rootReducer = combineReducers({
  [PERMISSIONS_FEATURE_KEY]: permissionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
