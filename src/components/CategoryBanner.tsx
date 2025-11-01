import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CategoryBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-700 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h1 className="text-5xl font-extrabold mb-4">Explore by Brand</h1>
          <p className="text-lg text-purple-100 mb-6">
            Choose your favorite brand and find the devices you love the most.
          </p>
          <Link
            to="/products"
            className="bg-white text-purple-700 px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-transform"
          >
            View All Phones
          </Link>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          src="https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800"
          alt="Category Banner"
          className="w-full md:w-[420px] rounded-3xl shadow-2xl object-cover"
        />
      </div>
    </section>
  );
};

export default CategoryBanner;
