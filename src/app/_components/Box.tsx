"use client";
import { useRef, useState, useMemo } from 'react'
import { Color, Vector3 } from 'three'
import { Text, Stats } from '@react-three/drei'
import { Canvas, useThree, useFrame } from '@react-three/fiber'

function Rig() {
    const { camera, mouse } = useThree()
    const vec = new Vector3()
  
    return useFrame(() => {
      camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.05)
      camera.lookAt(0, 0, 0)
    })
  }

export const Box = ({ text, ...props }) => {
  const ref = useRef()
  const black = useMemo(() => new Color('black'), [])
  const lime = useMemo(() => new Color('lime'), [])
  const [hovered, setHovered] = useState(false)

  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2.5
    const y = (mouse.y * viewport.height) / 2.5
    ref.current.lookAt(x, y, 1)
    ref.current.material.color.lerp(hovered ? lime : black, 0.05)
  })

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={lime} />
      <Text fontSize={0.5} position-z={0.501}>
        {text}
      </Text>
      {props.children}
    </mesh>
  )
}

export const BoxRender = () => {
    return (
      <div style={{ width: "100%", height: "800px" }}>
      <Canvas camera={{ position: [0, 0, 6] }}>
      <directionalLight position={[0, 0, 1]} />
      {/* {[...Array(4).keys()].map((i) => (
        <group key={i * 6}>
          <Box position={[-5, -3 + i * 1.5, 0]} text={'E'} />
          <Box position={[-3, -3 + i * 1.5, 0]} text={'L'} />
          <Box position={[-1, -3 + i * 1.5, 0]} text={'E'} />
          <Box position={[1, -3 + i * 1.5, 0]} text={'V'} />
          <Box position={[3, -3 + i * 1.5, 0]} text={'A'} />
          <Box position={[5, -3 + i * 1.5, 0]} text={'T'} />
        </group>
      ))} */}
      <group>
          <Box position={[-4, -2 + 0 * 1.5, 0]} text={'E'} />
          <Box position={[-3, -2 + 0 * 1.5, 0]} text={'L'} />
          <Box position={[-2, -2 + 0 * 1.5, 0]} text={'E'} />
          <Box position={[-1, -2 + 0 * 1.5, 0]} text={'V'} />
          <Box position={[1, -2 + 0 * 1.5, 0]} text={'A'} />
          <Box position={[2, -2 + 0 * 1.5, 0]} text={'T'} />
          <Box position={[3, -2 + 0 * 1.5, 0]} text={'I'} />
          <Box position={[4, -2 + 0 * 1.5, 0]} text={'N'} />
          <Box position={[5, -2 + 0 * 1.5, 0]} text={'G'} />
        </group>
      <Rig />
      <Stats />
    </Canvas>
      </div>
    )
  }