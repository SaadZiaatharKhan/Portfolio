import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import {
  c, cpp, java, python, javascript, typescript,
  html, css, bootstrap, tailwind_css, react, nextjs, shadcnui,
  nodejs, flask,
  firebase, supabase, mysql, mongodb,
  expo, electron,
  git, github, vscode, postman, docker, windows, linux
} from "../../constants/skillsAssets";

// Define skill categories using provided data
const skills = {
  0: {
    heading: "Languages",
    skills: [c, cpp, java, python, javascript, typescript],
    description: "Programming languages I use to bring ideas to life",
  },
  1: {
    heading: "Frontend",
    skills: [html, css, javascript, bootstrap, tailwind_css, react, nextjs, shadcnui],
    description: "Technologies for creating beautiful user interfaces",
  },
  2: {
    heading: "Backend",
    skills: [nodejs, nextjs, python, flask],
    description: "Server-side technologies for robust applications",
  },
  3: {
    heading: "Databases",
    skills: [firebase, supabase, mysql, mongodb],
    description: "Data storage and management solutions",
  },
  4: {
    heading: "Cross-platform applications",
    skills: [expo, react, electron],
    description: "Mobile and desktop applications",
  },
  5: {
    heading: "Tools",
    skills: [git, github, vscode, postman, docker, windows, linux],
    description: "Development tools and environments I work with",
  },
};

// Single orbiting card component with smooth occlusion
const OrbitingCard = ({ index, total, heading, description, icons, planetRadius = 3 }) => {
  const ref = useRef();
  const [radius, setRadius] = useState(6); // default radius

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth <= 768 ? 3 : 6);
    };

    handleResize(); // initial run
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const angleOffset = (2 * Math.PI * index) / total;
  const raycaster = new THREE.Raycaster();

  useFrame(({ clock, camera, scene }) => {
    const t = clock.getElapsedTime();
    const angle = t * 0.2 + angleOffset;

    // Orbit in X-Y plane (vertical orbit)
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const z = 0;

    ref.current.position.set(x, y, z);
    ref.current.lookAt(camera.position);

    // SOLUTION 1: Manual occlusion check using raycasting
    const cardPosition = new THREE.Vector3(x, y, z);
    const directionToCamera = new THREE.Vector3().subVectors(camera.position, cardPosition).normalize();
    
    raycaster.set(cardPosition, directionToCamera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    // Check if planet is between card and camera
    let isOccluded = false;
    const distanceToCamera = cardPosition.distanceTo(camera.position);
    
    for (let intersect of intersects) {
      // Skip the card itself and HTML elements
      if (intersect.object !== ref.current && 
          !intersect.object.userData.isCard &&
          intersect.distance < distanceToCamera - 0.5) {
        isOccluded = true;
        break;
      }
    }

    // SOLUTION 2: Distance-based fade for smooth transition
    const distanceFromCenter = Math.sqrt(x * x + y * y + z * z);
    const behindPlanet = z < 0 && Math.abs(x) < planetRadius && Math.abs(y) < planetRadius;
    
    // Calculate fade based on position relative to planet
    let targetOpacity = 1;
    let targetScale = 1;
    
    if (behindPlanet || isOccluded) {
      // Smooth fade when behind planet
      const fadeDistance = Math.max(0, planetRadius - Math.sqrt(x * x + y * y));
      const fadeAmount = Math.min(1, fadeDistance / planetRadius);
      targetOpacity = Math.max(0.1, 1 - fadeAmount * 0.9);
      targetScale = Math.max(0.7, 1 - fadeAmount * 0.3);
    } else if (z < 0) {
      // Slight fade for cards on the far side
      targetOpacity = 0.8;
      targetScale = 0.9;
    }

    // Smooth interpolation for opacity and scale changes
    setOpacity(prev => THREE.MathUtils.lerp(prev, targetOpacity, 0.05));
    setScale(prev => THREE.MathUtils.lerp(prev, targetScale, 0.05));
  });

  return (
    <group ref={ref} userData={{ isCard: true }}>
      <Html 
        distanceFactor={20} 
        center
        // Remove occlude prop as we're handling it manually
        style={{
          opacity: opacity,
          transform: `scale(${scale})`,
          transition: 'opacity 0.1s ease, transform 0.1s ease'
        }}
      >
        <div className="backdrop-blur-md bg-white/20 text-white w-auto md:w-64 p-4 rounded-xl shadow-lg border border-white/30">
          <h3 className="text-[7px] md:text-xl font-bold mb-2">{heading}</h3>
          <p className="text-[5px] md:text-sm mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {icons.map((icon, i) => (
              <img
                key={i}
                src={icon}
                alt="skill"
                className="md:w-8 md:h-8 w-2 h-2 md:object-contain"
              />
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
};

// Alternative approach: Use 3D cards instead of HTML
const Card3D = ({ index, total, heading, description, icons, radius = 6 }) => {
  const ref = useRef();
  const meshRef = useRef();
  const angleOffset = (2 * Math.PI * index) / total;

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const angle = t * 0.2 + angleOffset;

    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const z = 0;

    ref.current.position.set(x, y, z);
    ref.current.lookAt(camera.position);
  });

  return (
    <group ref={ref}>
      {/* 3D Card Background */}
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial 
          color="#6366f1" 
          transparent 
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* HTML Content on top */}
      <Html distanceFactor={20} center transform>
        <div className="w-48 p-3 text-white text-center bg-transparent">
          <h3 className="text-lg font-bold mb-1">{heading}</h3>
          <p className="text-xs mb-2 opacity-90">{description}</p>
          <div className="flex flex-wrap gap-1 justify-center">
            {icons.slice(0, 4).map((icon, i) => (
              <img
                key={i}
                src={icon}
                alt="skill"
                className="w-6 h-6 object-contain"
              />
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
};

// Main component with choice between HTML and 3D cards
const OrbitingCards = ({ use3DCards = false, planetRadius = 3 }) => {
  const keys = Object.keys(skills);
  const total = keys.length;

  const CardComponent = use3DCards ? Card3D : OrbitingCard;

  return (
    <>
      {keys.map((key, i) => (
        <CardComponent
          key={i}
          index={i}
          total={total}
          heading={skills[key].heading}
          description={skills[key].description}
          icons={skills[key].skills}
          planetRadius={planetRadius}
        />
      ))}
    </>
  );
};

export default OrbitingCards;