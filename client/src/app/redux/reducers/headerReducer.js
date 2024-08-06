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
  status: "idle", // status of the async operation
  error: null,
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
      state.range = action.payload;
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

export const { toggleCategory, setRange } = headerSlice.actions;
export const selectRange = (state) => state.headerReducer.range;
export const selectProducts = (state) => state.headerReducer.products;
export const selectCategories = (state) => state.headerReducer.categories;
export const selectProductsStatus = (state) => state.headerReducer.status;
export const selectProductsError = (state) => state.headerReducer.error;

export const headerReducer = headerSlice.reducer;
