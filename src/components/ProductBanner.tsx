import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductBanner = () => {
  return (
    <section className="relative w-full min-h-[500px] rounded-2xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-blue-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center md:text-left max-w-xl"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-blue-700 to-cyan-500 dark:from-blue-300 dark:to-cyan-400 bg-clip-text text-transparent">
            Discover the Future of Smartphones
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-10">
            Experience unmatched performance and design with the latest models.
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition-transform"
          >
            Shop Now
          </Link>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative flex justify-center"
        >
          <div className="absolute blur-3xl bg-blue-400/30 dark:bg-cyan-600/30 rounded-full w-[400px] h-[400px] md:w-[520px] md:h-[520px] -z-10" />
          {/* <img
            src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800"
            alt="Smartphone Display"
            className="min-h-[500px] w-[300px] md:w-[480px] rounded-[2.5rem] shadow-2xl hover:scale-105 transition-transform duration-700"
          /> */}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductBanner;
