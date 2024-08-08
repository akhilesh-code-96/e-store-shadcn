import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "header/fetchProducts",
  async (queryParams) => {
    const response = await axios.get(`/api/get-products?${queryParams}`);
    return response.data.products;
  }
);

export const updateProductQuantity = createAsyncThunk(
  "header/updateProductQuantity",
  async (queryParams) => {
    const response = await axios.put(`/api/update-quantity?${queryParams}`);
    return response.data.product;
  }
);

// localStorage.clear();
// Initialize cartProducts from localStorage with error handling
const loadCartProducts = () => {
  try {
    const storedData = localStorage.getItem("cartProducts");
    if (!storedData) {
      localStorage.setItem("cartProducts", JSON.stringify([]));
      return [];
    } else {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error("Failed to parse cartProducts from localStorage", error);
    return [];
  }
};

const initialState = {
  products: [],
  cartProduct: {},
  categories: [],
  range: 0,
  status: "idle",
  error: null,
  initialiMaxPrice: null,
  initialiMinPrice: null,
  itemAdded: false,
  cartCount: loadCartProducts().length,
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
    resetItemCartStatus(state, action) {
      state.itemAdded = false;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      let storedCartProducts =
        JSON.parse(localStorage.getItem("cartProducts")) || [];
      console.log("Stored Item", storedCartProducts);
      const itemExists = storedCartProducts.find(
        (item) => item._id === newItem._id
      );

      if (!itemExists) {
        // Add the new item to the cart
        // Clone the newItem object and add the quantity property
        const itemToAdd = { ...newItem, quantity: 1 };
        storedCartProducts.push(itemToAdd);
        state.itemAdded = false;
        // Update localStorage with new cartProducts
        try {
          localStorage.setItem(
            "cartProducts",
            JSON.stringify(storedCartProducts)
          );

          // Update state with cartCount based on localStorage
          state.cartCount = storedCartProducts.length;
        } catch (error) {
          console.error("Failed to update cartProducts in localStorage", error);
        }
      } else {
        // If item exists, no changes needed for cartProducts
        state.itemAdded = true;
        state.cartCount = storedCartProducts.length;
      }
    },
    updateDeletedCartCount(state, action) {
      state.cartCount -= 1;
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
    builder.addCase(updateProductQuantity.fulfilled, (state, action) => {
      state.status = "succedded";
      state.cartProduct = action.payload;
    });
  },
});

export const {
  toggleCategory,
  setRange,
  setInitialMaxPrice,
  setInitialMinPrice,
  addToCart,
  resetItemCartStatus,
  updateDeletedCartCount,
} = headerSlice.actions;
export const minPrice = (state) => state.headerReducer.initialiMinPrice;
export const maxPrice = (state) => state.headerReducer.initialiMaxPrice;
export const cartValue = (state) => state.headerReducer.cartCount;
export const selectRange = (state) => state.headerReducer.range;
export const selectProducts = (state) => state.headerReducer.products;
export const selectCategories = (state) => state.headerReducer.categories;
export const selectProductsStatus = (state) => state.headerReducer.status;
export const selectProductsError = (state) => state.headerReducer.error;
export const itemInCartStatus = (state) => state.headerReducer.itemAdded;
export const updatedProduct = (state) => state.headerReducer.cartProduct;

export const headerReducer = headerSlice.reducer;
