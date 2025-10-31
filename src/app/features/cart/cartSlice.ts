import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  type: "product" | "accessory"; // ✅ To identify type
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const loadCartFromStorage = (): CartState => {
  const saved = localStorage.getItem("cart");
  if (saved) return JSON.parse(saved);
  return { items: [], totalQuantity: 0, totalPrice: 0 };
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) =>
          item.id === action.payload.id && item.type === action.payload.type
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ id: number; type: "product" | "accessory" }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.type === action.payload.type)
      );

      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        type: "product" | "accessory";
        quantity: number;
      }>
    ) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id && i.type === action.payload.type
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }

      state.totalQuantity = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
