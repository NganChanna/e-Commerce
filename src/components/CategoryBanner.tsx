import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CategoryBanner = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center rounded-2xl justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-indigo-950 dark:via-gray-900 dark:to-purple-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl text-center md:text-left"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
            Explore Top Brands
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-10">
            From Apple to Samsung — find your favorite brands and their best
            products.
          </p>
          <Link
            to="/categories"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition-transform"
          >
            Browse Brands
          </Link>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative flex justify-center"
        >
          <div className="absolute blur-3xl bg-pink-400/30 dark:bg-pink-700/40 rounded-full w-[400px] h-[400px] md:w-[520px] md:h-[520px] -z-10" />
          <img
            src="https://images.unsplash.com/photo-1629904853690-0e4a1d4d5c6e?w=800"
            alt="Category showcase"
            className="w-[300px] md:w-[480px] rounded-[2.5rem] shadow-2xl hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryBanner;
