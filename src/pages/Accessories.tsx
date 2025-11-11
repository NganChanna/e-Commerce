import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ShoppingCart, MoreVertical, Star } from "lucide-react";
import type { RootState, AppDispatch } from "@/app/store";
import { fetchAccessories } from "../app/features/accessories/accessoriesSlice";
import { useNavigate } from "react-router-dom";
import { AccessoryBanner } from "@/components";

const Accessories: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.accessories
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(fetchAccessories());
  }, [dispatch]);

  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-10 flex flex-col items-center">
      {/* Title */}
      <AccessoryBanner />

      {loading && (
        <p className="text-blue-400 font-medium text-lg">Loading...</p>
      )}
      {error && <p className="text-red-400 font-medium text-lg">{error}</p>}

      {/* Card Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mt-24">
        {paginatedData.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {item.brand}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star
                      className="text-yellow-400 fill-yellow-400"
                      size={16}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                  {item.description}
                </p>
                <button
                  onClick={() => navigate(`/accessories/${item.id}`)}
                  className="text-blue-600 dark:text-blue-400 text-sm mt-2 font-medium hover:underline"
                >
                  Show More
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ${item.price.toFixed(2)}
                </span>
                <div className="flex gap-3">
                  <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                    <ShoppingCart size={20} />
                  </button>
                  <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-3 mt-10">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition"
        >
          ◀ Previous
        </button>
        <span className="text-gray-500 dark:text-white font-semibold">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default Accessories;
