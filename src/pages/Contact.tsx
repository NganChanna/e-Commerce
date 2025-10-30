// src/pages/Contact.tsx (Updated with Telegram Bot Integration)
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ChevronDown,
} from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Telegram Bot Configuration - Replace with your actual values
  const TELEGRAM_BOT_TOKEN = "8233722295:AAFRoOQFjnxrsmTy0gyh1vS-qEqvmTQMSeU";
  const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID_HERE"; // e.g., "@yourchannel" or "123456789" (user/group ID)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Prepare message for Telegram
    const messageText = `
*New Contact Form Submission*

**Name:** ${formData.name}
**Email:** ${formData.email}
**Message:** ${formData.message}

*Submitted on:* ${new Date().toLocaleString()}
    `.trim();

    try {
      // First, simulate or handle any other logic if needed
      // await new Promise((resolve) => setTimeout(resolve, 1500)); // Optional mock delay

      // Send to Telegram Bot API
      if (
        TELEGRAM_BOT_TOKEN ===
          "8233722295:AAFRoOQFjnxrsmTy0gyh1vS-qEqvmTQMSeU" ||
        TELEGRAM_CHAT_ID === "YOUR_CHAT_ID_HERE"
      ) {
        throw new Error(
          "Please configure your Telegram bot token and chat ID."
        );
      }

      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: messageText,
            parse_mode: "Markdown", // For bold/italic formatting
          }),
        }
      );

      if (!telegramResponse.ok) {
        const errorData = await telegramResponse.json();
        throw new Error(
          `Telegram API Error: ${
            errorData.description || "Failed to send message"
          }`
        );
      }

      console.log("Message sent to Telegram successfully!");
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickFAQs = [
    {
      question: "What's the best way to reach you for sales inquiries?",
      answer:
        "Email sales@accessoryzone.com for personalized product recommendations.",
    },
    {
      question: "Do you have a physical store?",
      answer:
        "We're online-only for now, but planning pop-up events in major cities!",
    },
    {
      question: "How long until I hear back?",
      answer: "We respond to all messages within 24 hours, Monday-Friday.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  support@accessoryzone.com
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  General inquiries
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <Phone className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  +1 (555) 123-4567
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Mon-Fri, 9AM-6PM PST
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  123 Tech Street
                  <br />
                  Silicon Valley, CA 94043
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold">Office Hours</h3>
              </div>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Monday - Friday: 9:00 AM - 6:00 PM PST</li>
                <li>Saturday: 10:00 AM - 4:00 PM PST</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 text-pink-600 hover:bg-pink-100 dark:hover:bg-pink-900 rounded-lg transition"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors duration-300 disabled:opacity-50"
              >
                <Send className="mr-2" size={20} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
            {submitStatus && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg text-center font-medium ${
                  submitStatus === "success"
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                }`}
              >
                {submitStatus === "success"
                  ? "Message sent successfully! We'll get back to you soon."
                  : "Oops! Something went wrong. Please try again."}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Quick FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Quick FAQ</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {quickFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Google Maps Embed */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Our Location
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.239034056955!2d-122.084249684681!3d37.42199977982588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8d%3A0x6c296c66619367e0!2sGoogleplex!5e0!3m2!1sen!2sus!4v1635781234567!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AccessoryZone Location"
            />
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Contact;
