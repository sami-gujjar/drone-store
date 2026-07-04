import { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import drones from "../data/drones";
import FlightDrone from "../components/FlightDrone";
import ChaseCamera from "../components/ChaseCamera";
import FlightGround from "../components/FlightGround";
import FlightHUD from "../components/FlightHUD";
import TouchControls from "../components/TouchControls";
import useControlsRef from "../hooks/useControlsRef";
import useKeyControls from "../hooks/useKeyControls";

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-primary rounded-full animate-spin" />
        <span className="text-slate-400 text-sm">Preparing simulation...</span>
      </div>
    </Html>
  );
}

export default function FlightSimulator() {
  const [selectedId, setSelectedId] = useState(drones[0].id);
  const [phase, setPhase] = useState("idle"); // idle | takeoff | flying
  const [telemetry, setTelemetry] = useState({ altitude: 0, speed: 0 });
  const droneRef = useRef();
  const controlsRef = useControlsRef();

  // Keyboard writes into the same shared ref that touch buttons use
  useKeyControls(controlsRef);

  const selected = drones.find((d) => d.id === Number(selectedId));

  const startSimulation = () => {
    setPhase("takeoff");
    setTimeout(() => setPhase("flying"), 1800);
  };

  const stopSimulation = () => {
    setPhase("idle");
    setTelemetry({ altitude: 0, speed: 0 });
    controlsRef.current = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      up: false,
      down: false,
    };
  };

  return (
    <div className="section py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Flight Simulator</h1>
          <p className="text-muted mt-1 text-sm md:text-base">
            Take any drone for a test flight before you buy.
          </p>
        </div>

        {phase === "idle" && (
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="bg-surface border border-slate-700 rounded-lg px-4 py-2 text-sm"
          >
            {drones.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        )}
      </div>

      <div
        className="relative rounded-2xl overflow-hidden border border-slate-800 bg-surface shadow-glow"
        style={{ height: "min(600px, 70vh)", touchAction: "none" }}
      >
        <Canvas shadows camera={{ position: [0, 2.5, 6], fov: 55 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[8, 10, 5]} intensity={1.2} castShadow />
          <Suspense fallback={<Loader />}>
            <FlightGround />
            <group ref={droneRef}>
              <FlightDrone
                modelPath={selected.model}
                scale={selected.scale}
                noseOffset={selected.noseOffset || 0}
                phase={phase}
                onTelemetry={setTelemetry}
                controlsRef={controlsRef}
              />
            </group>
            {phase !== "idle" && <ChaseCamera targetRef={droneRef} />}
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>

        {phase !== "idle" && (
          <>
            <FlightHUD altitude={telemetry.altitude} speed={telemetry.speed} phase={phase} />
            <TouchControls controlsRef={controlsRef} />
          </>
        )}

        {phase === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark/60 backdrop-blur-sm px-4 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-2">{selected.name}</h2>
            <p className="text-muted mb-6 text-sm md:text-base">Ready for takeoff</p>
            <button onClick={startSimulation} className="btn-primary">
              Start Simulation
            </button>
          </div>
        )}

        {phase === "flying" && (
          <button
            onClick={stopSimulation}
            className="absolute top-6 right-6 bg-danger/90 hover:bg-danger text-white text-sm font-semibold px-4 py-2 rounded-lg transition z-10"
          >
            End Flight
          </button>
        )}
      </div>
    </div>
  );
}