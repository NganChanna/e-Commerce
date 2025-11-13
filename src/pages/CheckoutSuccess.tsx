import { CheckCircle2, Home, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { clearCart, type CartItem } from "@/app/features/cart/cartSlice";
import { useEffect } from "react";
// import type { Product } from "@/types/Product"; s

const CheckoutSuccess = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  // Extract data sent from Checkout
  const { name, address, paymentMethod, totalPrice, totalQuantity, items } =
    state || {};

  // 🧹 Clear cart after success
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 max-w-lg w-full"
      >
        {/* ✅ Success Icon */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="rounded-full bg-blue-100 dark:bg-blue-900 p-4 mb-6"
          >
            <CheckCircle2 className="w-16 h-16 text-blue-600 dark:text-blue-400" />
          </motion.div>

          <h1 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 text-center">
            Payment Successful 🎉
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Thank you,{" "}
            <span className="font-semibold">{name || "Customer"}</span>! Your
            order has been confirmed and will be shipped soon.
          </p>
        </div>
        {/* 🧾 Billing Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 mb-8 border border-gray-200 dark:border-gray-700 shadow-inner"
        >
          <h2 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
            Billing Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Name:</span>
              <span className="font-medium">{name || "N/A"}</span>
            </div>

            <div className="flex justify-between">
              <span>Address:</span>
              <span className="font-medium text-right max-w-[60%] truncate">
                {address || "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span className="font-medium">{paymentMethod || "N/A"}</span>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-700 my-3"></div>

            <div className="flex justify-between text-base font-semibold">
              <span>Total Items:</span>
              <span>{totalQuantity || 0}</span>
            </div>

            <div className="flex justify-between text-lg font-bold text-blue-600 dark:text-blue-400">
              <span>Total Paid:</span>
              <span>${totalPrice?.toFixed(2) || "0.00"}</span>
            </div>
          </div>
        </motion.div>
        {/* 🛍️ Purchased Items */}
        {items && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-8 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Purchased Items:
            </h3>
            <ul className="space-y-1 text-sm max-h-40 overflow-y-auto">
              {items.map((item: CartItem) => (
                <li
                  key={item.id}
                  className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row w-full gap-4 mt-8">
          <Link
            to="/products"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-transform hover:scale-105 shadow-md"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 rounded-xl font-semibold transition-transform hover:scale-105 shadow-md"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;
