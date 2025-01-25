import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { config } from "./config";
import { MotionConfig } from "framer-motion";
import { Interface } from "./components/Interface";
import { Menu } from "./components/Menu";
import { LoadingScreen } from "./components/LoadingScreen";
import { Suspense } from "react";

function App() {
  return (
    <>
    <LoadingScreen />
      <Canvas camera={{ position: [0, 0.5, 5], fov: 42 }}>
        <color attach="background" args={["#9dd2f5"]} />
        <fog attach="fog" args={["#e8fac3", 10, 50]} />
          <ScrollControls pages={config.sections.length} damping={0.1} maxSpeed={0.2}>
            <MotionConfig transition={{
              duration:0.6
            }}>
            <group position-y={-1}>
              <Suspense>
                <Experience />
              </Suspense>
            </group>
            </MotionConfig>
            <Scroll html>
              <MotionConfig transition={{
                duration: 1,
              }}>
              <Interface />
              </MotionConfig>
            </Scroll>
          </ScrollControls>       
      </Canvas>
      <Menu />
    </>
  );
}

export default App;
