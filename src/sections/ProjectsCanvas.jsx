import { ContactShadows, Text, Html, useGLTF } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber"; // Added useThree
import { Box3, TextureLoader, Vector3} from "three";
import { TV } from "../components/TV";
import { Laptop } from "../components/Laptop";
import Agriguardian from "../../public/images/Projects/Agriguardian.jpg";
import EchoGuide from "../../public/images/Projects/EchoGuide.jpg";
import CareConnect from "../../public/images/Projects/CareConnect.png";
import Zoo from "../../public/images/Projects/Zoo.png";

// Sample project data
const projectsData = [
  {
    id: 1,
    title: "AgriGuardian",
    techStack: ["React Native", "FastAPI", "ESP32 and Sensors", "Computer Vision", "Machine Learning"],
    description: "A React Native app leveraging ESP32‑CAM and environmental sensors for AI‑powered crop disease detection, treatment advice, market price insights, and nearby agro‑supplier discovery.",
    githubLink: "https://github.com/SaadZiaatharKhan/Agriguardian",
    image: Agriguardian,
    color: "#4f46e5"
  },
  {
    id: 2,
    title: "EchoGuide",
    techStack: ["Python", "OpenCV", "YOLO-V8", "Flask", "Object and Face Detection", "Embedded C", "ESP32 CAM"],
    description: "EchoGuide is a low-cost, wearable assistive device that helps visually impaired users navigate safely using real-time audio cues. It uses an ESP32-CAM and a Flask server running lightweight object detection to recognize obstacles and respond to voice queries, promoting independence through smart vision and speech-based guidance.",
    githubLink: "https://github.com/SaadZiaatharKhan/EchoGuide",
    image: EchoGuide,
    color: "#059669"
  },
  {
    id: 3,
    title: "CareConnect",
    techStack: ["React", "Nodejs", "React", "TailwindCSS", "Nextjs", "Websocket", "Open Source Map APIs"],
    description: "This project provides an emergency alert system designed to assist senior citizens living alone in connecting with nearby nurses in case of accidents or health emergencies.",
    githubLink: "https://github.com/SaadZiaatharKhan/CareConnect-search-nurses-near-you",
    image: CareConnect,
    color: "#dc2626"
  },
  {
    id: 4,
    title: "3D Zoo",
    techStack: ["React", "Three.js", "React Three Fiber", "React Three Drei"],
    description: "This is a 3D Zoo made with the help of react-three/fiber and react-three/drei.",
    githubLink: "https://github.com/SaadZiaatharKhan/Zoo",
    image: Zoo,
    color: "#7c3aed"
  }
];

const defaultTVContent = {
  title: "Welcome to My Portfolio",
  subtitle: "Click on any laptop to view project details",
  description: "Explore my latest projects by interacting with the laptops below. Each project showcases different technologies and solutions I've worked on.",
  techStack: ["React", "Three.js", "WebGL", "Interactive Design"],
  note: "Hover over laptops to see project previews"
};

// Enhanced Laptop Component with perfect screen alignment
const InteractiveLaptop = ({ project, onClick, position, rotation, scale }) => {
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(TextureLoader, project.image);
  const laptopRef = useRef();

  // Fixed screen positioning - these values should match your actual laptop model's screen
  const screenPosition = [0, 0.5, -0.6]; // Adjust based on your Laptop component
  const screenRotation = [-Math.PI / 120, Math.PI  / 2, 0]; // Adjust based on screen angle
  const screenSize = [1.3, 0.83]; // Adjust based on actual screen dimensions

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group ref={laptopRef}>
        {/* Laptop model */}

        {/* Project image screen - positioned directly */}
        <mesh
          position={screenPosition}
          rotation={screenRotation}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={(e) => {
            e.stopPropagation();
            setHovered(false);
            document.body.style.cursor = "default";
          }}
        >
          <planeGeometry args={screenSize} />
          <meshStandardMaterial
            map={texture}
            transparent
            opacity={hovered ? 1 : 0.92}
            toneMapped={false}
          />
        </mesh>

        {/* Project title positioned above the screen */}
        <Text
          position={[screenPosition[0], screenPosition[1] + 0.5, screenPosition[2] + 0.01]}
          rotation={screenRotation}
          fontSize={0.08}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#000"
          maxWidth={screenSize[0]}
        >
          {project.title}
        </Text>

        {/* Subtle glow effect for better visibility */}
        <mesh
          position={[screenPosition[0], screenPosition[1], screenPosition[2] - 0.001]}
          rotation={screenRotation}
        >
          <planeGeometry args={[screenSize[0] + 0.05, screenSize[1] + 0.05]} />
          <meshStandardMaterial
            color={project.color}
            transparent
            opacity={hovered ? 0.3 : 0.1}
            emissive={project.color}
            emissiveIntensity={hovered ? 0.2 : 0.05}
          />
        </mesh>
      </group>
    </group>
  );
};

