// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any; // Можно уточнить тип
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // загрузить из localStorage при инициализации
    loadUserFromStorage: (state) => {
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (userData && token) {
        state.user = JSON.parse(userData);
        state.token = token;
      }
    },
    // сохранить при логине
    loginSuccess: (
      state,
      action: PayloadAction<{ user: any; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    // при логауте
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loadUserFromStorage, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
