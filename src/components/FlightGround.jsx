import { Grid } from "@react-three/drei";

export default function FlightGround() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <Grid
        position={[0, 0.01, 0]}
        args={[60, 60]}
        cellColor="#1e293b"
        sectionColor="#334155"
        fadeDistance={30}
        infiniteGrid
      />
    </>
  );
}