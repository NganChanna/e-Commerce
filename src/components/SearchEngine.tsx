import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";

const SearchEngine: React.FC = () => {
  const { data: products } = useSelector((state: RootState) => state.products);
  const { data: accessories } = useSelector(
    (state: RootState) => state.accessories
  );

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    { id: number; name: string; image: string; type: string }[]
  >([]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();

    const productMatches = products
      .filter((p) => p.name.toLowerCase().includes(searchTerm))
      .map((p) => ({
        id: p.id,
        name: p.name,
        image: p.image,
        type: "product",
      }));

    const accessoryMatches = accessories
      .filter((a) => a.name.toLowerCase().includes(searchTerm))
      .map((a) => ({
        id: a.id,
        name: a.name,
        image: a.image,
        type: "accessory",
      }));

    setResults([...productMatches, ...accessoryMatches]);
  }, [query, products, accessories]);

  return (
    <div className="relative w-56">
      {/* Search Input */}
      <div className="flex items-center bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
        <Search className="w-4 h-4 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-gray-500 hover:text-red-500"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {results.length > 0 && (
        <div className="absolute top-12 left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50 max-h-72 overflow-y-auto border border-gray-200 dark:border-gray-700">
          {results.map((item) => (
            <Link
              key={`${item.type}-${item.id}`}
              to={
                item.type === "product"
                  ? `/products/${item.id}`
                  : `/accessories/${item.id}`
              }
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-md object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {item.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {item.type}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results */}
      {query.length > 0 && results.length === 0 && (
        <div className="absolute top-12 left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 text-center text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
          No results found.
        </div>
      )}
    </div>
  );
};

export default SearchEngine;
