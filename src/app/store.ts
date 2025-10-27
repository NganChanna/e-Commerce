import { configureStore } from "@reduxjs/toolkit";
import accessoriesReducer from "./features/accessories/accessoriesSlice";

export const store = configureStore({
  reducer: {
    accessories: accessoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
