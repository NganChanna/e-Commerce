"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchProduct } from "@/app/features/products/productSlice";

const Banner = () => {
  const dispatch = useAppDispatch();
  const { data: products, loading } = useAppSelector((state) => state.products);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProduct());
  }, [dispatch, products]);

  const applePhones = products
    .filter(
      (p) =>
        p.brand.toLowerCase() === "apple" ||
        p.name.toLowerCase().includes("iphone")
    )
    .slice(0, 10);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPhone = applePhones[currentIndex];

  useEffect(() => {
    if (applePhones.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % applePhones.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [applePhones]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPos = event.clientX - rect.left - rect.width / 2;
    const yPos = event.clientY - rect.top - rect.height / 2;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-24 bg-gradient-to-r from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* 🔵 Background Glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-400/20 dark:bg-blue-700/20 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center md:text-left max-w-xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          Discover the Power of{" "}
          <span className="text-blue-600 dark:text-blue-400">iPhone</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Experience Apple’s innovation — designed for elegance, speed, and the
          future.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            to="/products?brand=Apple"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-transform hover:scale-105"
          >
            <ShoppingBag size={18} />
            Shop iPhones
          </Link>
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform hover:scale-105"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full md:w-1/2 h-[400px] flex items-center justify-center mt-10 md:mt-0 perspective"
      >
        {loading && (
          <p className="text-gray-500 dark:text-gray-400">Loading iPhones...</p>
        )}

        {!loading && currentPhone && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhone.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center"
            >
              <motion.img
                src={currentPhone.image}
                alt={currentPhone.name}
                className="w-[280px] md:w-[400px] drop-shadow-2xl rounded-2xl object-contain"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              />
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && applePhones.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            No iPhones found 😢
          </p>
        )}
      </div>
    </section>
  );
};

export default Banner;
