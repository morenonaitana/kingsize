import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig"
import { shaderMaterial, useTexture } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from 'three';

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

  const FadedImg = ({ scale, scrollState, src, srcHover }) => {
    const mesh = useRef()
    const ref = useRef()
    const [texture1, texture2, dispTexture] = useTexture([src, srcHover, "/texture-3.jpg"])
    const [hovered, setHover] = useState(false)
    useFrame(() => {
      // mesh.current.rotation.y = scrollState.progress * Math.PI * 3
      const yOffset = (scrollState.progress - 0.8) * 5; // Example: 5 units of movement
      mesh.current.position.y = yOffset;
      ref.current.dispFactor = THREE.MathUtils.lerp(ref.current.dispFactor, hovered ? 1 : 0, 0.075)
    })

    const aspectRatio = 16 / 9;
    const defaultScale = 1; // Default scale value
    const width = 1.5;
    const height =  1;

    return (
      <group>
        <mesh ref={mesh} onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)} scale={scale.xy.min() * 0.9}>
            <planeGeometry args={[width, height]} />
            <imageFadeMaterial ref={ref} tex={texture1} tex2={texture2} disp={dispTexture} toneMapped={false} />
        </mesh>
      </group>
    )
  }

export default function FadingImage({src, srcHover}) {
    const el = useRef()
    
    return (
      <div className="w-full h-[478px]">
        <div ref={el} className="Placeholder ScrollScene w-full h-full m-auto"></div>
        <UseCanvas>
          <ScrollScene track={el}>
            {(props) => <FadedImg src={src} srcHover={srcHover} {...props} /> }
          </ScrollScene>
        </UseCanvas>
      </div>
    )
  }