"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";


const Hero = () => {
  const text = "Fashion Journey";
  const [displayText, setDisplayText] = useState("");

  React.useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        currentIndex = 0; // Reset to start over
      }
    }, 200); // Adjust speed here (milliseconds)

    return () => clearInterval(intervalId);
  }, []);
  return (
    <section className="relative h-[90vh] overflow-hidden">
      <div
        className="absolute w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/hero.avif)",
        }}
      ></div>
      <div className="absolute inset-0 bg-black dark:opacity-80 opacity-50"></div>
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white dark:text-gray-300 sm:text-6xl md:text-7xl">
            <motion.span initial={{ opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.3}} className="block">Redefine Your</motion.span>
            <motion.span initial={{ opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.3}} className="block text-primary">
              <motion.span className="inline-block border-r-4 border-r-primary">
                {displayText}
              </motion.span>
            </motion.span>
          </h1>
          <motion.p initial={{opacity: 0, y: 100}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.3}} className="mt-6 max-w-lg mx-auto text-xl text-gray-200 sm:max-w-3xl">
            Immerse yourself in a world of style and elegance. Our exclusive
            collection is crafted to inspire and empower your unique fashion
            narrative.
          </motion.p>
          <motion.div initial={{opacity: 0, y: 100}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: 0.3}} className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <a
              href="/shop"
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary hover:bg-hover transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Shop Now
            </a>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Hero;
