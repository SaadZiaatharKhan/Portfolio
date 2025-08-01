import React, { useState, useEffect } from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export function Astronaut(props) {
  const group = React.useRef();
  const { scene, animations } = useGLTF('/models/Astronaut.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  
  // State to track current animation
  const [animation, setAnimation] = useState('floating');
  
  // Handle animation transitions
  useEffect(() => {
    if (actions[animation]) {
      actions[animation]
        .reset()
        .fadeIn(0.5)
        .play();
    }
    
    return () => {
      if (actions[animation]) {
        actions[animation].fadeOut(0.5);
      }
    };
  }, [animation, actions]);

  // Handle hover/touch interactions
  const handlePointerOver = () => setAnimation('wave');
  const handlePointerOut = () => setAnimation('floating');

  return (
    <group 
      ref={group} 
      {...props} 
      dispose={null}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={1.314}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="RootNode0_0" scale={0.01}>
                <group name="skeletal3_6">
                  <group name="GLTF_created_0">
                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                    <group name="_3_correction">
                      <group name="_3" />
                    </group>
                    <group name="_4_correction">
                      <group name="_4" />
                    </group>
                    <group name="_5_correction">
                      <group name="_5" />
                    </group>
                    <skinnedMesh name="Object_99" geometry={nodes.Object_99.geometry} material={materials.material_0} skeleton={nodes.Object_99.skeleton} />
                    <skinnedMesh name="Object_100" geometry={nodes.Object_100.geometry} material={materials.material_0} skeleton={nodes.Object_100.skeleton} />
                    <skinnedMesh name="Object_103" geometry={nodes.Object_103.geometry} material={materials.material_1} skeleton={nodes.Object_103.skeleton} />
                    <skinnedMesh name="Object_106" geometry={nodes.Object_106.geometry} material={materials.material_2} skeleton={nodes.Object_106.skeleton} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Astronaut.glb');