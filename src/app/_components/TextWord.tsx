"use client";
import { motion } from 'framer-motion';
import React from 'react';

const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Each word appears with a delay
        duration: 0.5,
      },
    }),
  };
  
  export const TextWord = ({ word, index }) => (
    <motion.span variants={wordVariants} custom={index} className="inline-block mr-4">
      {word}
    </motion.span>
  );