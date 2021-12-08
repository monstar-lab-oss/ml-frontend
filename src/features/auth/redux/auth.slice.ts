import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

import { AUTH_FEATURE_KEY } from "@app/features/auth/auth";

import { InitialStateDef, LoginResponseDef } from "../types/auth.types";

const initialState: InitialStateDef = {
  accessToken: null,
  error: false,
  loading: false,
};

const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState,
  reducers: {
    clearUser(state) {
      state.accessToken = null;
    },

    updateToken(state, action: PayloadAction<LoginResponseDef>) {
      const { token } = action.payload;
      state.accessToken = token;
    },
  },
});

export const { clearUser, updateToken } = authSlice.actions;

const authConfig = {
  key: AUTH_FEATURE_KEY,
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["accessToken"],
};
export const authReducer = persistReducer<ReturnType<typeof authSlice.reducer>>(
  authConfig,
  authSlice.reducer
);
