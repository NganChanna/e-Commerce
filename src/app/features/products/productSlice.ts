import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Product } from "@/types/Product";
import { initialProductState } from "@/types/Product";

export const fetchProduct = createAsyncThunk<Product[]>(
  "products/fetchProduct",
  async () => {
    const response = await fetch("/products.json");
    if (!response.ok) throw new Error("Failed to fetch data");
    return (await response.json()) as Product[];
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialProductState, // ✅ imported from types folder
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProduct.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default productSlice.reducer;
