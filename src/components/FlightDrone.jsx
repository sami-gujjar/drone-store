import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const ACCEL = 0.015;
const MAX_SPEED = 0.12;
const REVERSE_MAX_SPEED = MAX_SPEED * 0.5;
const DAMPING = 0.94;
const YAW_SPEED = 0.035;
const TAKEOFF_HEIGHT = 1.5;
const BOUNDS = 12;
const TARGET_SIZE = 1.4;

export default function FlightDrone({ modelPath, scale = 1, noseOffset = 0, phase, onTelemetry, controlsRef }) {
  const group = useRef();
  const forwardSpeed = useRef(0);
  const verticalVelocity = useRef(0);
  const { scene } = useGLTF(modelPath);

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

  useEffect(() => {
    if (group.current) {
      group.current.position.set(0, 0, 0);
      group.current.rotation.set(0, 0, 0);
    }
    forwardSpeed.current = 0;
    verticalVelocity.current = 0;
  }, [modelPath]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    group.current.position.y += Math.sin(t * 6) * 0.0015;

    if (phase === "takeoff") {
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        TAKEOFF_HEIGHT,
        0.03
      );
      onTelemetry({ altitude: group.current.position.y, speed: 0 });
      return;
    }

    if (phase !== "flying") return;

    const k = controlsRef.current;

    let yawInput = 0;
    if (k.left) {
      group.current.rotation.y += YAW_SPEED;
      yawInput += 1;
    }
    if (k.right) {
      group.current.rotation.y -= YAW_SPEED;
      yawInput -= 1;
    }

    if (k.forward) forwardSpeed.current += ACCEL;
    if (k.backward) forwardSpeed.current -= ACCEL;
    forwardSpeed.current = THREE.MathUtils.clamp(
      forwardSpeed.current,
      -REVERSE_MAX_SPEED,
      MAX_SPEED
    );
    forwardSpeed.current *= DAMPING;

    if (k.up) verticalVelocity.current += ACCEL;
    if (k.down) verticalVelocity.current -= ACCEL;
    verticalVelocity.current = THREE.MathUtils.clamp(verticalVelocity.current, -MAX_SPEED, MAX_SPEED);
    verticalVelocity.current *= DAMPING;

    const yaw = group.current.rotation.y;
    const noseDirection = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));

    group.current.position.addScaledVector(noseDirection, forwardSpeed.current);
    group.current.position.y += verticalVelocity.current;

    group.current.position.x = THREE.MathUtils.clamp(group.current.position.x, -BOUNDS, BOUNDS);
    group.current.position.z = THREE.MathUtils.clamp(group.current.position.z, -BOUNDS, BOUNDS);
    group.current.position.y = THREE.MathUtils.clamp(group.current.position.y, 0.3, 8);

    const targetPitch = -forwardSpeed.current * 4;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetPitch, 0.08);

    const targetRoll = yawInput * 0.4;
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetRoll, 0.1);

    onTelemetry({
      altitude: group.current.position.y,
      speed: Math.abs(forwardSpeed.current),
    });
  });

  return (
    <group ref={group} scale={scale}>
      <group rotation={[0, noseOffset, 0]} scale={normalizedScale}>
        <primitive object={normalizedObject} />
      </group>
    </group>
  );
}