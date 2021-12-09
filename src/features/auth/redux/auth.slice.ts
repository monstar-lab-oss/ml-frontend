import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

import { AUTH_FEATURE_KEY } from "../constants/auth.keys";
import { InitialStateDef } from "../types/auth.types";
import { authApi } from "./auth.api";

const initialState: InitialStateDef = {
  accessToken: null,
};

const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState,
  reducers: {
    clearUser(state) {
      state.accessToken = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.postLogin.matchFulfilled,
      (state, action) => {
        const { token } = action.payload;

        state.accessToken = token;
      }
    );
  },
});

export const { clearUser } = authSlice.actions;

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