// Enhanced TV Component with dynamic content including project image
const InteractiveTV = ({ selectedProject, position, scale }) => {
  const content = selectedProject || defaultTVContent;
  
  // Load project image texture for TV
  const texture = selectedProject ? useLoader(TextureLoader, selectedProject.image) : null;
  
  const handleGitHubClick = () => {
    if (selectedProject && selectedProject.githubLink) {
      window.open(selectedProject.githubLink, '_blank');
    }
  };
  
  return (
    <group position={position} scale={scale}>
      {/* Use your existing TV component as base */}
      <TV />
      
      {/* Content positioned within TV screen boundaries */}
      <group position={[0, 0.1, 0.15]}>
        {/* Project Image on TV - Full Screen Coverage */}
        {selectedProject && texture && (
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[1.6, 1.0]} />
            <meshStandardMaterial 
              map={texture}
              transparent
              opacity={0.95}
              toneMapped={false}
            />
          </mesh>
        )}
        
        {/* Content Overlay - all text within screen bounds */}
        <group position={[0, 0, 0.02]}>
          {/* Project Title - Clickable for GitHub */}
          <Text
            position={[0, selectedProject ? 0.45 : 0.35, 0]}
            fontSize={selectedProject ? 0.1 : 0.08}
            color="#00ff88"
            anchorX="center"
            anchorY="center"
            maxWidth={1.4}
            outlineWidth={0.02}
            outlineColor="#000000"
            onClick={selectedProject ? handleGitHubClick : undefined}
            onPointerEnter={() => {
              if (selectedProject) {
                document.body.style.cursor = 'pointer';
              }
            }}
            onPointerLeave={() => {
              document.body.style.cursor = 'default';
            }}
          >
            {content.title}
          </Text>
          
          {/* Tech Stack - First Line */}
          <Text
            position={[0, selectedProject ? 0.25 : 0.15, 0]}
            fontSize={0.05}
            color="#66ff99"
            anchorX="center"
            anchorY="center"
            maxWidth={1.4}
            outlineWidth={0.015}
            outlineColor="#000000"
          >
            {selectedProject ? content.techStack.slice(0, 2).join(" • ") : content.subtitle}
          </Text>
          
          {/* Tech Stack - Second Line */}
          {selectedProject && content.techStack.length > 2 && (
            <Text
              position={[0, 0.1, 0]}
              fontSize={0.05}
              color="#66ff99"
              anchorX="center"
              anchorY="center"
              maxWidth={1.4}
              outlineWidth={0.015}
              outlineColor="#000000"
            >
              {content.techStack.slice(2, 4).join(" • ")}
            </Text>
          )}
          
          {/* Tech Stack - Third Line if needed */}
          {selectedProject && content.techStack.length > 4 && (
            <Text
              position={[0, -0.05, 0]}
              fontSize={0.05}
              color="#66ff99"
              anchorX="center"
              anchorY="center"
              maxWidth={1.4}
              outlineWidth={0.015}
              outlineColor="#000000"
            >
              {content.techStack.slice(4).join(" • ")}
            </Text>
          )}
          
          {/* Description */}
          <Text
            position={[0, selectedProject ? -0.25 : -0.1, 0]}
            fontSize={0.04}
            color="#ffdd44"
            anchorX="center"
            anchorY="center"
            maxWidth={1.3}
            outlineWidth={0.01}
            outlineColor="#000000"
          >
            {content.description}
          </Text>
          
          {/* GitHub Link indication */}
          {selectedProject ? (
            <Text
              position={[0, -0.42, 0]}
              fontSize={0.035}
              color="#ff8800"
              anchorX="center"
              anchorY="center"
              maxWidth={1.4}
              outlineWidth={0.01}
              outlineColor="#000000"
              onClick={handleGitHubClick}
              onPointerEnter={() => {
                document.body.style.cursor = 'pointer';
              }}
              onPointerLeave={() => {
                document.body.style.cursor = 'default';
              }}
            >
              🔗 Click title to view on GitHub
            </Text>
          ) : (
            <Text
              position={[0, -0.3, 0]}
              fontSize={0.04}
              color="#ff8800"
              anchorX="center"
              anchorY="center"
              maxWidth={1.4}
              outlineWidth={0.01}
              outlineColor="#000000"
            >
              {content.note}
            </Text>
          )}
          
          {/* Project ID indicator - positioned within screen */}
          {selectedProject && (
            <Text
              position={[0.6, 0.45, 0]}
              fontSize={0.04}
              color="#ff6b6b"
              anchorX="center"
              anchorY="center"
              outlineWidth={0.01}
              outlineColor="#000000"
            >
              #{selectedProject.id}
            </Text>
          )}
        </group>
      </group>
    </group>
  );
};

