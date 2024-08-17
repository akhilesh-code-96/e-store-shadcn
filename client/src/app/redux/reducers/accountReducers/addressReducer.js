import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addAddress = createAsyncThunk(
  "account/addAddress",
  async ({ queryParams, data }) => {
    await axios.post(`${BASE_URL}/api/add-address?${queryParams}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  }
);

export const getAddresses = createAsyncThunk(
  "account/getAddresses",
  async (queryParams) => {
    const response = await axios.get(
      `${BASE_URL}/api/get-addresses?${queryParams}`
    );
    const addresses = response.data.addresses;
    return addresses;
  }
);

const initialState = {
  addresses: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getAddresses.fulfilled, (state, action) => {
      console.log("Reducer address", action.payload);
      state.addresses = action.payload;
    });
  },
});

// exporting reducers
export const { setAddresses } = accountSlice.actions;

// exporting states
export const allAddresses = (state) => state.accountReducer.addresses;

export const accountReducer = accountSlice.reducer;
