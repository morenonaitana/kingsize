"use client";
import { motion } from 'framer-motion';
import React, { useRef } from 'react';

export const FullImageSection = () => {
    const textVariants = {
      offscreen: { y: 100, opacity: 0 },
      onscreen: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", bounce: 0.4, duration: 1 }
      }
    };

    return (
      <div className="relative w-full h-screen overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute w-auto min-w-full min-h-full max-w-none"
          src="/cybernetic-ai.mp4"
        />
        <div className="absolute w-full h-full bg-black opacity-50"></div>
        <div className="w-full h-full absolute p-12">
          <motion.div
            className="flex items-center justify-center h-full"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-white text-6xl font-bold text-center leading-relaxed"
              variants={textVariants}
            >
              Enhancing Your Digital Experience with Cutting-Edge Technology and Creative Branding. Uncover Your Potential with Our Exclusive Offer
            </motion.h1>
          </motion.div>
        </div>
      </div>
    );
  };