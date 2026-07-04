import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function ChaseCamera({ targetRef }) {
  const { camera } = useThree();
  const desired = useRef(new THREE.Vector3());
  const lookAt = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!targetRef.current) return;

    const targetPos = targetRef.current.position;

    desired.current.set(
      targetPos.x,
      targetPos.y + 2.2,
      targetPos.z + 5
    );

    camera.position.lerp(desired.current, 0.06);

    lookAt.current.lerp(targetPos, 0.1);
    camera.lookAt(lookAt.current);
  });

  return null;
}