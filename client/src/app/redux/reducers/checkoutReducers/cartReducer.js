import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ queryParams, userId }, { dispatch }) => {
    await axios.post(`/api/add-to-cart?${queryParams}`);
    dispatch(getCartProducts(`userId=${userId}`));
  }
);

export const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async (queryParams) => {
    try {
      const response = await axios.get(`/api/get-cart-products?${queryParams}`);
      const products = response.data.products;
      return products;
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateProductQantity = createAsyncThunk(
  "cart/updateProductQuantity",
  async (queryParams) => {
    console.log(queryParams);
    try {
      const response = await axios.put(`/api/update-quantity?${queryParams}`);
      const products = response.data.products;
      return products;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  "cart/deleteCartProduct",
  async (queryParams) => {
    try {
      await axios.delete(`/api/delete-cart-product?${queryParams}`);
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  cartProducts: [],
  shouldAdd: false,
  cartCount: 0,
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
    resetCart(state) {
      state.cartProducts = [];
      state.cartCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartProducts.fulfilled, (state, action) => {
      state.cartProducts = action.payload;
      state.cartCount = state.cartProducts.length;
    });
    builder.addCase(updateProductQantity.fulfilled, (state, action) => {
      state.cartProducts = action.payload;
    });
  },
});

// exporting states
export const cartItems = (state) => state.cartReducer.cartProducts;
export const itemStatus = (state) => state.cartReducer.shouldAdd;
export const itemCount = (state) => state.cartReducer.cartCount;

// exporting actions
export const { updateCartItemStatus, resetCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
