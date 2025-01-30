// redux/features/userSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    userData: { email: string; username: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        userData
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data || "Registration failed"
      );
    }
  }
);

interface UserState {
  user: null | object;
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const userReducer = userSlice.reducer;
