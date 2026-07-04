import Hero from "../components/Hero";
import DroneCard from "../components/DroneCard";
import drones from "../data/drones";

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="section py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold">Featured Drones</h2>
          <p className="text-muted">{drones.length} models available</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {drones.map((d) => (
            <DroneCard key={d.id} drone={d} />
          ))}
        </div>
      </section>

      <section className="section py-16 grid md:grid-cols-3 gap-8 text-center">
        {[
          { title: "True-to-Life 3D", desc: "Inspect every drone from every angle." },
          { title: "Verified Specs", desc: "Battery, range, and camera details you can trust." },
          { title: "Fast Delivery", desc: "Shipped within 48 hours across the country." },
        ].map((item) => (
          <div key={item.title} className="bg-surface border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
            <p className="text-muted text-sm">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}