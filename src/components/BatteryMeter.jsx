export default function BatteryMeter({ value, max }) {
  const percent = Math.round((value / max) * 100);
  const color =
    percent > 60 ? "bg-success" : percent > 30 ? "bg-yellow-400" : "bg-danger";

  return (
    <div>
      <div className="flex justify-between text-sm text-muted mb-1">
        <span>Battery Life</span>
        <span>{value} min</span>
      </div>
      <div className="w-full h-2 bg-surfaceLight rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}