const ProjectsCanvas = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { size } = useThree(); // Get viewport size

  // Responsive layout adjustments
  useEffect(() => {
    // Check if window is defined (for SSR)
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Initial check
      checkIsMobile();
      
      // Add event listener
      window.addEventListener('resize', checkIsMobile);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkIsMobile);
    }
  }, []);

  // Calculate responsive values
  const getResponsiveValues = () => {
    if (isMobile) {
      return {
        laptopRadius: 1.4,
        laptopY: -0.7,
        laptopScale: 0.9,
        tvScale: [2.2, 2.2, 2.2],
        tvPosition: [0, 1.5, -1.5],
        platformRadius: 3,
        instructionPosition: [0, -2.5, 3.5],
        projectNavPosition: [3, 0, 3],
        contactShadowsScale: 12
      };
    } else {
      return {
        laptopRadius: 4,
        laptopY: -0.9,
        laptopScale: 1.2,
        tvScale: [3.5, 3.5, 3.5],
        tvPosition: [0, 1.8, -3],
        platformRadius: 8,
        instructionPosition: [0, -3.5, 6],
        projectNavPosition: [4.5, 0, 4],
        contactShadowsScale: 15
      };
    }
  };

  const responsive = getResponsiveValues();

  // laptop positions closer to user on mobile
  const laptopConfigs = [
    { angle: -Math.PI / 3, radius: responsive.laptopRadius, yRotation: -Math.PI / 2 }, 
    { angle: -Math.PI / 6, radius: responsive.laptopRadius, yRotation: -Math.PI / 2 }, 
    { angle: Math.PI / 6, radius: responsive.laptopRadius, yRotation: -Math.PI / 2 }, 
    { angle: Math.PI / 3, radius: responsive.laptopRadius, yRotation: -Math.PI / 2 }, 
  ];

  const handleLaptopClick = (project) => {
    setSelectedProject(project);
  };

  const resetTVContent = () => {
    setSelectedProject(null);
  };

  return (
    <>
      {/* Lighter background for better visibility */}
      <color attach="background" args={["#2a2a40"]} />
      
      {/* Bright ambient light */}
      <ambientLight intensity={1.2} />
      
      {/* Main directional light */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* Additional point lights for better illumination */}
      <pointLight position={[-5, 5, 5]} intensity={1} />
      <pointLight position={[5, 5, 5]} intensity={1} />

      {/* Beautiful platform/stage */}
      <mesh 
        position={[0, -1, 1]} 
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={resetTVContent}
      >
        <circleGeometry args={[responsive.platformRadius, 32]} />
        <meshStandardMaterial
          color="#4a4a6a"
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>

      {/* Laptops arranged on platform */}
      {laptopConfigs.map(({ angle, radius, yRotation }, idx) => (
        <InteractiveLaptop
          key={idx}
          project={projectsData[idx]}
          onClick={() => handleLaptopClick(projectsData[idx])}
          position={[
            Math.sin(angle) * radius,
            responsive.laptopY,
            -Math.cos(angle) * radius + (isMobile ? 1.5 : 3)
          ]}
          rotation={[0, yRotation, 0]}
          scale={responsive.laptopScale}
        />
      ))}

      {/* TV positioned behind laptops on the platform */}
      <InteractiveTV 
        selectedProject={selectedProject}
        position={responsive.tvPosition}
        scale={responsive.tvScale}
      />

      {/* Soft contact shadows */}
      <ContactShadows
        position={[0, -0.99, 1]}
        opacity={0.3}
        scale={responsive.contactShadowsScale}
        blur={2}
        far={10}
        resolution={512}
      />

      {/* Instructions UI */}
      <Html position={responsive.instructionPosition} center>
        <div style={{
          background: 'rgba(0,0,0,0.85)',
          color: '#00ff88',
          padding: '12px 20px',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '350px',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          fontFamily: 'Arial, sans-serif'
        }}>
          <h3 style={{ 
            margin: '0 0 8px 0', 
            color: selectedProject ? selectedProject.color : '#00ff88',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            {selectedProject ? `Viewing: ${selectedProject.title}` : 'Interactive Portfolio'}
          </h3>
          <p style={{ margin: 0, fontSize: '13px', opacity: 0.9 }}>
            {selectedProject 
              ? 'Click title on TV to open GitHub • Click platform to return' 
              : 'Click on the laptops to view project details on the TV'
            }
          </p>
        </div>
      </Html>

      {/* Project Navigation */}
      {selectedProject && (
        <Html position={responsive.projectNavPosition} center>
          <div style={{
            background: 'rgba(0,0,0,0.9)',
            color: '#00ff88',
            padding: '12px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            border: `2px solid ${selectedProject.color}`,
            boxShadow: `0 0 20px ${selectedProject.color}40`,
            minWidth: '120px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
          }}>
            <div style={{ 
              color: selectedProject.color, 
              fontWeight: 'bold',
              marginBottom: '4px'
            }}>
              Project {selectedProject.id}/4
            </div>
            <div style={{ fontSize: '11px', opacity: 0.8 }}>
              {selectedProject.techStack.length} Technologies
            </div>
          </div>
        </Html>
      )}
    </>
  );
};

export default ProjectsCanvas;