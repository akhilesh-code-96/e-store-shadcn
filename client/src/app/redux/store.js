import { configureStore } from "@reduxjs/toolkit";
import { headerReducer } from "./reducers/headerReducer";
import { accountReducer } from "./reducers/accountReducers/addressReducer";
import { cartReducer } from "./reducers/checkoutReducers/cartReducer";
import { orderReducer } from "./reducers/checkoutReducers/orderReducer";

export const store = configureStore({
  reducer: {
    headerReducer,
    accountReducer,
    cartReducer,
    orderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
