"use client";
import { useLayoutEffect, useEffect, useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { WaterPass } from "../effects/waterpass";
import {
        useMask,
        useGLTF,
        useAnimations,
        Float,
        Instance,
        Instances,
        Lightformer,
        Environment,
        MeshTransmissionMaterial,
    } from '@react-three/drei';

const spheres = [
    [1, 'white', 0.05, [-4, -1, -1]],
];

extend({ WaterPass });

export const AquariumRender = () => {
  return (
    <div style={{ width: "100%", height: "800px" }}>
    <Canvas shadows camera={{ position: [30, 0, -3], fov: 35, near: 1, far: 50 }}>
      {/* <color attach="background" args={['#000']} /> */}
      <Aquarium position={[0, 0.25, 0]}>
        <Float rotationIntensity={2} floatIntensity={10} speed={2}>
          <Turtle position={[0, -0.5, -1]} rotation={[0, Math.PI, 0]} scale={23} />
        </Float>
        <Instances renderOrder={-1000}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial depthTest={false} />
          {spheres.map(([scale, color, speed, position], index) => (
            <Sphere key={index} scale={scale} color={color} speed={speed} position={position} />
          ))}
        </Instances>
      </Aquarium>
      <Environment resolution={1024}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
            <Lightformer key={i} form="circle" intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[4, 1, 1]} />
          ))}
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
        </group>
      </Environment>
    </Canvas>
    </div>
  )
}

function Aquarium({ children, ...props }) {
  const ref = useRef()
  const childRef = useRef()
  const { nodes } = useGLTF('/shapes-transformed.glb')
  const stencil = useMask(1, false)
  useLayoutEffect(() => {
    // Apply stencil to all contents
    childRef.current.traverse((child) => child.material && Object.assign(child.material, { ...stencil }))
  }, [])
  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * (viewport.width / 2)) / 8
    const y = (mouse.y * (viewport.height / 2)) / 8
    ref.current.lookAt(x, y, 1)
  })
  return (
    <group {...props} dispose={null}>
      <mesh ref={ref} castShadow scale={[0.61 * 7, 0.8 * 7, 1 * 7]} geometry={nodes.Cube.geometry}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
      <group ref={childRef}>{children}</group>
    </group>
  )
}

function Sphere({ position, scale = 1, speed = 0.1, color = 'rgba[255,255,255,.5]' }) {
  return (
    <Float rotationIntensity={40} floatIntensity={20} speed={speed / 2}>
      <Instance position={position} scale={scale} color={color} />
    </Float>
  )
}

/*
Author: DigitalLife3D (https://sketchfab.com/DigitalLife3D)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/model-52a-kemps-ridley-sea-turtle-no-id-7aba937dfbce480fb3aca47be3a9740b
Title: Model 52A - Kemps Ridley Sea Turtle (no ID)
*/
function Turtle(props) {
  const { scene, animations } = useGLTF('/model_52a_-_kemps_ridley_sea_turtle_no_id-transformed.glb')
  const { actions, mixer } = useAnimations(animations, scene)
  useEffect(() => {
    mixer.timeScale = 0.5
    actions['Swim Cycle'].play()
  }, [])
  useFrame((state) => (scene.rotation.z = Math.sin(state.clock.elapsedTime / 4) / 2))
  return <primitive object={scene} {...props} />
}
