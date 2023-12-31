import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoggedIn: false,
  payload: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      if (!action || !action.payload) {
        return;
      }
      state.isLoggedIn = true;
      state.payload = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.payload = null;
      toast.error("🦄 you are out :) ");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
