import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/app/features/cart/cartSlice";
import { useEffect } from "react";
import type { RootState } from "@/app/store";

const CheckoutSuccess = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full mb-8 p-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-inner"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
            Billing Summary
          </h2>
          <ul className="mb-4 max-h-40 overflow-y-auto">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between text-gray-700 dark:text-gray-300 mb-2"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold text-gray-900 dark:text-gray-100 border-t pt-2">
            <span>Total Items:</span>
            <span>{cart.totalQuantity}</span>
          </div>
          <div className="flex justify-between font-bold text-blue-600 dark:text-blue-400 text-lg mt-1">
            <span>Total Price:</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8 rounded-full bg-gradient-to-tr from-blue-400 via-indigo-500 to-purple-500 p-1 shadow-lg"
        >
          <div className="bg-white dark:bg-gray-900 rounded-full p-6 flex items-center justify-center">
            <CheckCircle className="w-24 h-24 text-blue-500" />
          </div>
          <div className="absolute inset-0 rounded-full blur-xl opacity-60 bg-gradient-to-tr from-blue-400 via-indigo-500 to-purple-500"></div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 text-center"
        >
          Payment Successful 🎉
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-gray-600 dark:text-gray-300 mb-10 text-center"
        >
          Thank you for your order! Your payment has been processed and your
          items are being prepared.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex gap-4 w-full justify-center"
        >
          <Link
            to="/products"
            className="flex-1 bg-blue-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold text-center transition-transform hover:scale-105"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="flex-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 rounded-xl font-semibold text-center transition-transform hover:scale-105"
          >
            Go Home
          </Link>
        </motion.div>
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 opacity-20 blur-3xl animate-animateGlow pointer-events-none"></div>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;
