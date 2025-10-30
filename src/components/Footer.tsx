import React from "react";
import { Facebook, Instagram, Twitter, Github, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 sm:grid-cols-2 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
            AccessoryZone
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Discover premium accessories for your devices — from the latest
            gadgets to stylish add-ons that complement your lifestyle.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Accessories
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Customer Support
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Shipping & Returns
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Stay Connected
          </h3>
          <div className="flex space-x-4 mb-4">
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <Facebook size={22} />
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <Instagram size={22} />
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <Twitter size={22} />
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <Github size={22} />
            </a>
          </div>
          <p className="flex items-center gap-2 text-sm">
            <Mail size={16} className="text-blue-500 dark:text-blue-400" />
            support@accessoryzone.com
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} MaganicPhone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
