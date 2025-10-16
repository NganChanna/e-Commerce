import {
  FaArrowRight,
  FaFacebook,
  FaInstagramSquare,
  FaPhoneAlt,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { MdAccessTimeFilled, MdEmail } from "react-icons/md";
import { IoMdPin } from "react-icons/io";
import type { JSX } from "react";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
  const about: string = `offers the latest electronics at great prices.
    From gadgets to accessories, we deliver quality products with fast
    shipping and secure checkouts.`;

  const categories1: string[] = [
    "IPhone",
    "Samsung",
    "Vivo",
    "Xiaomi",
    "Huawei",
  ];
  const categories2: string[] = [
    "Watches",
    "Tvs",
    "Drones",
    "Chairs",
    "Tablets",
  ];

  const reachUs: { title: string; icon: JSX.Element }[] = [
    { title: "012 345 678 9", icon: <FaPhoneAlt /> },
    { title: "example@gmail.com", icon: <MdEmail /> },
    {
      title: "123 Tech Avenue, Suite 500 Electro City, CA 94016 United State",
      icon: <IoMdPin />,
    },
    { title: "Mon-Fri, 9AM-5PM (ICT/UTC+7)", icon: <MdAccessTimeFilled /> },
  ];

  const supports: string[] = [
    "Help Center",
    "Order Tracking",
    "Shipping & Delivery",
    "Returns & Refunds",
    "FAQs",
    "Terms & Conditions",
  ];

  const follows: JSX.Element[] = [
    <FaFacebook />,
    <FaInstagramSquare />,
    <FaTelegram />,
    <FaYoutube />,
    <FaTiktok />,
  ];

  const apps: { img: string; link: string }[] = [
    { img: "/Google.png", link: "" },
    { img: "/AppleStore.png", link: "" },
    { img: "/Window.png", link: "" },
  ];

  return (
    <footer className="w-full bg-gray-100 text-gray-800 dark:bg-[#0F172A] dark:text-gray-200 transition-colors duration-300">
      {/* Main Content */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-4 px-6 md:px-10 lg:px-20 py-14 border-b border-gray-300 dark:border-gray-700">
        {/* About */}
        <article className="space-y-4">
          <h1 className="font-bold text-2xl tracking-wide">About</h1>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            <span className="font-semibold mr-1 text-blue-600 dark:text-blue-400">
              Maganic
            </span>
            {about}
          </p>
        </article>

        {/* Categories */}
        <article className="space-y-4">
          <h1 className="font-bold text-2xl tracking-wide">Categories</h1>
          <div className="flex justify-start space-x-10">
            <ul className="space-y-2">
              {categories1
                .slice()
                .sort((a, b) => a.localeCompare(b))
                .map((category, index) => (
                  <li key={index}>
                    <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-all duration-200 underline-offset-4 hover:underline">
                      {category}
                    </span>
                  </li>
                ))}
            </ul>
            <ul className="space-y-2">
              {categories2
                .slice()
                .sort((a, b) => a.localeCompare(b))
                .map((category, index) => (
                  <li key={index}>
                    <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-all duration-200 underline-offset-4 hover:underline">
                      {category}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </article>

        {/* Reach Us */}
        <article className="space-y-4">
          <h1 className="font-bold text-2xl tracking-wide">Reach Us</h1>
          <ul className="space-y-3">
            {reachUs.map((reach, index) => (
              <li
                key={index}
                className="flex items-start space-x-3 text-gray-700 dark:text-gray-300"
              >
                <span className="text-blue-600 dark:text-blue-400 text-xl mt-1">
                  {reach.icon}
                </span>
                <span>{reach.title}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* Support */}
        <article className="space-y-4">
          <h1 className="font-bold text-2xl tracking-wide">Support</h1>
          <ul className="space-y-2">
            {supports.map((support, index) => (
              <li key={index}>
                <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-all duration-200 underline-offset-4 hover:underline">
                  {support}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* Second Row */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-10 lg:px-20 py-10">
        {/* Subscribe */}
        <aside className="space-y-4">
          <h2 className="font-semibold text-lg">
            First time? Grab 5% off 5 items!
          </h2>
          <div className="relative w-full rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600">
            <Input
              type="text"
              placeholder="example@gmail.com"
              className="border-none focus:ring-0 focus:outline-none bg-transparent text-sm"
            />
            <FaArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" />
          </div>
        </aside>

        {/* Follow */}
        <aside className="space-y-4 text-center">
          <h2 className="font-semibold text-lg">Follow Us</h2>
          <ul className="flex justify-center space-x-5 text-2xl">
            {follows.map((follow, index) => (
              <li
                key={index}
                className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                {follow}
              </li>
            ))}
          </ul>
        </aside>

        {/* App Links */}
        <aside className="space-y-4 text-center">
          <h2 className="font-semibold text-lg">Try Our App</h2>
          <ul className="flex justify-center space-x-4">
            {apps.map((app, index) => (
              <li
                key={index}
                className="w-28 hover:scale-105 transition-transform duration-300"
              >
                <a href={app.link}>
                  <img src={app.img} alt="App Link" className="w-full h-full" />
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* Bottom Policy & Credits */}
      <section className="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-2 text-center py-5 border-t border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm">
        <article>
          <Link
            to="#"
            className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Privacy & Policy
          </Link>
          <span className="mx-2"> | </span>
          Designed & developed by
        </article>
        <Link
          to="#"
          className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-500 transition-colors"
        >
          Rok Rak Dev
        </Link>
      </section>
    </footer>
  );
};

export default Footer;
