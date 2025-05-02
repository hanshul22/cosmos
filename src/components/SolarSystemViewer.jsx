import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import styled from 'styled-components';

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #0B0D17;

  .info-panel {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(11,13,23,0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(123,137,228,0.2);
    border-radius: 12px;
    padding: 20px;
    color: white;
    width: 300px;
    transform: translateX(${props => props.show ? '0' : '320px'});
    transition: transform 0.3s ease;

    h3 {
      font-family: 'Orbitron', sans-serif;
      margin: 0 0 15px;
      color: #7B89E4;
    }

    .info-grid {
      display: grid;
      gap: 10px;
    }

    .info-item {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 10px;
      font-size: 0.9rem;

      .label {
        color: #94a3b8;
      }

      .value {
        color: #fff;
      }
    }
  }

  .legend {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background: rgba(11,13,23,0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(123,137,228,0.2);
    border-radius: 12px;
    padding: 15px;
    color: white;
    display: flex;
    gap: 15px;

    .legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.8rem;
      color: #94a3b8;

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
    }
  }
`;

const PLANET_DATA = {
  mercury: {
    name: 'Mercury',
    radius: 0.383,
    distance: 5.7,
    orbitalPeriod: 0.24,
    color: '#A5A5A5',
    temperature: '167°C (average)',
    atmosphere: 'Minimal - Traces of Helium',
    features: 'Heavily cratered surface, Iron core',
    mass: '3.285 × 10^23 kg',
    diameter: '4,879 km',
    gravity: '3.7 m/s²',
    texture: '/textures/mercury.jpg'
  },
  venus: {
    name: 'Venus',
    radius: 0.949,
    distance: 10.8,
    orbitalPeriod: 0.62,
    color: '#E6B87C',
    temperature: '462°C (average)',
    atmosphere: 'CO2, Nitrogen',
    features: 'Volcanic activity, Dense atmosphere',
    mass: '4.867 × 10^24 kg',
    diameter: '12,104 km',
    gravity: '8.87 m/s²',
    texture: '/textures/venus.jpg'
  },
  earth: {
    name: 'Earth',
    radius: 1,
    distance: 15,
    orbitalPeriod: 1,
    color: '#4B6CB7',
    temperature: '15°C (average)',
    atmosphere: 'Nitrogen, Oxygen',
    features: 'Liquid water, Life, 1 moon',
    mass: '5.972 × 10^24 kg',
    diameter: '12,742 km',
    gravity: '9.81 m/s²',
    texture: '/textures/earth.jpg'
  },
  // Add other planets...
};

function Planet({ data, onClick }) {
  const meshRef = useRef();
  const orbitRef = useRef();
  const texture = useTexture(data.texture);
  
  useFrame((state, delta) => {
    // Rotate planet
    meshRef.current.rotation.y += delta * 0.5;
    
    // Orbit around sun
    const angle = state.clock.elapsedTime * (0.2 / data.orbitalPeriod);
    meshRef.current.position.x = Math.cos(angle) * data.distance;
    meshRef.current.position.z = Math.sin(angle) * data.distance;
  });

  return (
    <group>
      {/* Orbital path */}
      <line ref={orbitRef}>
        <bufferGeometry attach="geometry">
          {(() => {
            const points = [];
            for (let i = 0; i <= 64; i++) {
              const angle = (i / 64) * Math.PI * 2;
              points.push(Math.cos(angle) * data.distance, 0, Math.sin(angle) * data.distance);
            }
            return new THREE.BufferGeometry().setFromPoints(
              points.map((v, i) => new THREE.Vector3(points[i * 3], points[i * 3 + 1], points[i * 3 + 2]))
            );
          })()}
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#ffffff" opacity={0.2} transparent />
      </line>

      {/* Planet */}
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshStandardMaterial map={texture} />
        <Html distanceFactor={15}>
          <div style={{ 
            color: 'white', 
            background: 'rgba(11,13,23,0.8)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            transform: 'translateY(-20px)'
          }}>
            {data.name}
          </div>
        </Html>
      </mesh>
    </group>
  );
}

function Sun() {
  const sunRef = useRef();
  
  useFrame((state, delta) => {
    sunRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial color="#FDB813">
        <gradientTexture
          attach="map"
          stops={[0, 1]} // positions of color stops
          colors={['#FDB813', '#FFA500']} // colors at stop positions
        />
      </meshBasicMaterial>
      <pointLight intensity={1.5} distance={100} decay={2} />
    </mesh>
  );
}

function SolarSystemViewer() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <StyledContainer show={selectedPlanet !== null}>
      <Canvas camera={{ position: [0, 20, 40], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <OrbitControls 
          enablePan={false}
          minDistance={20}
          maxDistance={100}
        />
        
        <Sun />
        
        {Object.entries(PLANET_DATA).map(([key, data]) => (
          <Planet 
            key={key}
            data={data}
            onClick={() => setSelectedPlanet(data)}
          />
        ))}
      </Canvas>

      {/* Information Panel */}
      <div className="info-panel">
        {selectedPlanet && (
          <>
            <h3>{selectedPlanet.name}</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Distance from Sun</span>
                <span className="value">{selectedPlanet.distance} AU</span>
              </div>
              <div className="info-item">
                <span className="label">Orbital Period</span>
                <span className="value">{selectedPlanet.orbitalPeriod} Earth years</span>
              </div>
              <div className="info-item">
                <span className="label">Temperature</span>
                <span className="value">{selectedPlanet.temperature}</span>
              </div>
              <div className="info-item">
                <span className="label">Atmosphere</span>
                <span className="value">{selectedPlanet.atmosphere}</span>
              </div>
              <div className="info-item">
                <span className="label">Features</span>
                <span className="value">{selectedPlanet.features}</span>
              </div>
              <div className="info-item">
                <span className="label">Mass</span>
                <span className="value">{selectedPlanet.mass}</span>
              </div>
              <div className="info-item">
                <span className="label">Diameter</span>
                <span className="value">{selectedPlanet.diameter}</span>
              </div>
              <div className="info-item">
                <span className="label">Gravity</span>
                <span className="value">{selectedPlanet.gravity}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <div className="dot" style={{ background: '#FDB813' }} />
          <span>Sun</span>
        </div>
        <div className="legend-item">
          <div className="dot" style={{ background: '#ffffff', opacity: 0.2 }} />
          <span>Orbital Path</span>
        </div>
      </div>
    </StyledContainer>
  );
}

export default SolarSystemViewer;