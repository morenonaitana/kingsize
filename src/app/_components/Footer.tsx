"use client";
import { useScrollbar, useTracker } from '@14islands/r3f-scroll-rig';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

export const Footer = () => {

    return (
      <div className="relative flex items-left justify-start flex-col w-full overflow-hidden">
        <div className="container pb-24 text-6xl flex flex-col pointer-events-auto mx-auto px-4 sm:px-6 lg:px-8 gap-8">
              <p className="text-white hover:opacity-50">hello@kingsize.co</p>
              <p className="text-white hover:opacity-50">+32 (0) ‭473 65 30 09‬</p>
          </div>
        <div className="container flex flex-row justify-start items-center text-center pointer-events-auto mx-auto px-4 sm:px-6 lg:px-8 gap-8">
            <Image width={40} height={40} src="/kingsize-logo-2.png" />
            <p className="text-white">© Kingsize. All Fucking Rights Reserved.</p>
        </div>
      </div>
    );
  };

  export const Footers = () => {
    const el = useRef()
    const { onScroll } = useScrollbar()
    const { scrollState } = useTracker(el)
    const progress = useMotionValue(0)
  
    useEffect(() => {
      return onScroll(() => progress.set(scrollState.visibility))
    }, [onScroll, progress, scrollState])
  
    const y = useTransform(progress, [0, 1], ['-100%', '0%'])
    const opacity = useTransform(progress, [0, 1], [0, 1])
    const scale = useTransform(progress, [0, 1], [0.9, 1])
  
    return (
      <div className="" ref={el} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '22vw', paddingBottom: '10vw' }}>
          <motion.div style={{ y, opacity, scale, width: '100%' }}>
          <div className="container text-6xl flex flex-col justify-center items-center text-center pointer-events-auto mx-auto px-4 sm:px-6 lg:px-8 gap-8">
              <p className="text-white">hello@kingsize.co</p>
              <p className="text-white">+32 (0) ‭473 65 30 09‬</p>
          </div>
        </motion.div>
      </div>
    )
  }