"use client";
import { motion } from 'framer-motion';
import React from 'react';
import { AquariumRender, TextWord } from '.';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
};

export const HomeBanner = () => {
  const heading1 = "Elevating brands with".split(" ");
  const heading2 = "next gen design & tech".split(" ");

  return (
    <div id="home" className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat relative text-white">
      <motion.div
        className="absolute inset-0 bg-opacity-50"
      >
      <AquariumRender />
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 pointer-events-none"
      >
        <h1 className="text-5xl lg:text-8xl font-bold tracking-tighter mb-8">
          {heading1.map((word, index) => (
            <TextWord word={word} index={index} key={index} />
          ))}
        </h1>
        <h2 className="text-5xl lg:text-8xl font-bold">
          {heading2.map((word, index) => (
            <TextWord word={word} index={index + heading1.length} key={index} />
          ))}
        </h2>
        <div className="w-full flex items-center justify-center">
        <motion.a
          variants={textVariants}
          href="#audit-section"
          className="mt-8 z-9000 pointer-events-auto bg-transparent border rounded-full border-white py-3 px-6 hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out"
        >
          Book Your Free Audit →
        </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

