import { createSlice } from "@reduxjs/toolkit";

import { USER_FEATURE_KEY } from "../constants/user.keys";

const initialState = {};

const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState,
  reducers: {},
});

export const userReducer = userSlice.reducer;
