"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const aboutData = [
  {
    id: 1,
    title: "Quality First",
    description:
      "Founded in 2020, Vogue has grown from a small boutique to become one of the leading online fashion retailers. We believe that everyone deserves to look and feel their best without compromising on quality or breaking the bank.",
  },
  {
    id: 2,
    title: "Sustainable Fashion",
    description:
      "Committed to eco-friendly practices and sustainable manufacturing processes.",
  },
  {
    id: 3,
    title: " Customer Focus",
    description:
      "To provide accessible, high-quality fashion that empowers individuals to express their unique style while maintaining our commitment to sustainable and ethical practices.",
  },
];

const page = () => {
  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-15">
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2 dark:text-gray-300">
            About Vogue
          </h1>
          <p className="text-lg text-gray-500 mb-12 dark:text-gray-400">
            Your Premier Destination for Fashion Excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ x: -600 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Image
              src="/about1.webp"
              alt="About Vogue Store - Elegant Clothing Display"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ x: 600 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 dark:text-gray-300">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4 dark:text-gray-400">
              Founded in 2020, Vogue has grown from a small boutique to become
              one of the leading online fashion retailers. We believe that
              everyone deserves to look and feel their best without compromising
              on quality or breaking the bank.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Our carefully curated collection features the latest trends and
              timeless classics, ensuring that our customers always find exactly
              what they're looking for.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ">
          {aboutData.map((item) => (
            <motion.div key={item.id} initial={{scale: 0}} animate={{scale: 1}} transition={{duration: 0.5, delay: 0.3}} className="text-center p-6 bg-gray-100 rounded-lg dark:bg-gray-900">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-gray-300">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
