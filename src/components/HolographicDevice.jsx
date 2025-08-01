import { Float, Text3D } from "@react-three/drei";
import HolographicMaterial from "./HolographicMaterial";
import PostProcessingEffects from "./Effects";

export default function HolographicDevice(props) {
  return (
    <group {...props} dispose={null}>
      {/* <Float
        rotationIntensity={0.3}
        floatIntensity={10}
        speed={2}
        floatingRange={[-0.03, 0.03]}
      > */}
        <Text3D
          font="/fonts/digital.json"
          size={0.5}
          height={0.05}
          curveSegments={12}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.02}
        >
          {"Thanks For Visiting"}
          <HolographicMaterial />
        </Text3D>
      {/* </Float> */}
    </group>
  );
}
