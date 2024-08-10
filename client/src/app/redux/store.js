import { configureStore } from "@reduxjs/toolkit";
import { headerReducer } from "./reducers/headerReducer";
import { accountReducer } from "./reducers/accountReducer";
import { cartReducer } from "./reducers/cartReducer";

export const store = configureStore({
  reducer: {
    headerReducer,
    accountReducer,
    cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
