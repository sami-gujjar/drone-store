import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const location = useLocation();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const links = [
  { name: "Home", path: "/" },
  { name: "Drones", path: "/drones" },
  { name: "Compare", path: "/compare" },
  { name: "Simulator", path: "/simulator" },
];

  return (
    <nav className="sticky top-0 z-50 bg-dark/80 backdrop-blur-md border-b border-slate-800">
      <div className="section flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Drone<span className="text-primary">Verse</span>
        </Link>

        <div className="flex gap-8 items-center">
          
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link to="/cart" className="relative text-slate-300 hover:text-white transition">
            <FaShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}