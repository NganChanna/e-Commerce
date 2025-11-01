import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AccessoryBanner = () => {
  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-100 via-white to-green-100 dark:from-emerald-950 dark:via-gray-900 dark:to-green-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl text-center md:text-left"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-emerald-600 to-lime-500 dark:from-emerald-300 dark:to-lime-300 bg-clip-text text-transparent">
            Accessories That Define You
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-10">
            Upgrade your setup with the latest headphones, chargers, and tech
            gadgets.
          </p>
          <Link
            to="/accessories"
            className="inline-block bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-lime-500 hover:to-emerald-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition-transform"
          >
            Shop Accessories
          </Link>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative flex justify-center"
        >
          <div className="absolute blur-3xl bg-emerald-400/30 dark:bg-emerald-700/40 rounded-full w-[400px] h-[400px] md:w-[520px] md:h-[520px] -z-10" />
          <img
            src="https://images.unsplash.com/photo-1610393241269-7db9b921b6b1?w=800"
            alt="Accessories"
            className="w-[300px] md:w-[480px] rounded-[2.5rem] shadow-2xl hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AccessoryBanner;
