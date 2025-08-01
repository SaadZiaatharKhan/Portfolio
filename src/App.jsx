import React, { Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import gsap, {
  Draggable,
  MotionPathPlugin,
  Physics2DPlugin,
  ScrambleTextPlugin,
  ScrollTrigger,
  TextPlugin,
} from "gsap/all";
import MoonBackground from "./sections/MoonBackground";
import Introduction from "./sections/Introduction";
import OverlaySkills from "./sections/OverlaySkills";
import Skills from "./sections/Skills";
import ProjectsCanvas from "./sections/ProjectsCanvas";
import ProjectsHtml from "./sections/ProjectsHtml";
import Wormhole from "./sections/Wormhole";
import ContactsCanvas from "./sections/ContactsCanvas";
import ContactsHtml from "./sections/ContactsHtml";

gsap.registerPlugin(
  TextPlugin,
  ScrambleTextPlugin,
  Draggable,
  Physics2DPlugin,
  ScrollTrigger,
  MotionPathPlugin
);

const App = () => {
  // Handle canvas errors
  const handleCreated = useCallback(({ gl, scene, camera }) => {
    // Optimize renderer settings
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1;

    // Set clear color
    gl.setClearColor("#1a1a2e", 1);

    // Context loss handling
    const canvas = gl.domElement;

    const handleContextLost = (event) => {
      console.warn("WebGL context lost");
      event.preventDefault();
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored");
    };

    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener(
      "webglcontextrestored",
      handleContextRestored,
      false
    );

    // Cleanup function stored on the canvas for later removal
    canvas._contextEventCleanup = () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost, false);
      canvas.removeEventListener(
        "webglcontextrestored",
        handleContextRestored,
        false
      );
    };
  }, []);

  const handleError = useCallback((error) => {
    console.error("Canvas error:", error);
  }, []);

  return (
    // <Suspense fallback={
    //   <div className="flex h-screen w-full justify-center items-center mask-alpha z-10 bg-amber-50">
    //     <h1 className="text-4xl text-black font-extrabold">
    //         WELCOME
    //     </h1>
    //   </div>
    // }>
    <main>
      {/* Your existing sections */}
      <MoonBackground />
      <Introduction />

      {/* Three.js Canvas Section */}
      <div className="h-screen w-full relative">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
            stencil: false,
            depth: true,
          }}
          dpr={[1, 2]}
          onCreated={handleCreated}
          onError={handleError}
          style={{ background: "#1a1a2e" }}
        >
          <Skills />
        </Canvas>
        <OverlaySkills />
      </div>
      <div className="h-screen w-full relative">
        <Canvas
          camera={{
            position: [0, 0, 5],
            // fov: 75
          }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
            stencil: false,
            depth: true,
          }}
          dpr={[1, 2]}
          onCreated={handleCreated}
          onError={handleError}
          // style={{ background: "#1a1a2e" }}
        >
          <color attach="background" args={["#9dd2f5"]} />
          {/* <fog attach="fog" args={["#e8fac3", 10, 50]} /> */}
          <ProjectsCanvas />
        </Canvas>
        <ProjectsHtml />
      </div>
      <Wormhole />
      <div className="h-screen w-full relative">
        <Canvas
          camera={{
            position: [0, 0, 5],
            // fov: 75
          }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
            stencil: false,
            depth: true,
          }}
          dpr={[1, 2]}
          onCreated={handleCreated}
          onError={handleError}
          // style={{ background: "#1a1a2e" }}
        >
          <ContactsCanvas />
        </Canvas>
        <ContactsHtml />
      </div>
    </main>
    // </Suspense>
  );
};

export default App;
