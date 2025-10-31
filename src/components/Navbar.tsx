"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X, ShoppingBag } from "lucide-react";
import { ModeToggle } from "./index";
import type { RootState } from "@/app/store";
import SearchEngine from "./SearchEngine";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { totalQuantity } = useSelector((state: RootState) => state.cart);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <img
            src="/image.png"
            alt="logo shop"
            className="w-10 h-10 rounded-full object-cover"
          />
          Meganic Phone
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Products
          </Link>
          <Link
            to="/categories"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Categories
          </Link>
          <Link
            to="/accessories"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Accessories
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

          {/* Search Bar */}
          <div className="relative">
            <SearchEngine />
          </div>

          {/* Cart Icon */}
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
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-4 space-y-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Products
          </Link>
          <Link
            to="/categories"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Categories
          </Link>
          <Link
            to="/accessories"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Accessories
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
