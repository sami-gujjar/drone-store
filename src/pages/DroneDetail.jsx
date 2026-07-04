import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import drones from "../data/drones";
import DroneViewer from "../components/DroneViewer";
import BatteryMeter from "../components/BatteryMeter";
import RangeMeter from "../components/RangeMeter";
import { useCart } from "../context/CartContext";

export default function DroneDetail() {
  const { id } = useParams();
  const drone = drones.find((d) => d.id === Number(id));
  const { addToCart } = useCart();
  const [tab, setTab] = useState("specs");
  const [added, setAdded] = useState(false);

  if (!drone) return <p className="section py-12">Drone not found.</p>;

  const handleAdd = () => {
    addToCart(drone);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="section py-12 grid md:grid-cols-2 gap-12">
      <DroneViewer modelPath={drone.model} scale={drone.scale} height="480px" />

      <div>
        <Link to="/drones" className="text-sm text-muted hover:text-primary">
          ← Back to Drones
        </Link>

        <h1 className="text-4xl font-bold mt-4">{drone.name}</h1>
        <p className="text-muted mt-1">{drone.tagline}</p>
        <p className="text-3xl font-bold text-primary mt-4">${drone.price}</p>

        <div className="flex flex-col gap-4 mt-6">
          <BatteryMeter value={drone.battery} max={drone.maxBattery} />
          <RangeMeter value={drone.range} max={drone.maxRange} />
        </div>

        <div className="flex gap-6 mt-8 border-b border-slate-800">
          {["specs", "features", "reviews"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 capitalize text-sm font-medium transition ${
                tab === t
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-5 text-slate-300 text-sm leading-relaxed min-h-[80px]">
          {tab === "specs" && (
            <ul className="space-y-2">
              <li>Camera: {drone.camera}</li>
              <li>Battery: {drone.battery} min</li>
              <li>Range: {drone.range} km</li>
            </ul>
          )}
          {tab === "features" && (
            <p>4K stabilization, GPS return-to-home, obstacle avoidance, and foldable arms for portability.</p>
          )}
          {tab === "reviews" && (
            <p>Rated {drone.rating} / 5 based on verified customer purchases.</p>
          )}
        </div>

        <button onClick={handleAdd} className="btn-primary mt-8 w-full md:w-auto">
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}