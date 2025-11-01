import { Banner } from "@/components";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import { addToCart } from "@/app/features/cart/cartSlice";
import type { Product } from "@/types/Product";
import { useMemo } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { data: products } = useSelector((state: RootState) => state.products);
  const { data: accessories } = useSelector(
    (state: RootState) => state.accessories
  );
  const bestSellers = useMemo(() => (products || []).slice(0, 4), [products]);
  const trending = useMemo(() => (products || []).slice(4, 8), [products]);
  const topAccessories = useMemo(
    () => (accessories || []).slice(0, 4),
    [accessories]
  );

  const categories = [
    {
      name: "Apple",
      img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Samsung",
      img: "https://www.svgrepo.com/show/303265/samsung-logo.svg",
    },
    {
      name: "Vivo",
      img: "https://www.svgrepo.com/show/367262/vivo.svg",
    },
    {
      name: "Oppo",
      img: "https://www.svgrepo.com/show/367263/oppo.svg",
    },
  ];

  // helper function for cart
  const handleAddToCart = (item: Product, type: "product" | "accessory") => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        image: item.image,
        type,
        quantity: 1,
      })
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      {/* 🏞️ Hero Banner */}
      <section>
        <Banner />
      </section>

      {/* ⭐ Best Seller Phones */}
      <Section
        title="Best Seller Phones"
        color="from-blue-600 to-cyan-500"
        items={bestSellers}
        type="product"
        onAdd={handleAddToCart}
        link="/products"
      />

      {/* 🔥 Trending Phones */}
      <Section
        title="Trending Phones"
        color="from-purple-600 to-pink-500"
        items={trending}
        type="product"
        onAdd={handleAddToCart}
        link="/products"
      />

      {/* 🎧 Top Accessories */}
      <Section
        title="Top Accessories"
        color="from-emerald-600 to-green-400"
        items={topAccessories}
        type="accessory"
        onAdd={handleAddToCart}
        link="/accessories"
      />

      {/* 🏷️ Category Brands */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
          Browse by Brand
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 items-center text-center">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-20 h-20 object-contain mx-auto mb-3"
              />
              <p className="font-semibold text-lg">{cat.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✨ CTA */}
      <section className="max-w-7xl mx-auto py-24 px-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-3xl shadow-xl mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-extrabold mb-4 tracking-tight">
            Upgrade Your Lifestyle Today!
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Discover the latest innovations in mobile technology.
          </p>
          <Link
            to="/products"
            className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl shadow-md hover:scale-105 hover:bg-gray-100 transition-transform"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

// ✨ Reusable section component
const Section = ({
  title,
  color,
  items,
  type,
  onAdd,
  link,
}: {
  title: string;
  color: string;
  items: Product[]; // Or Accessory[] if separate
  type: "product" | "accessory";
  onAdd: (item: Product, type: "product" | "accessory") => void;
  link: string;
}) => (
  <section className="max-w-7xl mx-auto py-20 px-6">
    <div className="flex items-center justify-between mb-8">
      <h2
        className={`text-4xl font-bold tracking-tight bg-gradient-to-r ${color} bg-clip-text text-transparent`}
      >
        {title}
      </h2>
      <Link
        to={link}
        className={`text-sm font-semibold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition`}
      >
        View All →
      </Link>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group relative rounded-3xl overflow-hidden shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition"
        >
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition">
              <Link
                to={`/${type === "product" ? "products" : "accessories"}/${
                  item.id
                }`}
                className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-600 hover:text-white transition"
              >
                <Eye size={16} /> View
              </Link>
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-semibold text-lg mb-1 truncate">{item.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {item.brand}
            </p>
            <p
              className={`font-bold text-xl mb-4 ${
                type === "accessory" ? "text-emerald-500" : "text-blue-500"
              }`}
            >
              ${item.price}
            </p>

            <button
              onClick={() => onAdd(item, type)}
              className={`w-full ${
                type === "accessory"
                  ? "bg-gradient-to-r from-emerald-500 to-green-400"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500"
              } text-white py-2 rounded-xl font-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform`}
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Home;
