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
    const totalPages = response.data.totalPages;
    return { orders, count, totalPages };
  }
);

export const getDailySales = createAsyncThunk(
  "order/getDailySales",
  async (queryParams) => {
    const response = await axios.get(`/api/daily-sales?${queryParams}`);
    const sales = response.data.dailySales;
    return sales;
  }
);

export const getCategory = createAsyncThunk(
  "order/getCategory",
  async (queryParams) => {
    const response = await axios.get(`/api/category-sales?${queryParams}`);
    const orders = response.data.categorySales;
    return orders;
  }
);

const initialState = {
  orders: [],
  count: 0,
  totalPages: 0,
  aggregatedSales: [],
  aggregatedCategory: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      const { orders, count, totalPages } = action.payload;
      state.orders = orders;
      state.count = count;
      state.totalPages = totalPages;
    });
    builder.addCase(getDailySales.fulfilled, (state, action) => {
      state.aggregatedSales = action.payload;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.aggregatedCategory = action.payload;
    });
  },
});

// exporting actions

// exporting states
export const allOrders = (state) => state.orderReducer.orders;
export const agSales = (state) => state.orderReducer.aggregatedSales;
export const agCategory = (state) => state.orderReducer.aggregatedCategory;
export const totalCounts = (state) => state.orderReducer.count;
export const allPages = (state) => state.orderReducer.totalPages;

// export reducer
export const orderReducer = orderSlice.reducer;
