import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchProduct } from "../app/features/products/productSlice";
import { fetchAccessories } from "@/app/features/accessories/accessoriesSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Filter, Search, Layers } from "lucide-react";
import { CategoryBanner } from "@/components";
import type { Product } from "@/types/Product";
import type { Accessory } from "@/types/Accessory";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { data: products, loading: loadingProducts } = useAppSelector(
    (state) => state.products
  );
  const { data: accessories, loading: loadingAccessories } = useAppSelector(
    (state) => state.accessories
  );

  // Fetch both when page loads
  useEffect(() => {
    if (products.length === 0) dispatch(fetchProduct());
    if (accessories.length === 0) dispatch(fetchAccessories());
  }, [dispatch, products, accessories]);

  // 🧩 Filters state
  const [selectedType, setSelectedType] = useState<"product" | "accessory">(
    "product"
  );
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedRam, setSelectedRam] = useState("All");
  const [selectedStorage, setSelectedStorage] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Pick data based on type
  const currentData = selectedType === "product" ? products : accessories;
  const loading =
    selectedType === "product" ? loadingProducts : loadingAccessories;

  // Unique filters
  const brands = useMemo(
    () => ["All", ...Array.from(new Set(currentData.map((p) => p.brand)))],
    [currentData]
  );
  const rams = useMemo(
    () =>
      selectedType === "product"
        ? ["All", ...Array.from(new Set(products.map((p) => p.ram)))]
        : [],
    [products, selectedType]
  );
  const storages = useMemo(
    () =>
      selectedType === "product"
        ? ["All", ...Array.from(new Set(products.map((p) => p.storage)))]
        : [],
    [products, selectedType]
  );

  // Apply filters
  const filteredItems = useMemo(() => {
    return currentData.filter((item: Product | Accessory) => {
      const matchesBrand =
        selectedBrand === "All" || item.brand === selectedBrand;
      const matchesRam =
        selectedType === "accessory" ||
        selectedRam === "All" ||
        item.ram === selectedRam;
      const matchesStorage =
        selectedType === "accessory" ||
        selectedStorage === "All" ||
        item.storage === selectedStorage;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesBrand && matchesRam && matchesStorage && matchesSearch;
    });
  }, [
    currentData,
    selectedBrand,
    selectedRam,
    selectedStorage,
    searchTerm,
    selectedType,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <CategoryBanner />
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-3">
            Explore Categories
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sort and filter by brand, RAM, or storage — view both products and
            accessories
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-10 items-center">
          {/* Type */}
          <div className="flex items-center gap-2">
            <Layers className="text-blue-500" size={18} />
            <select
              value={selectedType}
              onChange={(e) =>
                setSelectedType(e.target.value as "product" | "accessory")
              }
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm"
            >
              <option value="product">Phones</option>
              <option value="accessory">Accessories</option>
            </select>
          </div>

          {/* Brand */}
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

          {/* RAM */}
          {selectedType === "product" && (
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
          )}

          {/* Storage */}
          {selectedType === "product" && (
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
          )}

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder={`Search ${
                selectedType === "product" ? "phones" : "accessories"
              }...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Loading {selectedType === "product" ? "products" : "accessories"}...
          </div>
        )}

        {/* Items */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-3xl overflow-hidden shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {item.brand}
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-all duration-300">
                  <Link
                    to={`/${
                      selectedType === "product" ? "products" : "accessories"
                    }/${item.id}`}
                    className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-600 hover:text-white transition"
                  >
                    👁 View
                  </Link>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1 truncate group-hover:text-blue-600 transition">
                  {item.name}
                </h3>
                {selectedType === "product" && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {item.ram} / {item.storage}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    ${item.price}
                  </p>
                  <p className="text-sm text-gray-400">
                    ⭐ {item.rating ?? 4.5}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {!loading && filteredItems.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-16">
            No {selectedType}s match your filters 😢
          </p>
        )}
      </div>
    </div>
  );
};

export default Categories;
