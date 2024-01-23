"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { TweenMax, Power2, Power3, Elastic } from 'gsap';
import { createNoise2D } from 'simplex-noise';
import { Canvas, useFrame } from '@react-three/fiber';

export const DigitalLandscape = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene, Camera, and Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Geometry
        const planeGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        const plane = new THREE.Mesh(planeGeometry, material);
        scene.add(plane);

        // Camera position
        camera.position.z = 5;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            // Animation logic
            plane.rotation.x += 0.01;
            plane.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
};

export const DotFaceModel = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene, Camera, Renderer setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Creating a group to hold all the dots
        const faceGroup = new THREE.Group();

        // Function to create a dot
        const createDot = (x, y, z) => {
            const geometry = new THREE.SphereGeometry(0.05, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(x, y, z);
            faceGroup.add(sphere);
        };

        // Creating dots for a simple face
        // Eyes
        createDot(-0.2, 0.1, 0);
        createDot(0.2, 0.1, 0);
        
        // Mouth
        createDot(-0.15, -0.1, 0);
        createDot(-0.05, -0.15, 0);
        createDot(0.05, -0.15, 0);
        createDot(0.15, -0.1, 0);

        scene.add(faceGroup);
        camera.position.z = 1;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        // Resize handling
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default DotFaceModel;

export const MovingGrid = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Camera position and orientation
        camera.position.set(0, 30, 0);
        camera.lookAt(0, 0, -1);

        // Grid setup with larger squares
        const gridScale = 10; // Adjust grid square size
        const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 100 / gridScale, 100 / gridScale);
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });

        const grid = new THREE.Mesh(planeGeometry, planeMaterial);
        grid.rotation.x = -Math.PI / 2; // Rotate the grid to lie flat

        scene.add(grid);

        // Animation
        const moveSpeed = 0.5; // Adjust for faster grid movement
        const animate = () => {
            requestAnimationFrame(animate);

            // Move the grid to simulate forward motion
            grid.position.z += moveSpeed;
            if (grid.position.z > 50) {
                grid.position.z -= 100;
            }

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export const Landscape = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color('#000')); // Set background color
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Sun
        const sunGeometry = new THREE.CircleGeometry(5, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffe577 });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        sun.position.set(0, 5, -20);
        scene.add(sun);

        // Grid field
        const gridHelper = new THREE.GridHelper(200, 50, 0xff00ff, 0x303030);
        gridHelper.position.y = -1;
        scene.add(gridHelper);

        // Rocks on the side
        const rockGeometry = new THREE.TetrahedronGeometry(1, 0);
        const rockMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true });
        for (let i = 0; i < 50; i++) {
            const rock = new THREE.Mesh(rockGeometry, rockMaterial);
            rock.position.set(Math.random() * 100 - 50, 0, Math.random() * -50);
            scene.add(rock);
        }

        // Camera position
        camera.position.z = 5;

        // Animation
        let frame = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            frame = frame <= 100 ? frame + 0.05 : 0;

            // Move the grid to simulate forward motion
            gridHelper.position.z = frame;

            // Animate the sun to change intensity
            const scale = 1 + Math.sin(frame) * 0.1;
            sun.scale.set(scale, scale, scale);

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
};

