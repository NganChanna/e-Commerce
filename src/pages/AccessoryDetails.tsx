import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import type { RootState } from "../app/store";

const AccessoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const accessory = useSelector((state: RootState) =>
    state.accessories.data.find((item) => item.id === Number(id))
  );

  if (!accessory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <h2 className="text-3xl font-semibold mb-4">Accessory Not Found 😢</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-5 py-2 rounded-xl transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-10 px-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Image Section */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4"
        >
          <img
            src={accessory.image}
            alt={accessory.name}
            className="w-full h-96  rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Details Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">
              {accessory.name}
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
              {accessory.brand} — {accessory.type}
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {accessory.description}
            </p>

            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>
                <span className="font-semibold">Color:</span> {accessory.color}
              </p>
              <p>
                <span className="font-semibold">Warranty:</span>{" "}
                {accessory.warranty}
              </p>
              <p>
                <span className="font-semibold">Compatibility:</span>{" "}
                {accessory.compatibility.join(", ")}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ${accessory.price.toFixed(2)}
              </span>
              <span
                className={`text-sm font-medium ${
                  accessory.stock > 0
                    ? "text-green-500 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {accessory.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors duration-300"
              >
                🛒 Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 py-3 rounded-xl font-semibold transition-colors duration-300"
              >
                ← Back
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccessoryDetails;
