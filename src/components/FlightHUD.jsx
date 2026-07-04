export default function FlightHUD({ altitude, speed, phase }) {
  return (
    <>
      {/* Telemetry - top left */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-dark/70 backdrop-blur border border-slate-800 rounded-xl px-3 py-2 md:px-5 md:py-3 text-xs md:text-sm z-10">
        <div className="flex gap-4 md:gap-6">
          <div>
            <p className="text-muted text-[10px] md:text-xs uppercase tracking-wide">Altitude</p>
            <p className="text-primary font-bold text-sm md:text-lg">{altitude.toFixed(2)} m</p>
          </div>
          <div>
            <p className="text-muted text-[10px] md:text-xs uppercase tracking-wide">Speed</p>
            <p className="text-primary font-bold text-sm md:text-lg">{(speed * 100).toFixed(0)} km/h</p>
          </div>
          <div>
            <p className="text-muted text-[10px] md:text-xs uppercase tracking-wide">Status</p>
            <p className={`font-bold text-sm md:text-lg ${phase === "flying" ? "text-success" : "text-yellow-400"}`}>
              {phase === "takeoff" ? "Taking Off" : "Airborne"}
            </p>
          </div>
        </div>
      </div>

      {/* Controls legend - desktop only, bottom left (mobile uses the visual D-pad instead) */}
      <div className="hidden md:block absolute bottom-6 left-6 bg-dark/70 backdrop-blur border border-slate-800 rounded-xl px-5 py-3 text-xs text-muted z-10">
        <p className="mb-2 text-slate-300 font-semibold">Controls</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
          <span><kbd className="bg-surfaceLight px-1.5 py-0.5 rounded">W</kbd> Thrust Forward</span>
          <span><kbd className="bg-surfaceLight px-1.5 py-0.5 rounded">S</kbd> Reverse</span>
          <span><kbd className="bg-surfaceLight px-1.5 py-0.5 rounded">A</kbd> Turn Left</span>
          <span><kbd className="bg-surfaceLight px-1.5 py-0.5 rounded">D</kbd> Turn Right</span>
          <span><kbd className="bg-surfaceLight px-1.5 py-0.5 rounded">Space</kbd> Ascend</span>
          <span><kbd className="bg-surfaceLight px-1.5 py-0.5 rounded">Shift</kbd> Descend</span>
        </div>
      </div>
    </>
  );
}