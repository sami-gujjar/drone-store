import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import DroneModel from "./DroneModel";
import ErrorBoundary from "./ErrorBoundary";

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-primary rounded-full animate-spin" />
        <span className="text-slate-400 text-sm">Loading model...</span>
      </div>
    </Html>
  );
}

export default function DroneViewer({ modelPath, scale = 1, noseOffset = 0, height = "420px" }) {
  return (
    <div
      style={{ height }}
      className="rounded-2xl overflow-hidden bg-surface border border-slate-800 shadow-glow"
    >
      <ErrorBoundary>
        <Canvas camera={{ position: [3, 2, 4], fov: 45 }} shadows>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <Suspense fallback={<Loader />}>
            <DroneModel path={modelPath} scale={scale} noseOffset={noseOffset} />
            <Environment preset="city" />
            <ContactShadows position={[0, -1.2, 0]} opacity={0.5} blur={2} />
          </Suspense>
          <OrbitControls enableZoom={true} minDistance={2} maxDistance={8} />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}