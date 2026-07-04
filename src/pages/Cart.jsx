import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="section py-24 text-center">
        <p className="text-muted mb-4">Your cart is empty.</p>
        <Link to="/drones" className="btn-primary">Browse Drones</Link>
      </div>
    );
  }

  return (
    <div className="section py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-surface border border-slate-800 p-4 rounded-xl"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-muted text-sm">${item.price} each</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-surfaceLight w-8 h-8 rounded-lg"
              >
                −
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-surfaceLight w-8 h-8 rounded-lg"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-danger text-sm ml-4 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8 border-t border-slate-800 pt-6">
        <span className="text-muted">Total</span>
        <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
      </div>

      <button className="btn-primary w-full mt-6">Proceed to Checkout</button>
    </div>
  );
}