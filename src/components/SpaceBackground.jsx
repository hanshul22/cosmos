import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Sphere, Stars, Cloud, Environment, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

function Planet({ position, size, rotation, color, hasRings = false }) {
  const meshRef = useRef();
  const ringsRef = useRef();

  const ringGeometry = useMemo(() => {
    if (!hasRings) return null;
    const geometry = new THREE.RingGeometry(size * 1.5, size * 2, 64);
    geometry.rotateX(Math.PI / 2);
    return geometry;
  }, [size, hasRings]);

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * rotation;
    if (hasRings && ringsRef.current) {
      ringsRef.current.rotation.z += delta * rotation * 0.5;
    }
  });

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[size, 64, 64]}>
        <meshStandardMaterial
          color={color}
          roughness={0.8}
          metalness={0.2}
          normalScale={[0.5, 0.5]}
        />
      </Sphere>
      {hasRings && (
        <mesh ref={ringsRef} geometry={ringGeometry}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      <Cloud
        opacity={0.5}
        speed={0.4}
        width={size * 4}
        depth={size * 0.5}
        segments={20}
      />
    </group>
  );
}

function Nebula({ position, color, scale = 1 }) {
  const cloudRef = useRef();

  useFrame((state, delta) => {
    cloudRef.current.rotation.z += delta * 0.1;
  });

  return (
    <group position={position} scale={scale}>
      <Cloud
        ref={cloudRef}
        opacity={0.25}
        speed={0.1}
        width={20}
        depth={5}
        segments={40}
        color={color}
      />
    </group>
  );
}

function SpaceBackground() {
  return (
    <Canvas
      className="absolute inset-0 -z-10"
      camera={{ position: [0, 0, 20], fov: 60 }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#0B0D17']} />
      <fog attach="fog" args={['#0B0D17', 30, 60]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <Stars
        radius={100}
        depth={50}
        count={7000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <Planet 
        position={[8, 4, -15]}
        size={2.5}
        rotation={0.2}
        color="#64FFDA"
        hasRings={true}
      />
      
      <Planet 
        position={[-10, -5, -20]}
        size={3.5}
        rotation={0.15}
        color="#FF6B6B"
      />
      
      <Planet 
        position={[0, -8, -25]}
        size={5}
        rotation={0.1}
        color="#7B89E4"
        hasRings={true}
      />

      <Nebula
        position={[-15, 10, -30]}
        color="#FF6B6B"
        scale={2}
      />

      <Nebula
        position={[15, -15, -35]}
        color="#7B89E4"
        scale={2.5}
      />

      <Environment preset="night" />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}

export default SpaceBackground;