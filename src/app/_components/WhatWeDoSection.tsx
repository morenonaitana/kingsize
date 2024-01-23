"use client";
import { motion } from 'framer-motion';
import React from 'react';
import { TextWord } from '.';

export const WhatWeDoSection = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
  };

  const heading = "Creating for Brands, Startups, and the Digital Products of Tomorrow".split(" ");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-12 w-full">
      <motion.div
        className="flex flex-col w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} // Add this if you want the animation to run only once
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.div className="" variants={itemVariants}>
          <div>
            {/* <motion.h2 className="text-6xl font-bold mb-12 text-white uppercase max-w-[620px]" variants={itemVariants}>
                Creating for Brands, Startups, and the Digital Products of Tomorrow
            </motion.h2> */}
            <h2 className="text-6xl font-bold mb-12 text-white uppercase max-w-[620px]">
              {heading.map((word, index) => (
                <TextWord word={word} index={index + heading.length} key={index} />
              ))}
            </h2>
          </div>
        </motion.div>
        <motion.div className="md:flex-1 flex flex-col items-start justify-center mt-8 md:mt-0 w-full" variants={itemVariants}>
            <ul className='w-full'>
                <li className="flex flex-row justify-between items-center border-b pt-8">
                    <motion.h3 className="text-7xl font-bold mb-6 text-white" variants={itemVariants}>Strategy</motion.h3>
                    <motion.p className="text-lg mb-6 text-white max-w-[520px]" variants={itemVariants}>
                        Research, Art Direction, Experience Strategy, Brand Strategy, Naming, Brand Tone & Voice, Social Media
                    </motion.p>
                </li>
                <li className="flex flex-row justify-between items-center border-b pt-8">
                    <motion.h3 className="text-7xl font-bold mb-6 text-white" variants={itemVariants}>Creative</motion.h3>
                    <motion.p className="text-lg mb-6 text-white max-w-[520px]" variants={itemVariants}>
                        Branding, UX/UI Design, Motion Design, Print Design,Visual Indentity, Logo, Packaging, Photography
                    </motion.p>
                </li>
                <li className="flex flex-row justify-between items-center border-b pt-8">
                    <motion.h3 className="text-7xl font-bold mb-6 text-white" variants={itemVariants}>Tech</motion.h3>
                    <motion.p className="text-lg mb-6 text-white max-w-[520px]" variants={itemVariants}>
                        Backend & Frontend Development, Websites, Mobile Apps, E-Commerce, Wearables, AI Integration, DevOps, AR/VR experiences, cloud Solutions
                    </motion.p>
                </li>
            </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

