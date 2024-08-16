import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "header/fetchProducts",
  async (queryParams) => {
    const response = await axios.get(`/api/get-products?${queryParams}`);
    return response.data.products;
  }
);

const initialState = {
  products: [],
  categories: [],
  range: 0,
  status: "idle",
  error: null,
  initialiMaxPrice: null,
  initialiMinPrice: null,
};

const headerSlice = createSlice({
  name: "header",
  initialState: initialState,
  reducers: {
    toggleCategory(state, action) {
      const category = action.payload;
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter((item) => item !== category);
      } else {
        state.categories.push(category);
      }
    },
    setRange(state, action) {
      let newRange = action.payload;
      state.range = newRange;
    },
    setInitialMaxPrice(state, action) {
      const products = action.payload;
      let max = Number.MIN_SAFE_INTEGER;
      for (const obj of products) {
        let price = obj.price;
        max = Math.max(price, max);
      }
      state.initialiMaxPrice = Math.floor(max * 84);
    },
    setInitialMinPrice(state, action) {
      const products = action.payload;
      let min = Number.MAX_SAFE_INTEGER;
      for (const obj of products) {
        let price = obj.price;
        min = Math.min(price, min);
      }
      state.initialiMinPrice = Math.floor(min * 84);
    },
    clearFilters(state) {
      state.categories = [];
      state.range = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  toggleCategory,
  setRange,
  setInitialMaxPrice,
  setInitialMinPrice,
  clearFilters,
} = headerSlice.actions;
export const minPrice = (state) => state.headerReducer.initialiMinPrice;
export const maxPrice = (state) => state.headerReducer.initialiMaxPrice;
export const selectRange = (state) => state.headerReducer.range;
export const selectProducts = (state) => state.headerReducer.products;
export const selectCategories = (state) => state.headerReducer.categories;
export const selectProductsStatus = (state) => state.headerReducer.status;
export const selectProductsError = (state) => state.headerReducer.error;

export const headerReducer = headerSlice.reducer;
