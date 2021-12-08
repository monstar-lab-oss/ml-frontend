import { createSlice } from "@reduxjs/toolkit";

import { AUTH_FEATURE_KEY } from "@app/features/auth/auth";

import { clearTokens } from "../helpers/auth.helpers";
import { InitialStateDef } from "../types/auth.types";

const initialState: InitialStateDef = {
  user: null,
  isAuthenticated: false,
  error: false,
  loading: false,
};

const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      clearTokens();
    },
  },
  extraReducers: () => {
    //
  },
});

export const { clearUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
