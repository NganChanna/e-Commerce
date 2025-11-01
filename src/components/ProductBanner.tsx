import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 dark:from-blue-800 dark:via-cyan-700 dark:to-sky-600 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h1 className="text-5xl font-extrabold mb-4">
            Our Latest Smartphones
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Discover premium phones with next-level performance, style, and
            reliability.
          </p>
          <Link
            to="/cart"
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-transform"
          >
            Shop Now
          </Link>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35d6?w=800"
          alt="Phones Banner"
          className="w-full md:w-[420px] rounded-3xl shadow-2xl object-cover"
        />
      </div>
    </section>
  );
};

export default ProductBanner;
