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
    const count = response.data.count;
    return { orders, count };
  }
);

const initialState = {
  orders: [],
  count: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  extraReducers: (buider) => {
    buider.addCase(getOrders.fulfilled, (state, action) => {
      const { orders, count } = action.payload;
      state.orders = orders;
      state.count = count;
    });
  },
});

// exporting actions

// exporting states
export const allOrders = (state) => state.orderReducer.orders;
export const totalCount = (state) => state.orderReducer.count;

// export reducer
export const orderReducer = orderSlice.reducer;
