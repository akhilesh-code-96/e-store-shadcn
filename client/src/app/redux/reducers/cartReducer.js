import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (queryParams) => {
    await axios.post(`/api/add-to-cart?${queryParams}`);
  }
);

export const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async (queryParams) => {
    const response = await axios.get(`/api/get-cart-products?${queryParams}`);
    const products = response.data.products;
    console.log("Reducer Prod", products);
    return products;
  }
);

const initialState = {
  cartProducts: [],
  shouldAdd: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    updateCartItemStatus(state, action) {
      const id = action.payload;
      const itemExist = state.cartProducts.find(
        (item) => item.productId === id
      );
      if (!itemExist) {
        state.shouldAdd = true;
      } else {
        state.shouldAdd = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartProducts.fulfilled, (state, action) => {
      state.cartProducts = action.payload;
    });
  },
});

// exporting states
export const cartItems = (state) => state.cartReducer.cartProducts;
export const itemStatus = (state) => state.cartReducer.shouldAdd;

// exporting actions
export const { updateCartItemStatus } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
