import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { PurplePlanet } from "../components/PurplePlanet";
import OrbitingCards from "../components/OrbitingCard";
import { Stars } from "@react-three/drei";

const Skills = () => {
  const planetRef = useRef();
  const [dimensions, setDimensions] = useState({
    planetRadius: 3,
    orbitRadius: 6
  });

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth < 1024;
      
      setDimensions({
        planetRadius: isMobile ? 1.5 : isTablet ? 2.5 : 3,
        orbitRadius: isMobile ? 3 : isTablet ? 5 : 6
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rotate the planet
  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.01;
      planetRef.current.rotation.x += 0.002;
    }
  });

  return (
    <>
      <group 
        scale={dimensions.planetRadius} 
        ref={planetRef} 
        position={[0, 0, 0]} 
        userData={{ isPlanet: true }}
      >
        <PurplePlanet />
      </group>

      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      <OrbitingCards 
        planetRadius={dimensions.planetRadius} 
        orbitRadius={dimensions.orbitRadius} 
        use3DCards={false} 
      />

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
    </>
  );
};

export default Skills;