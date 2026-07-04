import { useState } from "react";
import drones from "../data/drones";
import DroneCard from "../components/DroneCard";

export default function Drones() {
  const [sort, setSort] = useState("default");

  const sorted = [...drones].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="section py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Drones</h1>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-surface border border-slate-700 rounded-lg px-4 py-2 text-sm"
        >
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sorted.map((d) => (
          <DroneCard key={d.id} drone={d} />
        ))}
      </div>
    </div>
  );
}