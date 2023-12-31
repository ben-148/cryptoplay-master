import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  coinsData: [],
};

// Define an async thunk
export const getPortfolio = () => async (dispatch) => {
  try {
    const response = await axios.get("/users/user/info");
    if (!response.data) {
      return;
    }

    const { amount, portfolio } = response.data;
    dispatch(portActions.update({ usdt: amount, portfolio }));
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    // You can dispatch an action here to handle the error if needed
    toast.error("Failed to fetch portfolio data");
  }
};

const portSlice = createSlice({
  name: "port",
  initialState,
  reducers: {
    update(state, action) {
      if (!action.payload || !action.payload.portfolio) {
        return;
      }
      state.usdt = action.payload.usdt;
      state.portfolio = action.payload.portfolio;
    },
  },
});

export const portActions = portSlice.actions;

export default portSlice.reducer;
