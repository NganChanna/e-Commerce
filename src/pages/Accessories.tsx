import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { fetchAccessories } from "../app/features/accessories/accessoriesSlice";

const Accessories: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.accessories
  );
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    dispatch(fetchAccessories());
  }, [dispatch]);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 px-4 py-2 rounded-xl bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors duration-300"
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
        🛍️ Accessories Store
      </h1>

      {loading && (
        <div className="text-center text-blue-500 dark:text-blue-400 text-lg font-medium">
          Loading accessories...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 dark:text-red-400 text-lg font-medium">
          Error: {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {item.brand}
              </p>

              <div className="flex items-center justify-between mt-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                  ${item.price.toFixed(2)}
                </span>
                <span
                  className={`text-sm font-medium ${
                    item.stock > 0
                      ? "text-green-500 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                  }`}
                >
                  {item.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <button className="mt-4 w-full bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white py-2 rounded-xl transition-colors duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accessories;
