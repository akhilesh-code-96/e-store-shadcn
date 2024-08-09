import { configureStore } from "@reduxjs/toolkit";
import { headerReducer } from "./reducers/headerReducer";
import { accountReducer } from "./reducers/accountReducer";

export const store = configureStore({
  reducer: {
    headerReducer,
    accountReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
