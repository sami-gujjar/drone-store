import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Bounds, Center, Environment } from "@react-three/drei";

function RotatingModel({ path }) {
  const ref = useRef();
  const { scene } = useGLTF(path);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.008;
    }
  });

  return <primitive ref={ref} object={scene} />;
}

export default function DroneThumbnail({ modelPath }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        {/* Bounds + Center auto-fits & auto-centers any model, regardless of its size/origin */}
        <Bounds fit clip observe margin={1.4}>
          <Center>
            <RotatingModel path={modelPath} />
          </Center>
        </Bounds>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}