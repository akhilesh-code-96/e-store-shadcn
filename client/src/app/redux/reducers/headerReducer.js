import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const headerSlice = createSlice({
  name: "header",
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log(state.products);
      state.products = action.payload;
    },
  },
});

export const headerSelector = (state) => state.headerReducer.products;
export const headerReducer = headerSlice.reducer;
export const actions = headerSlice.actions;
