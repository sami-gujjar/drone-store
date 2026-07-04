import { useState } from "react";
import drones from "../data/drones";

export default function Compare() {
  const [firstId, setFirstId] = useState(drones[0].id);
  const [secondId, setSecondId] = useState(drones[1].id);

  const first = drones.find((d) => d.id === Number(firstId));
  const second = drones.find((d) => d.id === Number(secondId));

  const rows = [
    { label: "Price", key: "price", prefix: "$" },
    { label: "Battery", key: "battery", suffix: " min" },
    { label: "Range", key: "range", suffix: " km" },
    { label: "Camera", key: "camera" },
    { label: "Rating", key: "rating", suffix: " / 5" },
  ];

  return (
    <div className="section py-12">
      <h1 className="text-3xl font-bold mb-8">Compare Drones</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <select
          value={firstId}
          onChange={(e) => setFirstId(e.target.value)}
          className="bg-surface border border-slate-700 rounded-lg px-4 py-3"
        >
          {drones.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <select
          value={secondId}
          onChange={(e) => setSecondId(e.target.value)}
          className="bg-surface border border-slate-700 rounded-lg px-4 py-3"
        >
          {drones.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left">
          <thead className="bg-surfaceLight">
            <tr>
              <th className="p-4">Feature</th>
              <th className="p-4 text-primary">{first.name}</th>
              <th className="p-4 text-primary">{second.name}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-slate-800">
                <td className="p-4 text-muted">{row.label}</td>
                <td className="p-4 font-medium">
                  {row.prefix || ""}{first[row.key]}{row.suffix || ""}
                </td>
                <td className="p-4 font-medium">
                  {row.prefix || ""}{second[row.key]}{row.suffix || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}