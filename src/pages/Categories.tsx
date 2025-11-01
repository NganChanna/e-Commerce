import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchProduct } from "../app/features/products/productSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Filter, Search } from "lucide-react";
import { CategoryBanner } from "@/components";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { data: products, loading } = useAppSelector((state) => state.products);

  // ✅ Fetch product data when page loads
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProduct());
    }
  }, [dispatch, products]);

  // 🧩 Filters state
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedRam, setSelectedRam] = useState("All");
  const [selectedStorage, setSelectedStorage] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // 🔍 Extract unique filter values
  const brands = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.brand)))],
    [products]
  );
  const rams = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.ram)))],
    [products]
  );
  const storages = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.storage)))],
    [products]
  );

  // ⚙️ Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      return (
        (selectedBrand === "All" || p.brand === selectedBrand) &&
        (selectedRam === "All" || p.ram === selectedRam) &&
        (selectedStorage === "All" || p.storage === selectedStorage) &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [products, selectedBrand, selectedRam, selectedStorage, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <CategoryBanner />
        </div>
        {/* 🏷️ Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-3">
            Explore Categories
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sort and filter by brand, RAM, or storage
          </p>
        </div>

        {/* 🎛️ Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-10 items-center">
          <div className="flex items-center gap-2">
            <Filter className="text-blue-500" size={18} />
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <select
            value={selectedRam}
            onChange={(e) => setSelectedRam(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm"
          >
            {rams.map((ram) => (
              <option key={ram} value={ram}>
                {ram}
              </option>
            ))}
          </select>

          <select
            value={selectedStorage}
            onChange={(e) => setSelectedStorage(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm"
          >
            {storages.map((storage) => (
              <option key={storage} value={storage}>
                {storage}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* 🌀 Loading */}
        {loading && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Loading products...
          </div>
        )}

        {/* 📱 Filtered Products */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {filteredProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-3xl overflow-hidden shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {p.brand}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-all duration-300">
                  <Link
                    to={`/products/${p.id}`}
                    className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-600 hover:text-white transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1 truncate group-hover:text-blue-600 transition">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {p.ram} / {p.storage}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    ${p.price}
                  </p>
                  <p className="text-sm text-gray-400">⭐ {p.rating ?? 4.5}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* 🚫 No Results */}
        {!loading && filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
            No products match your filters 😢
          </p>
        )}
      </div>
    </div>
  );
};

export default Categories;
