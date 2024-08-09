import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    setAddresses(state, action) {
      state.addresses.push(action.payload);
    },
  },
});

// exporting reducers
export const { setAddresses } = accountSlice.actions;

// exporting states
export const allAddresses = (state) => state.accountReducer.addresses;

export const accountReducer = accountSlice.reducer;
