import { Link } from "react-router-dom";
import DroneViewer from "./DroneViewer";
import drones from "../data/drones";

export default function Hero() {
  const featured = drones[0];

  return (
    <section className="section grid md:grid-cols-2 gap-12 items-center py-20">
      <div>
        <span className="inline-block bg-surfaceLight text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
          NEXT-GEN 3D DRONE SHOPPING
        </span>
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Experience Drones <br />
          <span className="text-primary">Before You Buy</span>
        </h1>
        <p className="text-muted text-lg mb-8 max-w-md">
          Explore every drone in full 3D — rotate, inspect every angle, and
          preview flight performance before you purchase.
        </p>
        <div className="flex gap-4">
          <Link to="/drones" className="btn-primary">
            View Drones
          </Link>
          <Link
            to="/compare"
            className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:border-primary hover:text-primary transition"
          >
            Compare Models
          </Link>
        </div>
      </div>

      <DroneViewer modelPath={featured.model} scale={featured.scale} />
    </section>
  );
}