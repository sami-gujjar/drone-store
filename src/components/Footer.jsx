export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-20">
      <div className="section py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xl font-bold">
            Drone<span className="text-primary">Verse</span>
          </span>
          <p className="text-muted text-sm mt-1">
            Experience drones in 3D — before you fly.
          </p>
        </div>
        <p className="text-muted text-sm">
          © {new Date().getFullYear()} DroneVerse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}