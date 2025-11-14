import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6">
      <div className="text-center max-w-lg w-full">
        {/* 404 Number */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-9xl font-extrabold text-blue-600 dark:text-blue-500 drop-shadow-lg"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl mt-4 text-gray-600 dark:text-gray-300"
        >
          Oops! The page you're looking for doesn’t exist.
        </motion.p>

        {/* Floating Illustration Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
          className="mx-auto mt-10 w-40 h-40 rounded-full bg-gradient-to-r 
                     from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700
                     flex items-center justify-center shadow-xl"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="text-white text-4xl font-bold"
          >
            ?
          </motion.div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 bg-gray-300 
                       dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600
                       text-gray-800 dark:text-gray-200 py-3 px-6 rounded-xl font-semibold
                       transition-transform hover:scale-105 shadow-md"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          {/* Home Button */}
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 
                       text-white py-3 px-6 rounded-xl font-semibold transition-transform 
                       hover:scale-105 shadow-md"
          >
            <Home size={18} />
            Go Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
