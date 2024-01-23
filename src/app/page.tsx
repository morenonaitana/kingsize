"use client";
import React, { useEffect, useRef, useState } from "react";
import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { Effects, Scroll, ScrollControls } from '@react-three/drei';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import AnimatedCursor from "react-animated-cursor";
import { loadSlim } from "@tsparticles/slim";
import styles from './page.module.css';
import { WaterPass, GlitchPass } from 'three-stdlib'
import { HomeBanner, Navigation, VisionSection, FullImageSection, WhatWeDoSection, AuditSection, ExploreWork, WorkSection, Footer, ParticlesScene, Stars, StarsScene, VideoCubeScene } from "@components";

import "@14islands/r3f-scroll-rig/css";

extend({ WaterPass, GlitchPass })

function Postpro() {
  const ref = useRef()
  useFrame((state) => (ref.current.time = state.clock.elapsedTime * 3))
  return (
    <Effects>
      <waterPass ref={ref} factor={0.5} />
      {/* <glitchPass /> */}
    </Effects>
  )
}

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full overflow-hidden">
      <GlobalCanvas globalRender={false} style={{ zIndex: -1 }}>
        <ambientLight intensity={3.0} />
        {/* <Postpro /> */}
      </GlobalCanvas>
      <AnimatedCursor
        innerSize={12}
        outerSize={60}
        color='255, 255, 255'
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
        outerStyle={{
          mixBlendMode: 'exclusion'
        }} />
      <SmoothScrollbar>
      {(bind) => (
          <div className="container flex flex-col items-center justify-center gap-12 pb-16 w-full" {...bind}>
            {/* <StarsScene /> */}
            <Navigation />
            <HomeBanner />
            <VisionSection />
            <WhatWeDoSection />
            <WorkSection />
            {/* <VideoCubeScene /> */}
            <AuditSection />
            <Footer />
          </div>
      )}
      </SmoothScrollbar>
    </main>
  );
}
