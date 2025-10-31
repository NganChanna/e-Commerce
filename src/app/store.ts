import { configureStore } from "@reduxjs/toolkit";
import accessoriesReducer from "./features/accessories/accessoriesSlice";
import productsReducer from "./features/products/productSlice";
import cartSlice from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    accessories: accessoriesReducer,
    products: productsReducer,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
