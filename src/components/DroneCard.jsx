import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import DroneThumbnail from "./DroneThumbnail";
import ErrorBoundary from "./ErrorBoundary";

export default function DroneCard({ drone }) {
  return (
    <div className="bg-surface border border-slate-800 rounded-2xl p-5 hover:border-primary/50 hover:shadow-glow transition-all duration-300">
      <div
        className="relative h-40 rounded-xl mb-4 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${drone.color}22, transparent)` }}
      >
        <div className="absolute inset-0 bg-slate-800/30 animate-pulse" />
        <div className="absolute inset-0">
          <ErrorBoundary
            fallback={
              <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                Preview unavailable
              </div>
            }
          >
            <DroneThumbnail modelPath={drone.model} />
          </ErrorBoundary>
        </div>
      </div>

      <div className="flex justify-between items-start mb-1">
        <h3 className="text-lg font-semibold">{drone.name}</h3>
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          <FaStar /> {drone.rating}
        </div>
      </div>

      <p className="text-sm text-muted mb-3">{drone.tagline}</p>

      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-primary">${drone.price}</span>
        <Link
          to={`/drones/${drone.id}`}
          className="text-sm font-medium bg-surfaceLight hover:bg-primary hover:text-dark px-4 py-2 rounded-lg transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}