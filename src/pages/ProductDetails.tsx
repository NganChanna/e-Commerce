import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import type { RootState } from "@/app/store";
import { addToCart } from "@/app/features/cart/cartSlice";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) =>
    state.products.data.find((item) => item.id === Number(id))
  );

  // 💬 Customer Reviews (stored in localStorage)
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    const saved = localStorage.getItem(`reviews-${id}`);
    if (saved) setReviews(JSON.parse(saved));
  }, [id]);

  const addReview = () => {
    if (!newReview.trim()) return;
    const review: Review = {
      name: "Guest User",
      rating: newRating,
      comment: newReview,
      date: new Date().toLocaleDateString(),
      avatar: `https://i.pravatar.cc/100?u=${Math.random()}`,
    };
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updated));
    setNewReview("");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found 😢</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-5 py-2 rounded-xl transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const haddleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        type: "product", // or "accessory"
        quantity: 1,
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-10 px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Product Image */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-6 "
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-contain rounded-2xl hover:scale-105 transition-transform duration-300 "
          />
        </motion.div>

        {/* Product Info */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm uppercase tracking-wide">
              {product.brand}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <Star className="text-yellow-400 fill-yellow-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {product.rating} / 5 ({product.review} reviews)
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Product Specs */}
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300 mb-6">
              <p>
                <strong>RAM:</strong> {product.ram}
              </p>
              <p>
                <strong>Storage:</strong> {product.storage}
              </p>
              <p>
                <strong>Weight:</strong> {product.weight}
              </p>
              <p>
                <strong>Dimensions:</strong> {product.dimensions}
              </p>
              <p>
                <strong>Warranty:</strong> {product.warranty}
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-lg">Features</h3>
              {product.features && Array.isArray(product.features) ? (
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                  No features available.
                </p>
              )}
            </div>

            {/* Compatibility */}
            {Array.isArray(product.compatibility) && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2 text-lg">Compatibility</h3>
                <div className="flex flex-wrap gap-2">
                  {product.compatibility.map((comp, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Price & Buttons */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ${product.price.toFixed(2)}
              </span>
              <span
                className={`text-sm font-medium ${
                  product.stock > 0
                    ? "text-green-500 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="flex gap-4">
              <motion.button
                onClick={haddleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors duration-300"
              >
                <ShoppingCart className="inline mr-2" /> Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 py-3 rounded-xl font-semibold transition-colors duration-300"
              >
                ← Back
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 💬 Customer Reviews Section */}
      <div className="mt-12 max-w-5xl w-full">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          Customer Reviews
        </h2>

        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 flex gap-4"
              >
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {review.name}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {review.date}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No reviews yet. Be the first to share your experience!
            </p>
          )}
        </div>

        {/* Write Review */}
        <div className="mt-10 bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Leave a Review
          </h3>
          <div className="flex items-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                onClick={() => setNewRating(star)}
                className={`cursor-pointer ${
                  star <= newRating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-400"
                }`}
              />
            ))}
          </div>
          <textarea
            rows={3}
            placeholder="Write your experience..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={addReview}
            className="mt-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-5 rounded-xl font-medium transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
