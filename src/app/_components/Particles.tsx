import { ScrollScene, UseCanvas } from '@14islands/r3f-scroll-rig';
import { Point, Points } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

const particleColors = ['#673ab7', '#f4b677', 'orange', 'blue', '#8bc34a', 'purple'];

function Particles({ size = 5000, scrollState }) {
  const { viewport } = useThree();
  const pointsRef = useRef();

  // Update particles based on scroll
  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.position.y = -scrollState.progress * viewport.height;
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
