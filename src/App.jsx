import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Drones from "./pages/Drones";
import DroneDetail from "./pages/DroneDetail";
import Cart from "./pages/Cart";
import Compare from "./pages/Compare";
import FlightSimulator from "./pages/FlightSimulator";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <ErrorBoundary
              fallback={
                <div className="section py-24 text-center">
                  <p className="text-danger font-semibold text-lg mb-2">
                    Something went wrong loading this page.
                  </p>
                  <p className="text-muted text-sm">
                    Please try navigating back or refreshing.
                  </p>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/drones" element={<Drones />} />
                <Route path="/drones/:id" element={<DroneDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/simulator" element={<FlightSimulator />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}