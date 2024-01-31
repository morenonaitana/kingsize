import React, { useEffect, useRef, useState } from 'react'
import { ScrollScene, UseCanvas, useScrollbar, useScrollRig, styles, useImageAsTexture, useTracker } from '@14islands/r3f-scroll-rig'
import { extend, useFrame, Canvas } from '@react-three/fiber'
import { MeshWobbleMaterial, shaderMaterial, Points, PointMaterial } from '@react-three/drei'
import { a, useSpring, config } from '@react-spring/three'
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import * as random from 'maath/random/dist/maath-random.esm'

export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined
  },
  ` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  ` varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }`
)

extend({ ImageFadeMaterial })

export const ImageCube = ({ src, ...props }) => {
  const el = useRef()
  const img = useRef()
  const { hasSmoothScrollbar } = useScrollRig()
  return (
    <>
      <div ref={el} {...props}>
        <img
          className={styles.hiddenWhenSmooth}
          ref={img}
          src={src}
          loading="eager"
          decode="async"
          alt="Texture Cube"
        />
      </div>

      {hasSmoothScrollbar && (
        <UseCanvas debug={false}>
          <ScrollScene track={el}>{(props) => <WebGLCube img={img} {...props} />}</ScrollScene>
        </UseCanvas>
      )}
    </>
  )
}

export const DodecaScene = () => {
  // const { height, width } = useThree((state) => state.viewport)
  const el = useRef()
  return (
    <section className="w-full flex justify-end h-[200px]">
      <div ref={el} className="Placeholder ScrollScene w-[400px] h-[400px] mr-80"></div>
      <UseCanvas>
        <ScrollScene track={el}>{(props) => (
        <Dodeca {...props} />
        )}</ScrollScene>
      </UseCanvas>
    </section>
  )
}

const Dodeca = ({ scale, scrollState }) => {
  const mesh = useRef()
  useFrame(() => {
    mesh.current.rotation.y = scrollState.progress * Math.PI * 1.3
    const yOffset = (scrollState.progress - 0.35) * 5; // Example: 5 units of movement
    mesh.current.position.y = yOffset;
  })
  return (
    <group scale={scale.xy.min() * 0.5}>
      <mesh ref={mesh}>
        <coneGeometry args={[1, 1, 6]} />
        <meshNormalMaterial />
        {/* <meshBasicMaterial color="rgb(10, 20, 30)" /> */}
        {/* <meshPhysicalMaterial transparent color="white" wireframe /> */}
      </mesh>
    </group>
  )
}

export const DodecaSceneSmall = () => {
  // const { height, width } = useThree((state) => state.viewport)
  const el = useRef()
  return (
    <section className="w-full flex justify-end h-[200px]">
      <div ref={el} className="Placeholder ScrollScene w-[200px] h-[200px] mr-80"></div>
      <UseCanvas>
        <ScrollScene track={el}>{(props) => (
        <DodecaSmall {...props} />
        )}</ScrollScene>
      </UseCanvas>
    </section>
  )
}

const DodecaSmall = ({ scale, scrollState }) => {
  const mesh = useRef()
  useFrame(() => {
    mesh.current.rotation.y = scrollState.progress * Math.PI * 3
    const yOffset = (scrollState.progress - 0.5) * 8; // Example: 5 units of movement
    mesh.current.position.y = yOffset;
  })
  return (
    <group scale={scale.xy.min() * 0.5}>
      <mesh ref={mesh}>
        <torusGeometry />
        <meshNormalMaterial />
        {/* <meshBasicMaterial color="rgb(10, 20, 30)" /> */}
        {/* <meshPhysicalMaterial transparent color="white" wireframe /> */}
      </mesh>
    </group>
  )
}

const WebGLCube = ({ img, scale, inViewport }) => {
  const mesh = useRef()
  const texture = useImageAsTexture(img)
  const { scroll } = useScrollbar()

  useFrame((_, delta) => {
    mesh.current.material.factor += scroll.velocity * 0.005
    mesh.current.material.factor *= 0.95
  })

  const spring = useSpring({
    scale: inViewport ? scale.times(1) : scale.times(0.8),
    config: inViewport ? config.wobbly : config.stiff,
    delay: inViewport ? 200 : 0
  })

  return (
    <a.mesh ref={mesh} {...spring}>
      <boxGeometry args={[1, 1, 0.5, 64, 64]} />
      <MeshWobbleMaterial
        factor={0}
        speed={2}
        color="#fff"
        map={texture}
        roughness={0.14}
        metalness={0}
        // render on top of the webgl background plane which is also transparent
        // transparent
        depthTest={false}
      />
    </a.mesh>
  )
}

  export const ExploreWork = () => {
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
      <div className="" ref={el} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '22vw', paddingBottom: '14vw' }}>
          <motion.div style={{ y, opacity, scale, width: '100%' }}>
            <h1
              className="text-white text-7xl font-bold text-center leading-relaxed">
               Explore Our Work
            </h1>
        </motion.div>
      </div>
    )
  }

  export const Stars = (props) => {
    const ref = useRef()
    const { scrollY } = useScroll();
    const [sphere] = useState(() => random.inSphere(new Float32Array(500), { radius: 1.5 }))
    const prevScrollY = useRef(0);
    useFrame((state, delta) => {
      const deltaScrollY = scrollY.current - prevScrollY.current;
      // Update the rotation based on the difference in scroll position
      ref.current.rotation.x += deltaScrollY * 0.0001; // Adjust these values for desired speed
      ref.current.rotation.y += deltaScrollY * 0.0001;
      prevScrollY.current = scrollY.current;
    })
    return (
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
          <PointMaterial transparent color="#ffa0e0" size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
    )
  }
  
  export const StarsScene = () => {
    return (
      <div className="fixed pointer-events-none w-full h-full top-0 left-0">
        <Canvas camera={{ position: [0, 0, 1] }} style={{ pointerEvents: 'none' }}>
          <Stars />
        </Canvas>
      </div>
    )
  }

  // export const DistortMesh = ({src}) => {
//     const el = useRef()
//     const texture = useLoader(TextureLoader, src);
//     return (
//       <>
//         <div ref={el} className="Placeholder ScrollScene h-[478px] w-[720px] m-auto"></div>
//         <UseCanvas>
//           <ambientLight intensity={0.5} />
//           <pointLight position={[10, 10, 10]} />
//           <ScrollScene track={el}>
//             {(props) => (
//               <mesh {...props}>
//               <planeGeometry args={[1, 1, 16, 16]} />
//               <MeshDistortMaterial speed={2} distort={0.1} map={texture} />
//             </mesh>
//             )}
//           </ScrollScene>
//         </UseCanvas>
//       </>
//     )
//   }