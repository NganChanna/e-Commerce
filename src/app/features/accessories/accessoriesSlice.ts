import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Accessory } from "../../../types/Accessory";
import { initialAccessoryState } from "../../../types/Accessory";

// Example async thunk to fetch data.json
export const fetchAccessories = createAsyncThunk<Accessory[]>(
  "accessories/fetchAccessories",
  async () => {
    const response = await fetch("/accessories.json");
    if (!response.ok) throw new Error("Failed to fetch data");
    return (await response.json()) as Accessory[];
  }
);

const accessoriesSlice = createSlice({
  name: "accessories",
  initialState: initialAccessoryState, // ✅ imported from types folder
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccessories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAccessories.fulfilled,
        (state, action: PayloadAction<Accessory[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAccessories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default accessoriesSlice.reducer;
