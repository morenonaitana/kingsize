"use client";
import { motion, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { DodecaScene, DodecaSceneSmall, ExampleComponent, TextWord } from '.';
import { useTracker } from '@14islands/r3f-scroll-rig';

export const VisionSection = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
  };

  const heading = "CRAFTING EXCELLENCE - Global Innovation Meets Exclusive Offer".split(" ");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <motion.div
        className="flex flex-col md:flex-row gap-8 justify-between"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} // Add this if you want the animation to run only once
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.div className="md:flex-1 flex items-center justify-center max-w-[640px]" variants={itemVariants}>
          <div>
            {/* <motion.h2 className="text-6xl font-bold mb-8 text-white" variants={itemVariants}>
                CRAFTING EXCELLENCE - Global Innovation Meets Exclusive Offer
            </motion.h2> */}
            <h2 className="text-6xl font-bold mb-8 text-white">
              {heading.map((word, index) => (
                <TextWord word={word} index={index + heading.length} key={index} />
              ))}
            </h2>
            {/* <ImageCube
              src="/cube.jpg"
              className="JellyPlaceholder"
            /> */}
            {/* <VideoCube
              src="/cube.jpg"
              className="JellyPlaceholder"
            /> */}
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingTop: "56.25%" }}>
              <video 
                autoPlay 
                loop 
                muted 
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://kingsize.co/wp-content/uploads/2021/05/cover_3.mp4"
              />
            </div>
          </div>
        </motion.div>
        <motion.div className="md:flex-1 flex flex-col items-start justify-center mt-8 md:mt-0 max-w-[400px]" variants={itemVariants}>
          <motion.p className="text-lg mb-6 text-white" variants={itemVariants}>
          At Kingsize, we blend exceptional branding with the latest digital technologies. Celebrate our global expansion with us: seize a complimentary digital audit.This unique offer combines our creative design prowess and advanced tech solutions, ensuring your project is not just current, but a trendsetter in innovation.
          </motion.p>
          <motion.a 
            className="mt-8 bg-transparent border rounded-full border-white py-3 px-6 text-white hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out"
            variants={itemVariants}
            href="#audit-section"
          >
            Book Your Free Audit →
          </motion.a>
        </motion.div>
      </motion.div>
      <div className="absolute bottom right mt-20 h-[300px] w-full">
        <DodecaScene />
        {/* <ExampleComponent /> */}
      </div>
      <div className="absolute bottom left left-8 h-[300px] h-[300px]">
        <DodecaSceneSmall />
      </div>
    </div>
  );
};

