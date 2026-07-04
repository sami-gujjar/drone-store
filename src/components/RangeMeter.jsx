export default function RangeMeter({ value, max }) {
  const percent = Math.round((value / max) * 100);

  return (
    <div>
      <div className="flex justify-between text-sm text-muted mb-1">
        <span>Flight Range</span>
        <span>{value} km / {max} km</span>
      </div>
      <div className="w-full h-2 bg-surfaceLight rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}