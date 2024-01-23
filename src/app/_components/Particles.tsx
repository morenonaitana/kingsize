// import { Point, Points } from '@react-three/drei'
// import { useThree } from '@react-three/fiber'
// import React from 'react'

// const particleColors = ['#673ab7', '#f4b677', 'orange', 'blue', '#8bc34a', 'purple']

// export const Particles = ({ size = 5000 }) => {
//   const { width, height } = useThree((state) => state.viewport)

//   return (
//     <Points limit={size}>
//       <pointsMaterial size={0.05} vertexColors />
//       {Array.from({ length: size }).map((_, i) => (
//         <Point
//           key={i}
//           position={[(0.5 - Math.random()) * width * 2, 0.5 * height + Math.random() ** 0.25 * height * -3, (0.5 - Math.random()) * 25]}
//           color={particleColors[Math.floor(Math.random() * (particleColors.length - 1))]}
//         />
//       ))}
//     </Points>
//   )
// }

import { ScrollScene, UseCanvas } from '@14islands/r3f-scroll-rig';
import { Point, Points } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';

const particleColors = ['#673ab7', '#f4b677', 'orange', 'blue', '#8bc34a', 'purple'];

function Particles({ size = 5000, scrollState }) {
  const { viewport } = useThree();
  const pointsRef = useRef();

  // Update particles based on scroll
  useFrame(() => {
    if (pointsRef.current) {
      // Example: Move particles based on scroll
      pointsRef.current.position.y = -scrollState.progress * viewport.height;
      // pointsRef.current.position.y = 100;
      console.log("🚀 ~ useFrame ~ pointsRef.current.position.y:", pointsRef.current.position.y)
    }
  });

  return (
    <Points ref={pointsRef} limit={size}>
      <pointsMaterial size={0.05} vertexColors />
      {Array.from({ length: size }).map((_, i) => (
        <Point
          key={i}
          position={[(0.5 - Math.random()) * viewport.width * 2, Math.random() * viewport.height * 2, (0.5 - Math.random()) * 25]}
          color={particleColors[Math.floor(Math.random() * (particleColors.length - 1))]}
        />
      ))}
    </Points>
  );
}

const ParticlesScene = () => {
  // const { height, width } = useThree((state) => state.viewport)
  const el = useRef()
  return (
    <section className="w-full flex justify-end h-full absolute top-0 left-0 bg-[#333]">
      <div ref={el} className="Placeholder ScrollScene w-full h-[400px]"></div>
      <UseCanvas>
        <ScrollScene track={el}>{(props) => (
        <Particles {...props} />
        )}</ScrollScene>
      </UseCanvas>
    </section>
  )
}

export { Particles, ParticlesScene };
