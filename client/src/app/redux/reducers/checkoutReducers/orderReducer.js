import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (queryParams) => {
    await axios.post(`${BASE_URL}/api/place-order?${queryParams}`);
  }
);

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (queryParams) => {
    const response = await axios.get(
      `${BASE_URL}/api/get-orders?${queryParams}`
    );
    const orders = response.data.orders;
    const count = response.data.count;
    const totalPages = response.data.totalPages;
    return { orders, count, totalPages };
  }
);

export const getReorder = createAsyncThunk(
  "order/getReorder",
  async (queryParams) => {
    const response = await axios.get(
      `${BASE_URL}/api/get-orders?${queryParams}`
    );
    const order = response.data.orders;
    return order;
  }
);

export const getDailySales = createAsyncThunk(
  "order/getDailySales",
  async (queryParams) => {
    const response = await axios.get(
      `${BASE_URL}/api/daily-sales?${queryParams}`
    );
    const sales = response.data.dailySales;
    return sales;
  }
);

export const getCategory = createAsyncThunk(
  "order/getCategory",
  async (queryParams) => {
    const response = await axios.get(
      `${BASE_URL}/api/category-sales?${queryParams}`
    );
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
  checkoutOrder: [],
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
    builder.addCase(getReorder.fulfilled, (state, action) => {
      state.checkoutOrder = action.payload;
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
export const reorder = (state) => state.orderReducer.checkoutOrder;

// export reducer
export const orderReducer = orderSlice.reducer;
