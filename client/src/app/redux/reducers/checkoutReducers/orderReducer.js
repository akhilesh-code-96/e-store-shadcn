import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (queryParams) => {
    await axios.post(`/api/place-order?${queryParams}`);
  }
);

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (queryParams) => {
    const response = await axios.get(`/api/get-orders?${queryParams}`);
    const orders = response.data.orders;
    return orders;
  }
);

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  extraReducers: (buider) => {
    buider.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

// exporting actions

// exporting states
export const allOrders = (state) => state.orderReducer.orders;

// export reducer
export const orderReducer = orderSlice.reducer;