export const BubbleComponent = () => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      // Setup
      const canvas = document.createElement('canvas');
      const width = window.innerWidth,
          height = window.innerHeight;
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.setClearColor(0xebebeb, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMapSoft = true;
  
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x000000, 10, 950);
  
      const aspectRatio = width / height;
      const fieldOfView = 100;
      const nearPlane = 0.1;
      const farPlane = 10000;
      const camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
      );
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 300;
  
      // Lights
      // ... your lights setup
  
      // Bubble
      const vertex = width > 575 ? 80 : 40;
      const bubbleGeometry = new THREE.SphereGeometry(120, vertex, vertex);
      let bubble;
  
      const vertices = bubbleGeometry.attributes.position.array;
      const originalVertices = [];
      for (let i = 0; i < vertices.length; i += 3) {
        originalVertices.push(new THREE.Vector3(vertices[i], vertices[i+1], vertices[i+2]));
      }
  
      const bubbleMaterial = new THREE.MeshStandardMaterial({
        emissive: 0xbd4be3,
        emissiveIntensity: 0.5,
        roughness: 0.61,
        metalness: 0.21,
        side: THREE.FrontSide,
      });
  
      bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      bubble.castShadow = true;
      bubble.receiveShadow = false;
      scene.add(bubble);
  
      // Plane
      // ... plane setup
  
      // Mouse
      const mouse = new THREE.Vector2(0, 0);
      // ... mouse event handlers
  
      // Spring
      const spring = { scale: 1 };
      // ... spring event handlers
  
      // Resize
      const onResize = () => {
        // ... resize code
      };
  
      // Noise
      const noise = createNoise2D();
      const dist = new THREE.Vector2(0, 0);
      const distance = (pointA, pointB) => {
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        return Math.sqrt(dx * dx + dy * dy);
      };
      const maxDist = distance(mouse, { x: width / 2, y: height / 2 });
      const updateVertices = (time) => {
        const vertices = bubbleGeometry.attributes.position.array;
        for (let i = 0, j = 0; i < vertices.length; i += 3, j++) {
          const originalVertex = originalVertices[j];
          const perlin = noise2D(
            (originalVertex.x * 0.006) + (time * 0.0005),
            (originalVertex.y * 0.006) + (time * 0.0005)
          );
          const ratio = ((perlin * 0.3 * (dist + 0.1)) + 0.8);
          vertices[i] = originalVertex.x * ratio;
          vertices[i+1] = originalVertex.y * ratio;
          vertices[i+2] = originalVertex.z * ratio;
        }
        bubbleGeometry.attributes.position.needsUpdate = true;
      };
  
      // Animate
      const render = (a) => {
        requestAnimationFrame(render);
        // ... animation code
        renderer.render(scene, camera);
      };
      requestAnimationFrame(render);
  
      // Append canvas to ref
      canvasRef.current.appendChild(renderer.domElement);

      const onMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        // ... other logic if necessary
      };
  
      // Event listeners
      window.addEventListener('resize', onResize);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onMouseMove);
    //   window.addEventListener('mousedown', clicking.down);
    //   window.addEventListener('touchstart', clicking.down);
    //   window.addEventListener('mouseup', clicking.up);
    //   window.addEventListener('touchend', clicking.up);
  
      return () => {
        // Cleanup
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('touchmove', onMouseMove);
        // window.removeEventListener('mousedown', clicking.down);
        // window.removeEventListener('touchstart', clicking.down);
        // window.removeEventListener('mouseup', clicking.up);
        // window.removeEventListener('touchend', clicking.up);
        canvasRef.current.removeChild(canvas);
      };
    }, []);
  
    return <div ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
  };


  export const ColorFieldComponent = () => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      // Basic setup
      const canvas = document.createElement('canvas');
      const width = window.innerWidth, height = window.innerHeight;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(width, height);
  
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 50;
  
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 0.5);
      camera.add(pointLight);
  
      // Plane Geometry
      const planeGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);
      const planeMaterial = new THREE.MeshLambertMaterial({ vertexColors: true });
      const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
      planeMesh.rotation.x = -Math.PI / 2;
      scene.add(planeMesh);
  
      const noise2D = createNoise2D();
      let time = 0;
  
      // Update Plane
      const updatePlane = () => {
        const vertices = planeMesh.geometry.attributes.position.array;
        for (let i = 0; i < vertices.length; i += 3) {
          const x = vertices[i];
          const y = vertices[i + 1];
          const z = vertices[i + 2];
          vertices[i + 2] = noise2D(x * 0.1 + time, y * 0.1 + time) * 5;
        }
        planeMesh.geometry.attributes.position.needsUpdate = true;
        planeMesh.geometry.computeVertexNormals();
      };
  
      // Animate
      const animate = () => {
        requestAnimationFrame(animate);
        time += 0.01;
        updatePlane();
        renderer.render(scene, camera);
      };
      animate();
  
      // Append canvas to ref
      canvasRef.current.appendChild(renderer.domElement);
  
      return () => {
        if (canvasRef.current && canvas) {
            canvasRef.current.removeChild(canvas);
          }
      };
    }, []);
  
    return <div ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
  };

  export const AnimatedSquare = () => {
    const squareRef = useRef();
    let scaleDirection = 1;
    let rotationSpeed = 0.01;
  
    useFrame((state, delta) => {
      const mesh = squareRef.current;
  
      // Update rotation
      mesh.rotation.x += rotationSpeed;
      mesh.rotation.y += rotationSpeed;
  
      // Update scale
      if (mesh.scale.x > 2 || mesh.scale.x < 1) {
        scaleDirection *= -1; // Change scale direction
        rotationSpeed *= -1.1; // Increase rotation speed and change direction
      }
      mesh.scale.x += scaleDirection * delta;
      mesh.scale.y += scaleDirection * delta;
      mesh.scale.z += scaleDirection * delta;
    });
  
    return (
      <mesh ref={squareRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'royalblue'} />
      </mesh>
    );
  };
  
  export const SquareScene = () => {
    return (
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSquare />
      </Canvas>
    );
  };