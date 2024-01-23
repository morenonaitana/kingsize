"use client";
import { ScrollScene, UseCanvas } from '@14islands/r3f-scroll-rig';
import { motion } from 'framer-motion';
import React from 'react';
import { useForm } from "react-hook-form";
import { TextWord } from '.';
import'./auditsection.module.css';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const AuditDescription = () => {
  return (
    <motion.div className="text-white p-4" variants={itemVariants}>
      <motion.p variants={itemVariants}>Receive a gateway to transforming your brand's digital presence. With our expert analysis, uncover hidden opportunities and craft a roadmap to success that resonates with your brand's unique vision. This exclusive offer includes:</motion.p>
      <motion.ul className="list-disc pl-6 mt-4 custom-list" variants={itemVariants}>
        <li className="mb-4 custom-list-item font-extralight text-sm"><span className="font-bold text-lg">Comprehensive Brand Review:</span> Delving deep into your brand's current positioning, identity, and perception to uncover strengths and areas for growth.</li>
        <li className="mb-4 custom-list-item font-extralight text-sm"><span className="font-bold text-lg">Digital Presence Analysis:</span> Analyzing your online presence, from website performance to social media engagement, and providing actionable insights.</li>
        <li className="mb-4 custom-list-item font-extralight text-sm"><span className="font-bold text-lg">Marketing Strategy Evaluation:</span> Assessing your existing marketing strategies to identify opportunities for increased reach, engagement, and conversion.</li>
        <li className="mb-4 custom-list-item font-extralight text-sm"><span className="font-bold text-lg">Competitive Landscape Overview:</span> Understanding your standing in the industry, with insights into competitors' strategies and your unique opportunities.</li>
        <li className="mb-4 custom-list-item font-extralight text-sm"><span className="font-bold text-lg">Customized Recommendations:</span> Offering tailored recommendations based on our findings, focusing on practical and innovative solutions.</li>
      </motion.ul>
    </motion.div>
  );
};

export const AuditSection = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  const heading = "Share your details to receive your exclusive audit".split(" ");

  return (
    <div id="audit-section" className="container pointer-events-auto flex flex-row mx-auto px-4 sm:px-6 lg:px-8 mt-12 gap-8">
      <motion.div className="basis-1/2" initial="hidden"
        whileInView="visible"
        viewport={{ once: false }} // Add this if you want the animation to run only once
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}>
        {/* <motion.h1 className="text-6xl font-bold mb-12 text-white uppercase" variants={itemVariants}>Share Your Details for Your Exclusive Audit</motion.h1> */}
        <h1 className="text-6xl font-bold mb-12 text-white">
          {heading.map((word, index) => (
            <TextWord word={word} index={index} key={index} />
          ))}
        </h1>
        <motion.form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto my-10" variants={itemVariants}>
            <input
                {...register("email", { required: true })}
                placeholder="Email Address"
                className="w-full p-4 mb-4 border border-white rounded-none bg-[#000000] text-white"
            />
            {errors.email && <span className="text-red-500">Email is required</span>}

            <input
                {...register("fullName", { required: true })}
                placeholder="Full Name"
                className="w-full p-4 mb-4 border border-white rounded-none bg-[#000000] text-white"
            />
            {errors.fullName && <span className="text-red-500">Full name is required</span>}

            <input
                {...register("companyName")}
                placeholder="Company/Brand Name"
                className="w-full p-4 mb-4 border border-white rounded-none bg-[#000000] text-white"
            />

            <textarea
                {...register("projectDetails", { required: true })}
                placeholder="Describe Your Project/Brand"
                className="w-full p-4 mb-4 border border-white rounded-none bg-[#000000] text-white h-32"
            />
            {errors.projectDetails && <span className="text-red-500">Project details are required</span>}

            <div className="flex items-center mb-4">
                <input
                    {...register("newsletter")}
                    type="checkbox"
                    className="mr-2"
                />
                <span className="text-white">Subscribe to Newsletter</span>
            </div>

            <button type="submit" className="mt-8 text-white bg-[#000000] border rounded-full border-white py-3 px-6 hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out">
                Request Your Free Audit
            </button>
        </motion.form>
      </motion.div>
      <motion.div initial="hidden"
        whileInView="visible"
        viewport={{ once: false }} // Add this if you want the animation to run only once
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="basis-1/2">
        <AuditDescription />
      </motion.div>
    </div>
  );
};

