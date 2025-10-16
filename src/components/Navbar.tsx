"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./index";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight hover:text-primary transition-colors"
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
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/product" className="hover:text-primary transition">
            Products
          </Link>
          <Link to="/categaries" className="hover:text-primary transition">
            Categaries
          </Link>
          <Link to="/accessories" className="hover:text-primary transition">
            Accessories
          </Link>
          <Link
            to="/about"
            className="hover:text-primary transition flex items-center gap-2"
          >
            {/* <CircleIcon className="h-4 w-4" /> */}
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-primary transition flex items-center gap-2"
          >
            {/* <CircleIcon className="h-4 w-4" /> */}
            Contact
          </Link>
          <Input
            type="text"
            placeholder="Search itme ..."
            className="border-none focus:ring-0 focus:outline-none bg-transparent text-sm"
          />

          <ModeToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent transition "
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
        <nav className="flex flex-col p-4 space-y-3 bg-background border-t border-border">
          <Link
            to="/"
            className="hover:text-primary transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/docs"
            className="hover:text-primary transition"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="#"
            className="hover:text-primary transition"
            onClick={() => setIsOpen(false)}
          >
            Categaries
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2 hover:text-primary transition"
            onClick={() => setIsOpen(false)}
          >
            Accessories
          </Link>

          <Link
            to="#"
            className="flex items-center gap-2 hover:text-primary transition"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
