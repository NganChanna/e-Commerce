"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X, ShoppingBag } from "lucide-react";
import { ModeToggle } from "./index";
import type { RootState } from "@/app/store";
import SearchEngine from "./SearchEngine";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchProduct } from "@/app/features/products/productSlice";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { data: products } = useAppSelector((state) => state.products);
  const brands = Array.from(new Set(products.map((p) => p.brand)));

  React.useEffect(() => {
    if (products.length === 0) dispatch(fetchProduct());
  }, [dispatch, products]);

  const [isOpen, setIsOpen] = React.useState(false);
  const { totalQuantity } = useSelector((state: RootState) => state.cart);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-black border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8 py-3">
        {/* 🏷️ Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <img
            src="/image.png"
            alt="logo shop"
            className="w-10 h-10 rounded-full object-cover"
          />
          Meganic
        </Link>

        {/* 🖥️ Desktop Navigation (> 12 inch / ≥ 1280px) */}
        <nav className="hidden xl:flex items-center gap-9">
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>
          <NavigationMenu className="dark:bg-gray-900/80">
            <NavigationMenuList>
              <NavigationMenuItem>
                {/* 🔘 Trigger (text only) */}
                <NavigationMenuTrigger className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  <Link to="/products">Product</Link>
                </NavigationMenuTrigger>

                {/* 🧩 Dropdown Content */}
                <NavigationMenuContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4">
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {brands.map((brand) => (
                      <li key={brand}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/products?brand=${encodeURIComponent(brand)}`}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 
                      hover:bg-blue-50 dark:hover:bg-gray-800 
                      hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition"
                          >
                            {brand}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            to="/categories"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Category
          </Link>
          <Link
            to="/accessories"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Accessory
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Contact
          </Link>

          {/* 🔍 Search */}
          <div className="relative w-48">
            <SearchEngine />
          </div>

          {/* 🛒 Cart */}
          <Link
            to="/cart"
            className="relative left-4 flex items-center justify-center hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>

          <ModeToggle />
        </nav>

        {/* 💻 Tablet (8–12 inch) — Show search + icons, hide nav links */}
        <div className="hidden md:flex xl:hidden items-center gap-4">
          {/* 🔍 Search */}
          <div className="w-40 sm:w-56">
            <SearchEngine />
          </div>

          {/* 🛒 Cart */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>

          <ModeToggle />

          {/* 📋 Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* 📱 Mobile (≤ 8 inch) — No search */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/cart"
            className="relative flex items-center justify-center hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>

          <ModeToggle />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 📱💻 Mobile + Tablet Dropdown (≤ 12 inch / < 1280px) */}
      <div
        className={`xl:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-4 space-y-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
          <div className="flex w-full md:hidden">
            <SearchEngine />
          </div>

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>

          {/* 🔽 Product Dropdown */}
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer py-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              <span>Product</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <ul className="pl-4 mt-1 space-y-2 border-l border-gray-300 dark:border-gray-700">
              <Link
                to="/products"
                className="block px-2 py-1 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                All Products
              </Link>
              {brands.map((brand) => (
                <li key={brand}>
                  <Link
                    to={`/products?brand=${encodeURIComponent(brand)}`}
                    onClick={() => setIsOpen(false)}
                    className="block px-2 py-1 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <Link
            to="/categories"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Category
          </Link>
          <Link
            to="/accessories"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Accessory
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
