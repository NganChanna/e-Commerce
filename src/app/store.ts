import { configureStore } from "@reduxjs/toolkit";
import accessoriesReducer from "./features/accessories/accessoriesSlice";
import productsReducer from "./features/products/productSlice";

export const store = configureStore({
  reducer: {
    accessories: accessoriesReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
