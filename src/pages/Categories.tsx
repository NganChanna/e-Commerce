import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { fetchProduct } from "../app/features/products/productSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Categories = () => {
  const dispatch = useDispatch();
  const { data: products, loading } = useSelector(
    (state: RootState) => state.products
  );

  // Fetch product data if not loaded
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProduct());
    }
  }, [dispatch, products]);

  // Extract unique brands
  const brands = Array.from(new Set(products.map((p) => p.brand)));

  // Brand logos
  const brandLogos: Record<string, string> = {
    apple:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    samsung:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    vivo: "https://upload.wikimedia.org/wikipedia/commons/2/28/Vivo_logo.svg",
    oppo: "https://upload.wikimedia.org/wikipedia/commons/2/27/OPPO_Logo_2019.svg",
    xiaomi:
      "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg",
    huawei:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/Huawei_Standard_logo.svg",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-3">
            Categories
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Browse products by your favorite brand
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading categories...
          </p>
        )}

        {/* Brand Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
            >
              <Link to={`/products?brand=${brand}`}>
                <div className="flex flex-col items-center justify-center py-10 px-4">
                  <img
                    src={
                      brandLogos[brand.toLowerCase()] ||
                      "https://cdn-icons-png.flaticon.com/512/679/679720.png"
                    }
                    alt={brand}
                    className="w-20 h-20 object-contain mb-3 group-hover:scale-110 transition-transform"
                  />
                  <h3 className="font-semibold text-lg">{brand}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {products.filter((p) => p.brand === brand).length} products
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Fallback */}
        {!loading && brands.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
            No categories found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Categories;
