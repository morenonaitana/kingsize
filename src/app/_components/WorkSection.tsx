"use client";
import { motion, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { ExploreWork, useTrackerMotionValue } from '.';
import { useTracker } from '@14islands/r3f-scroll-rig';

function HorizontalMarquee() {
  const el = useRef()
  const tracker = useTracker(el)
  const progress = useTrackerMotionValue(tracker)

  const x = useTransform(progress, [0, 1], ['-20vw', '-80vw'])

  return (
    <section ref={el} className="Marquee Debug">
      <motion.div style={{ x }}>
        <h1 className="text-white text-8xl w-full break-normal">UNLOCK&nbsp;YOUR&nbsp;COMPLENTARY&nbsp;DIGITAL&nbsp;AUDIT&nbsp;|&nbsp;UNLOCK&nbsp;YOUR&nbsp;COMPLENTARY&nbsp;DIGITAL&nbsp;AUDIT</h1>
      </motion.div>
    </section>
  )
}

function HorizontalMarqueeReverse() {
  const el = useRef()
  const tracker = useTracker(el)
  const progress = useTrackerMotionValue(tracker)

  const x = useTransform(progress, [0, 1], ['-40vw', '0vw'])

  return (
    <section ref={el} className="Marquee Debug">
      <motion.div style={{ x }}>
        <h1 className="text-white text-8xl w-full break-normal">UNLOCK&nbsp;YOUR&nbsp;COMPLENTARY&nbsp;DIGITAL&nbsp;AUDIT&nbsp;|&nbsp;UNLOCK&nbsp;YOUR&nbsp;COMPLENTARY&nbsp;DIGITAL&nbsp;AUDIT</h1>
      </motion.div>
    </section>
  )
}

function VerticalParallax({ children, src }) {
  const el = useRef()
  const tracker = useTracker(el)
  const progress = useTrackerMotionValue(tracker)

  const textY = useTransform(progress, [0, 1], ['25%', '-25%'])
  const imageY = useTransform(progress, [0, 1], ['-25vh', '25vh'])

  return (
    <section ref={el} className="VerticalParallax Debug flex relative">
      <motion.img src={src} className="Image max-w-[720px]" style={{ y: imageY }}>
      </motion.img>
      <motion.div className="VerticalParallaxMotion" style={{ y: textY }}>
        <h2 className="text-white text-8xl ml-20">{children}</h2>
      </motion.div>
    </section>
  )
}

function VerticalParallaxReverse({ children, src }) {
  const el = useRef()
  const tracker = useTracker(el)
  const progress = useTrackerMotionValue(tracker)

  const textY = useTransform(progress, [0, 1], ['25%', '-25%'])
  const imageY = useTransform(progress, [0, 1], ['-25vh', '25vh'])

  return (
    <section ref={el} className="VerticalParallax Debug flex relative">
      <motion.div className="VerticalParallaxMotion" style={{ y: textY }}>
        <h2 className="text-white text-8xl mr-20">{children}</h2>
      </motion.div>
      <motion.img src={src} className="Image max-w-[720px]" style={{ y: imageY }}>
      </motion.img>
    </section>
  )
}

interface IButton {
  text: string;
  link: string;
}

export const Button = ({text, link}: IButton )=> (
  <a
    className="text-sm z-9000 bg-transparent border rounded-full border-white py-3 px-6 text-white hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out"
    href={link}
  >
    {text} →
  </a>
)

export const WorkSection = () => {

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div className="mx-auto my-12 w-full">
      <div className="container m-auto flex flex-col justify-center items-center">
        <ExploreWork />
        <div>
          <VerticalParallaxReverse src="/mosaert.webp">
            Moasaert
            <br />
            <span className="text-4xl font-extralight leading-tight">/Digital</span>
            <br />
            <p className="text-sm mt-4 max-w-[420px]">Mosaert is a creative label founded by Stromae, Coralie Barbier & Luc Junior Tam. We’re currently working as their official digital agency since 2018.</p>
            <Button text="See Project" link="https://kingsize.co/works/mosaert/" />
          </VerticalParallaxReverse>
          <div className="mt-[400px]">
            <VerticalParallax src="/ph-2.webp">
              PH - Collection
              <br />
              <span className="text-4xl font-extralight">/Digital</span>
              <br />
              <p className="text-sm mt-4 max-w-[420px]">PH Collection is a high-end furniture creation and distribution company. We had the task of modernizing and offering personalized tools such as the integration of a map with all the resellers.</p>
              <Button text="See Project" link="https://kingsize.co/works/ph-collection/" />
            </VerticalParallax>
          </div>
          <div className="mt-[400px]">
            <VerticalParallaxReverse src="/focusbite.webp">
              Teasquares
              <br />
              <span className="text-4xl font-extralight">/Branding/Packaging</span>
              <br />
              <p className="text-sm mt-4 max-w-[420px]">Teasquares is an American energy bar company. Our client needed a visual universe in order to launch his products.</p>
              <Button text="See Project" link="https://kingsize.co/works/teasquares/" />
            </VerticalParallaxReverse>
          </div>
          <div className="mt-[400px]">
            <VerticalParallax src="/squad.webp">
              Squad
              <br />
              <span className="text-4xl font-extralight">/Digital</span>
              <br />
              <p className="text-sm mt-4 max-w-[420px]">Squad is an intensive fitness club that reinvents the way of training. A purely digital mission, we have transposed the brand image to a purely digital medium.</p>
              <Button text="See Project" link="https://kingsize.co/works/squad/" />
            </VerticalParallax>
          </div>
          <div className="mt-[400px] mb-[200px]">
            <VerticalParallaxReverse src="/sweet-lemon.webp">
              Sweet Lemon
              <br />
              <span className="text-4xl font-extralight">/Branding</span>
              <br />
              <p className="text-sm mt-4 max-w-[420px]">Sweet Lemon is a trendy & well-known shoe brand in Belgium. They needed a boost in their communication.</p>
              <Button text="See Project" link="https://kingsize.co/works/sweet-lemon/" />
            </VerticalParallaxReverse>
          </div>
        </div>
        <motion.a
          variants={textVariants}
          href="#audit-section"
          className="mb-[100px] z-9000 mt-8 bg-transparent border rounded-full border-white py-3 px-6 text-white hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out"
        >
          Explore All Projects →
        </motion.a>
      </div>
      <div className="mb-[20px] py-4 w-full">
        <HorizontalMarquee>R3F Scroll Rig</HorizontalMarquee>
        <HorizontalMarqueeReverse>R3F Scroll Rig</HorizontalMarqueeReverse>
      </div>
    </div>
  );
};

