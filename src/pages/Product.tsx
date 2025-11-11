import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Star, ShoppingCart, MoreVertical } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import type { RootState, AppDispatch } from "@/app/store";
import { fetchProduct } from "@/app/features/products/productSlice";
import { ProductBanner } from "@/components";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  // ✅ Get brand from URL
  const queryParams = new URLSearchParams(location.search);
  const selectedBrand = queryParams.get("brand");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchProduct());
    }
  }, [dispatch, data]);

  // ✅ Filter by brand if brand param exists
  const filteredData = useMemo(() => {
    if (selectedBrand) {
      return data.filter(
        (product) => product.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }
    return data;
  }, [data, selectedBrand]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedProducts = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-10">
      <div className="mb-16">
        <ProductBanner />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-10">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
          {selectedBrand ? `${selectedBrand} Phones` : "Smartphone Collection"}
        </h1>

        {selectedBrand && (
          <button
            onClick={() => navigate("/products")}
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            ← Show All Products
          </button>
        )}
      </div>

      {/* Loading & Error */}
      {loading && (
        <p className="text-center text-blue-500 font-medium text-lg">
          Loading products...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 font-medium text-lg">{error}</p>
      )}

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {paginatedProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all flex flex-col justify-between"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-2">
                  {product.brand}
                </p>

                <div className="flex items-center gap-1 mb-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={16} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {product.rating} ({product.review})
                  </span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                  {product.description}
                </p>

                <button
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                >
                  View Details
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
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
      {filteredData.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          {/* Previous */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
            } transition`}
          >
            ◀ Prev
          </button>

          {/* Numbered Pages */}
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-2 rounded-lg font-medium transition ${
                currentPage === i + 1
                  ? "bg-blue-600 dark:bg-blue-700 text-white"
                  : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
            } transition`}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
