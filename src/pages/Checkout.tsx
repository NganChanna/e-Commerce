import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "@/app/store";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, totalQuantity } = useSelector(
    (state: RootState) => state.cart
  );

  const handleBack = () => navigate(-1);

  const handlePlaceOrder = () => {
    navigate("/checkoutsuccess");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* 🔙 Back */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-8 hover:underline hover:scale-105 transition-transform"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </button>

        <h1 className="text-3xl font-bold text-center mb-10 text-blue-600 dark:text-blue-400">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* 🧾 Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
              Order Summary
            </h2>
            {items.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="flex items-center justify-between mb-4"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.brand} • {item.type}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    x{item.quantity}
                  </p>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t border-gray-300 dark:border-gray-700 pt-3 mt-4">
              <div className="flex justify-between mb-2">
                <span>Items:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-blue-600 dark:text-blue-400">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* 💳 Shipping & Payment */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">
              Shipping & Payment
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePlaceOrder();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Payment Method
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Credit Card</option>
                  <option>Cash on Delivery</option>
                  <option>PayPal</option>
                </select>
              </div>

              <Link to="/checkoutsuccess">
                <button
                  type="submit"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePlaceOrder();
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} />
                  Place Order
                </button>
              </Link>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
