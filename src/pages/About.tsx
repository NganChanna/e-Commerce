// src/pages/About.tsx (Enhanced with more sections: History, Core Values, Testimonials, and Team Highlights)
import React from "react";
import { motion } from "framer-motion";
import { Phone, Users, Award, Clock, Heart, Star, User } from "lucide-react";

const About: React.FC = () => {
  // Sample testimonials
  const testimonials = [
    {
      name: "Sarah L.",
      role: "iPhone User",
      text: "AccessoryZone has revolutionized how I accessorize my phone. The quality is unmatched!",
      rating: 5,
      avatar: "https://i.pravatar.cc/60?u=1",
    },
    {
      name: "Mike D.",
      role: "Tech Enthusiast",
      text: "From cases to chargers, everything is top-notch. Fast shipping too!",
      rating: 5,
      avatar: "https://i.pravatar.cc/60?u=2",
    },
    {
      name: "Emily R.",
      role: "Gadget Lover",
      text: "Love the sustainable options. Great for eco-conscious buyers like me.",
      rating: 4,
      avatar: "https://i.pravatar.cc/60?u=3",
    },
  ];

  // Sample team members
  const teamMembers = [
    {
      name: "Dr. Elena Vasquez",
      role: "CEO & Founder",
      avatar: "https://i.pravatar.cc/80?u=10",
      bio: "Visionary leader with 15+ years in tech retail.",
    },
    {
      name: "Raj Patel",
      role: "CTO",
      avatar: "https://i.pravatar.cc/80?u=11",
      bio: "Tech wizard specializing in e-commerce platforms.",
    },
    {
      name: "Lisa Chen",
      role: "Head of Design",
      avatar: "https://i.pravatar.cc/80?u=12",
      bio: "Creative force behind our stylish product curation.",
    },
  ];

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
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            About AccessoryZone
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Discover premium accessories for your devices—from the latest
            gadgets to stylish add-ons that complement your lifestyle.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-yellow-400">
              <Star fill="currentColor" size={20} />
              <span className="font-semibold">4.9/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span className="font-semibold">50K+ Customers</span>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg"
          >
            <Phone className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At AccessoryZone, we believe that the right accessories can
              transform your everyday devices into extraordinary tools. Founded
              in 2020, we're dedicated to curating high-quality, innovative
              products that enhance your digital lifestyle.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg"
          >
            <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Our Vision
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To be the global leader in device accessories, empowering users
              worldwide with sustainable, cutting-edge solutions that blend
              form, function, and fashion.
            </p>
          </motion.div>
        </section>

        {/* History Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200 dark:bg-blue-800"></div>
            {[
              {
                year: "2020",
                event: "Founded in Silicon Valley with a passion for tech.",
                icon: Clock,
              },
              {
                year: "2021",
                event: "Launched first 100 premium products.",
                icon: Award,
              },
              {
                year: "2022",
                event: "Expanded to international shipping.",
                icon: Users,
              },
              {
                year: "2023",
                event: "Reached 10K happy customers milestone.",
                icon: Heart,
              },
              {
                year: "2024",
                event: "Introduced eco-friendly line.",
                icon: Star,
              },
              {
                year: "2025",
                event: "Partnered with top brands for exclusives.",
                icon: User,
              },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center mb-8 relative ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-16 h-16 bg-blue-600 dark:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg ${
                    index % 2 === 0 ? "ml-0 mr-8" : "mr-0 ml-8"
                  }`}
                >
                  <milestone.icon size={24} />
                </div>
                <div
                  className={`bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md w-64 ${
                    index % 2 === 0 ? "ml-24" : "mr-24"
                  }`}
                >
                  <h3 className="font-bold text-blue-600 dark:text-blue-400">
                    {milestone.year}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {milestone.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <h2 className="col-span-full text-3xl font-bold text-center mb-8">
            Our Core Values
          </h2>
          {[
            {
              icon: Heart,
              value: "Quality",
              desc: "Premium materials and rigorous testing for every product.",
            },
            {
              icon: Clock,
              value: "Innovation",
              desc: "Staying ahead with the latest trends and tech.",
            },
            {
              icon: Users,
              value: "Customer First",
              desc: "Your satisfaction drives everything we do.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md"
            >
              <item.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.value}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <div className="flex justify-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  "{testimonial.text}"
                </p>
                <div className="text-center">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Highlights */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-blue-600 dark:bg-blue-700 text-white p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-semibold mb-4">Ready to Explore?</h2>
            <p className="mb-6">
              Join thousands of satisfied customers and elevate your device
              experience today.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
              Shop Now
            </button>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
};

export default About;
