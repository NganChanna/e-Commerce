import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Benner = () => {
  return (
    <section className="relative z-1 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-gradient-to-r from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Decorative gradient circle */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-300/20 dark:bg-blue-700/20 rounded-full blur-3xl"></div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center md:text-left max-w-xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          Upgrade Your Tech <br /> with{" "}
          <span className="text-blue-600 dark:text-blue-400">Style</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Discover premium gadgets, phones, and accessories at the best prices —
          built for speed, power, and elegance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-transform hover:scale-105"
          >
            <ShoppingBag size={18} />
            Shop Now
          </Link>
          <Link
            to="/deals"
            className="flex items-center justify-center gap-2 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform hover:scale-105"
          >
            View Deals
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 mb-10 md:mb-0 flex justify-center md:justify-end"
      >
        <img
          src="https://images.unsplash.com/photo-1603899123208-30b7f8b4bdbb?auto=format&fit=crop&w=900&q=80"
          alt="Latest smartphone"
          className="w-[320px] md:w-[480px] drop-shadow-2xl hover:scale-105 transition-transform duration-500"
        />
      </motion.div>
    </section>
  );
};

export default Benner;
