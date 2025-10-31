import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/app/features/cart/cartSlice";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const { items, totalPrice, totalQuantity } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();

  const handleQuantityChange = (
    id: number,
    type: "product" | "accessory",
    newQty: number
  ) => {
    dispatch(updateQuantity({ id, type, quantity: newQty }));
  };

  const handleRemove = (id: number, type: "product" | "accessory") => {
    dispatch(removeFromCart({ id, type }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <ShoppingBag className="w-16 h-16 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          to="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-transform hover:scale-105"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center text-blue-600 dark:text-blue-400">
          Your Shopping Cart
        </h1>

        {/* Cart Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
            {items.map((item) => (
              <motion.div
                key={`${item.type}-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.brand} •{" "}
                    {item.type === "product" ? "Product" : "Accessory"}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        item.type,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-lg font-medium w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        item.type,
                        item.quantity + 1
                      )
                    }
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => handleRemove(item.id, item.type)}
                  className="ml-4 text-red-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}

            <button
              onClick={() => dispatch(clearCart())}
              className="mt-6 text-sm text-red-500 hover:text-red-600 font-semibold"
            >
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Items:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal:
                </span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t border-gray-300 dark:border-gray-700 pt-2">
                <span>Total:</span>
                <span className="text-blue-600 dark:text-blue-400">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-transform hover:scale-105">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
