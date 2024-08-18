import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async ({ queryParams, data }) => {
    try {
      await axios.post(`${BASE_URL}/api/add-address?${queryParams}`, data, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAddresses = createAsyncThunk(
  "address/getAddresses",
  async (queryParams) => {
    const response = await axios.get(
      `${BASE_URL}/api/get-addresses?${queryParams}`
    );
    const addresses = response.data.addresses;
    return addresses;
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ queryParams, data }) => {
    try {
      await axios.put(`${BASE_URL}/api/update-address?${queryParams}`, data);
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (queryParams) => {
    try {
      await axios.delete(`${BASE_URL}/api/delete-address?${queryParams}`);
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  addresses: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getAddresses.fulfilled, (state, action) => {
      state.addresses = action.payload;
    });
  },
});

// exporting reducers
export const { setAddresses } = addressSlice.actions;

// exporting states
export const allAddresses = (state) => state.addressReducer.addresses;

export const addressReducer = addressSlice.reducer;
