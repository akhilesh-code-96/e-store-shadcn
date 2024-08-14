import { configureStore } from "@reduxjs/toolkit";
import { headerReducer } from "./reducers/headerReducer";
import { accountReducer } from "./reducers/accountReducers/addressReducer";
import { cartReducer } from "./reducers/checkoutReducers/cartReducer";
import { orderReducer } from "./reducers/checkoutReducers/orderReducer";
import { userReducer } from "./reducers/userReducer/userReducers";

export const store = configureStore({
  reducer: {
    headerReducer,
    accountReducer,
    cartReducer,
    orderReducer,
    userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
