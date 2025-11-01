import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AccessoryBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-emerald-600 via-green-500 to-lime-400 dark:from-emerald-800 dark:via-green-700 dark:to-lime-600 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h1 className="text-5xl font-extrabold mb-4">Top Accessories</h1>
          <p className="text-lg text-emerald-100 mb-6">
            Boost your phone’s performance with the best accessories in town.
          </p>
          <Link
            to="/cart"
            className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-transform"
          >
            Shop Accessories
          </Link>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800"
          alt="Accessories Banner"
          className="w-full md:w-[420px] rounded-3xl shadow-2xl object-cover"
        />
      </div>
    </section>
  );
};

export default AccessoryBanner;
