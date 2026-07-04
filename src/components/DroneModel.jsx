import { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TARGET_SIZE = 1.6;

export default function DroneModel({ path, scale = 1, noseOffset = 0 }) {
  const group = useRef();
  const { scene } = useGLTF(path);

  // Recenter pivot to origin + normalize scale, same logic as FlightDrone,
  // so every drone looks consistent across the Detail page too.
  const { normalizedObject, normalizedScale } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    clone.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const normalizedScale = TARGET_SIZE / maxDim;

    return { normalizedObject: clone, normalizedScale };
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(t * 2) * 0.15; // gentle hover
      group.current.rotation.y += 0.005; // slow idle spin
    }
  });

  return (
    <group ref={group} scale={scale}>
      <group rotation={[0, noseOffset, 0]} scale={normalizedScale}>
        <primitive object={normalizedObject} />
      </group>
    </group>
  );
}